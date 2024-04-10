import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../lib/helper/djangoURL';
import { useNavigation } from '@react-navigation/native';
import{ MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styles from "../styles/ViewAppointmentStyles";

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const apiUrl = getApiUrl();


    useEffect(() => {
        fetchAppointments();
    }, [])

    const fetchAppointments = async () => {
        try {
            const tokenString = await AsyncStorage.getItem('userToken');
            if (!tokenString) {
                console.warn("Token not available");
                return;
            }
            const token = JSON.parse(tokenString);
            const access_token = token.access_token;
            const response = await fetch(`${apiUrl}appointment/getAppointments/`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${access_token}`,
                  'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data) {
                setAppointments(data.appointments);
            } else {
                console.error('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error loading appointments', error)
        }
    }





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text>Your Appointments</Text>
                </View>
                <ScrollView style={styles.appointmentScrollView}>
                    {appointments.map((appointment, index) => (
                        <View key={index} style={styles.appointmentItem}>
                            <View style={styles.appointmentTextContainer}>
                            <Text style={styles.appointmentDate}>{appointment.date_time}</Text>
                            <Text style={styles.appointmentDescription}>With: {appointment.with.name}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}





export default ViewAppointments;