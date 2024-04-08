import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/helper/supabaseClient';
import styles from '../styles/ProfileStyles';

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const updateUserDetails = async () => {
    const userMetadata = {
      first_name: firstName,
      last_name: lastName,
    };

    const { error } = await supabase.auth.updateUser({
      email: email,
      password: password,
      data: userMetadata,
    });

    if (error) {
      Alert.alert('Error updating profile', error.message);
      console.error('Error: unable to update profile', error)
    } else {
      Alert.alert('Profile Updated');
    }
  };

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await AsyncStorage.removeItem('userToken'); // Ensure the token is removed
      console.log("User signed out");
      navigation.navigate('Login'); // Adjust if you have a different screen to navigate to on logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.header}>Profile 👤</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account Settings')}>
          <Text style={styles.text}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logOut}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default Profile;
