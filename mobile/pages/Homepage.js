// pages/Homepage.js
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { supabase } from '../lib/helper/supabaseClient'; // Adjust the path as necessary

const Homepage = ({ navigation }) => {
  const [first_name, setFirstName] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('userToken');
        if (tokenString) {
          const token = JSON.parse(tokenString);
          const first_name = token.user?.user_metadata?.first_name;
          setFirstName(first_name)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    };

    loadUser();
  }, []);


  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await supabase.auth.signOut();
      console.log("User signed out")
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back, {first_name}</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Homepage;