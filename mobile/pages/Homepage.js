// pages/Homepage.js
import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { supabase } from '../lib/helper/supabaseClient'; // Adjust the path as necessary
import styles from '../styles/HomepageStyles';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Homepage = ({ navigation }) => {
  const [first_name, setFirstName] = useState('');
  const [tasks, setTasks] = useState([]);

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


  const logOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // No need to manually remove the token from AsyncStorage here,
        // as it's handled by the onAuthStateChange listener in Login.js
        console.log("User signed out");
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
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
    const response = await fetch('http://localhost:8000/to_do_list/tasks/', {
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
  

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hi, {first_name} 👋</Text>
      </View>
      <Button title="Log Out" onPress={logOut} />
      <Button title="Fetch Tasks" onPress={fetchTasks} />
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen1')}
          >
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Text style={styles.squareText}>Community</Text>
              <View style={styles.squareIconWrapper}>
                <FontAwesome name="users" size={24} color="white" style={styles.squareIcon} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen2')}
          >
            <Text style={styles.squareText}>Make Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen3')}
          >
            <Text style={styles.squareText}>Other</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            onPress={() => navigateToScreen('Screen4')}
          >
            <Text style={styles.squareText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.taskListContainer}>
      <Text style={styles.taskListTitle}>To Do List</Text>
        <ScrollView style={styles.taskScrollView}>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Homepage;