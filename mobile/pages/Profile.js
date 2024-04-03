import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/helper/supabaseClient';
import styles from '../styles/ProfileStyles';

const Profile = ({ navigation }) => {
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
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
};


export default Profile;
