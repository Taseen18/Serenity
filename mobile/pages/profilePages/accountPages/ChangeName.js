import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../../lib/helper/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ChangeName = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigation = useNavigation();

    const updateName = async () => {
        let updates = {};

        if (firstName) {
            updates.first_name = firstName;
        }

        if (lastName) {
            updates.last_name = lastName;
        }

        const {data: updateData, error: updateError} = await supabase.auth.updateUser({
            data: updates,
        });

        if (updateError) {
            Alert.alert('Error', updateError.message);
            console.error("Error updating name(s)", error);
            return;
        }

        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()

        if (refreshError) {
            Alert.alert('Error', refreshError.message);
            console.error("Error refreshing token", refreshError);
            return;
        }

        await AsyncStorage.setItem('userToken', JSON.stringify(refreshData.session));

        console.log("Name updated successfully")
        Alert.alert('Success', 'Name updated', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='First Name'
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder='Last Name'
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />
            <Button title="Save" onPress={updateName}/>
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

export default ChangeName;
