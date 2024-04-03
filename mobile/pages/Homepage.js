// pages/Homepage.js
import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Platform, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { supabase } from '../lib/helper/supabaseClient'; // Adjust the path as necessary
import styles from '../styles/HomepageStyles';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const Homepage = ({ navigation }) => {
  const [first_name, setFirstName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completingTaskIds, setCompletingTaskIds] = useState([]);
  const apiUrl = Platform.select({
    ios: 'http://localhost:8000/to_do_list/tasks/',
    android: 'http://10.0.2.2:8000/to_do_list/tasks/',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('userToken');
        if (tokenString) {
          //console.log(tokenString);
          const token = JSON.parse(tokenString);
          const first_name = token.user?.user_metadata?.first_name;
          setFirstName(first_name)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    };

    loadUser();
    fetchTasks();
  }, []);

  const navigateToScreen = (screenName) => {
    //implement navigation.navigate(screenName)
    console.log(`Navigate to ${screenName}`);
  };

  
  const fetchTasks = async () => {
    const tokenString = await AsyncStorage.getItem('userToken');
    if (!tokenString) {
      console.warn('Token not available');
      return;
    }
    const token = JSON.parse(tokenString);
    const access_token = token.access_token;
    //console.log(access_token)
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,  
      },
    });
    const data = await response.json();
    if (data && data.tasks) {
      setTasks(data.tasks);  
    } else {
      // Handle any errors or empty responses
      console.error('Failed to fetch tasks or no tasks available');
    }
  };

  const markTaskAsComplete = async (taskId) => {
    setCompletingTaskIds(oldIds => [...oldIds, taskId]);
    try {
      const tokenString = await AsyncStorage.getItem('userToken');
      if (!tokenString) {
        console.warn('Token not available');
        return;
      }
      const token = JSON.parse(tokenString);
      const access_token = token.access_token;

      const url = Platform.select({
        ios: `http://localhost:8000/to_do_list/tasks/update/${taskId}/`,
        android: `http://10.0.2.2:8000/to_do_list/tasks/update/${taskId}/`,
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });
      if (response.ok) {
        setCompletingTaskIds(oldIds => oldIds.filter(id => id !== taskId));
        fetchTasks();
      } else {
        console.error('Error: Failed to mark task as done');
      }
    } catch (error) {
      console.error('Error: Failed to mark task as done', error)
      setCompletingTaskIds(oldIds => oldIds.filter(id => id !== taskId));
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hi, {first_name} 👋</Text>
      </View>
      <Button title="Fetch Tasks" onPress={fetchTasks} />
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen1')}
          >
            <ImageBackground
              source={require('../assets/images/squares/tropical.png')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Community</Text>
                <View style={styles.squareIconWrapperCommunity}>
                  <FontAwesome name="users" size={24} color="black" style={styles.squareIcon} />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen2')}
          >
            <ImageBackground
              source={require('../assets/images/squares/sandy.png')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Make Appointment</Text>
                <View style={styles.squareIconWrapperAppointment}>
                  <AntDesign name="clockcircle" size={24} color="black" style={styles.squareIcon} />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen3')}
          >
            <ImageBackground
              source={require('../assets/images/squares/mountain.png')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Other</Text>
                <View style={styles.squareIconWrapperOther1}>
                  <FontAwesome name="heart" size={24} color="black" style={styles.squareIcon} />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen4')}
          >
            <ImageBackground
              source={require('../assets/images/squares/woods.png')}
              resizeMode='cover'
              style={{ flex: 1 }}
            >
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.squareText}>Other</Text>
                <View style={styles.squareIconWrapperOther2}>
                  <MaterialIcons name="settings" size={24} color="black" style={styles.squareIcon} />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.taskListContainer}>
      <Text style={styles.taskListTitle}>To Do List ✅</Text>
        <ScrollView style={styles.taskScrollView}>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <View style={styles.taskTextContainer}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
              </View>
            
              
              <TouchableOpacity 
                styles={styles.taskMarkAsComplete} 
                onPress={() => markTaskAsComplete(task.task_id)}
              >
                {completingTaskIds.includes(task.task_id) ? (
                  <MaterialIcons name="check-circle" size={24} color="green" />
                ) : (
                  <MaterialIcons name="radio-button-unchecked" size={24} color="grey" />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Homepage;