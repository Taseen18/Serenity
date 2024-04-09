import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Platform, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/MakeAppointmentStyles';
import { useNavigation } from '@react-navigation/native';

const MakeAppointmentScreen = ({ route }) => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedMhp, setSelectedMhp] = useState(null);
    const [searchText, setSearchText] = useState('');
    const apiUrl = Platform.select({
        ios: 'http://localhost:8000/',
        android: 'http://10.0.2.2:8000/',
      });

    useEffect(() => {
        if (route.params?.selectMhp) {
            setSelectedMhp(route.params.selectMhp);
            console.log(`Selected MHP: ${route.params.selectMhp.name}`)
        }
    }, [route.params]);

    const openMHPSelectionScreen = () => {
        navigation.navigate('Select MHP');
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const submitAppointment = async () => {
        const tokenString = await AsyncStorage.getItem('userToken');
        if (!tokenString) {
            console.warn('Token not available');
            return;
        }
        const token = JSON.parse(tokenString);
        const access_token = token.access_token;

        const formattedDate = date.toISOString();
        const mhpId = selectedMhp ? selectedMhp.mhp_id : null;
        const response = await fetch(`${apiUrl}appointment/makeAppointment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`, 
            },
            body: JSON.stringify({date_time: formattedDate, reason, mhpId})
        });

        if (response.ok) {
            Alert.alert("Success", "Appointment made successfully", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
            console.log('Appointment made successfully');
        } else {
            console.error('Failed to make appointment');
            Alert.alert("Error", "Failed to make appointment");
        }
    };

    const filteredMhpList = searchText 
    ? mhpList.filter(mhp => mhp?.name?.toLowerCase().includes(searchText.toLowerCase()))
    : [];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.heading}>
                    <Text style={styles.title}>Make Appointment</Text>
                    <Text style={styles.subtitle}>We're here to help</Text>
                </View>

                <Button title="Choose Date and Time" onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="datetime"
                        is24Hour={true}
                        display='default'
                        onChange={onChangeDate}
                    />
                )}

                <TextInput 
                    style={styles.input}
                    onChangeText={setReason}
                    value={reason}
                    placeholder='Reason for appointment'
                />

                <Button title="Select Mental Health Professional" onPress={() => navigation.navigate('Select MHP')}/>
                <Text>Selected MHP: {selectedMhp?.name || 'Any'}</Text>

                <Button title="Submit" onPress={submitAppointment} />
            </View>
        </SafeAreaView>
    );
};

export default MakeAppointmentScreen;