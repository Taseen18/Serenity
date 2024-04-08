import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Button title="Account Settings" onPress={() => navigation.navigate('Account Settings')} />
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};


export default Profile;
