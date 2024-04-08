import React from 'react';
import  { View, Button, StyleSheet } from 'react-native';

const AccountSettings = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button title="Change Name" onPress={() => navigation.navigate('Change Name')} />
            <Button title="Change Email" onPress={() => navigation.navigate('Change Email')} />
            <Button title="Change Password" onPress={() => navigation.navigate('Change Password')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default AccountSettings;