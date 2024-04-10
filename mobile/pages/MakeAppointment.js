import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Platform, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../lib/helper/djangoURL';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/MakeAppointmentStyles';
import { useNavigation } from '@react-navigation/native';

const MakeAppointmentScreen = ({ route }) => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(true);
    const [selectedMhp, setSelectedMhp] = useState({ mhp_id: 'any', name: 'Any' });
    const [searchText, setSearchText] = useState('');
    const apiUrl = getApiUrl();

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
                <View style={styles.contentContainer}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>Make Appointment</Text>
                        <Text style={styles.subtitle}>We're here to help</Text>
                    </View>

                    <View style={styles.date}>
                        <DateTimePicker
                            value={date}
                            mode="datetime"
                            is24Hour={true}
                            display='default'
                            onChange={onChangeDate}
                        />
                    </View>

                    <View style={styles.reason}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setReason}
                            value={reason}
                            placeholder='Reason for appointment'
                        />
                    </View>

                    <View style={styles.mhp}>
                        <Button title="Select Mental Health Professional" onPress={() => navigation.navigate('Select MHP')}/>
                        <Text>Selected MHP: {selectedMhp?.name || 'Any'}</Text>
                    </View>
                    
                </View>

                <View style={styles.MmakeAppointmentSubmit}>
                    <Button title="Submit" onPress={submitAppointment} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MakeAppointmentScreen;