import React, {useState, useEffect, useCallback} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput, 
  Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/helper/supabaseClient';
import { getApiUrl } from '../lib/helper/djangoURL';
import styles from '../styles/HomepageStyles';
import { MaterialIcons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Homepage = ({ navigation }) => {
  const [first_name, setFirstName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completingTaskIds, setCompletingTaskIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const apiUrl = getApiUrl();

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

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await AsyncStorage.setItem('userToken', JSON.stringify(session));
        setFirstName(session.user?.user_metadata?.first_name || 'there');
      }
    });

    loadUser();
    fetchTasks();

    return () => {
      authListener?.unsubscribe?.();
    };
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    console.log(`Navigate to ${screenName}`);
  };

  /*
  const makeAppointment = async () => {
    const tokenString = await AsyncStorage.getItem('userToken');
    if (!tokenString) {
      console.warn('Token not available');
      return;
    }
    const token = JSON.parse(tokenString);
    //console.log(token);
    const access_token = token.access_token;
    const response = await fetch(`${apiUrl}appointment/makeAppointment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`, 
      }
    })
  }
  */

  const fetchTasks = async () => {
    const tokenString = await AsyncStorage.getItem('userToken');
    if (!tokenString) {
      console.warn('Token not available');
      return;
    }
    const token = JSON.parse(tokenString);
    //console.log(token);
    const access_token = token.access_token;
    //console.log(access_token)
    const response = await fetch(`${apiUrl}to_do_list/tasks/`, {
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

      const response = await fetch(`${apiUrl}to_do_list/tasks/update/${taskId}/`, {
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

  const handleAddTask = async (newTaskTitle, newTaskDescription = '') => {
    const tokenString = await AsyncStorage.getItem('userToken');
    if (!tokenString) {
      console.warn('Token not available');
      return;
    }
    const token = JSON.parse(tokenString);
    const access_token = token.access_token;

    const response = await fetch(`${apiUrl}to_do_list/tasks/create/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTaskTitle, description: newTaskDescription }),
    });

    if (response.ok) {
      fetchTasks();
      setModalVisible(false);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } else {
      console.error('Error: Failed to add new task');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hi, {first_name} 👋</Text>
        </View>
        <View style={styles.gridContainer}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.square}
              onPress={() => navigateToScreen('Resources')}
            >
              <ImageBackground
                source={require('../assets/images/squares/tropical.png')}
                resizeMode='cover'
                style={{ flex: 1 }}
              >
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text style={styles.squareText}>Resources</Text>
                  <View style={styles.squareIconWrapperResources}>
                    <MaterialIcons name="article" size={24} color="black" style={styles.squareIcon} />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.square}
              onPress={() => navigateToScreen('Journal')}
            >
              <ImageBackground
                source={require('../assets/images/squares/woods.png')}
                resizeMode='cover'
                style={{ flex: 1 }}
              >
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text style={styles.squareText}>Journal</Text>
                  <View style={styles.squareIconWrapperOther2}>
                    <FontAwesome5 name="book-open" size={24} color="black" style={styles.squareIcon} />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.square}
              onPress={() => navigateToScreen('Make Appointment')}
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
              onPress={() => navigateToScreen('View Appointments')}
            >
              <ImageBackground
                source={require('../assets/images/squares/mountain.png')}
                resizeMode='cover'
                style={{ flex: 1 }}
              >
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text style={styles.squareText}>View Appointments</Text>
                  <View style={styles.squareIconWrapperOther1}>
                    <FontAwesome name="heart" size={24} color="black" style={styles.squareIcon} />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Task Title"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                style={styles.modalText}
              />
              <TextInput
                placeholder="Description (Optional)"
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                style={styles.modalText}
                multiline
              />
              <Button title="Add Task" onPress={() => handleAddTask(newTaskTitle, newTaskDescription)} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <View style={styles.taskListContainer}>
          <View style={styles.taskListHeader}>
            <Text style={styles.taskListTitle}>To Do List ✅</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AntDesign name="pluscircle" size={24} color="blue" />
            </TouchableOpacity>

          </View>
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
    </SafeAreaView>
  );
};

export default Homepage;