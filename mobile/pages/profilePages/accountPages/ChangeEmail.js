import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../../lib/helper/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ChangeEmail = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const updateEmail = async () => {

        const {data: updateData, error: updateError} = await supabase.auth.updateUser({
            email: email,
        });

        if (updateError) {
            Alert.alert('Error', updateError.message);
            console.error("Error updating email", error);
            return;
        }

        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()

        if (refreshError) {
            Alert.alert('Error', refreshError.message);
            console.error("Error refreshing token", refreshError);
            return;
        }

        await AsyncStorage.setItem('userToken', JSON.stringify(refreshData.session));

        console.log("Email updated successfully")
        Alert.alert('Success', 'Email updated', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='New Email'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button title="Save" onPress={updateEmail}/>
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
        padding: 10,
    },
});

export default ChangeEmail;