import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/helper/supabaseClient';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [nonce, setNonce] = useState('');
    const navigation = useNavigation();

    const updatePassword = async () => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
            nonce: nonce,
        });

        if (error) {
            Alert.alert('Error', error.message);
            console.error("Error changing password", error);
        } else {
            Alert.alert('Success', 'Password changed successfully');
            console.log('Password changed successfully');
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='New Password'
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmation Code (optional)"
                value = {nonce}
                onChangeText={setNonce}
            />
            <Text>If you have logged in recently the Confirmation Code wont be needed</Text>
            <Button title="Save" onPress={updatePassword}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 40,
      marginBottom: 12,
      borderWidth: 1,
      paddingHorizontal: 10,
    },
});
  
export default ChangePassword;
