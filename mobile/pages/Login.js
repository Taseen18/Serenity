import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Button, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../lib/helper/supabaseClient";
import styles from '../styles/LoginStyles';

const Login = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN') {
                await AsyncStorage.setItem('userToken', JSON.stringify(session));
                console.log("User signed in");
                navigation.navigate('Main');
            } else if (event === 'SIGNED_OUT') {
                await AsyncStorage.removeItem('userToken');
                navigation.navigate('Login');
            }
        });

        return () => {
            if (authListener) {
                authListener?.unsubscribe();
            };
        };
    }, [navigation]);

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    /*
    const storeData = async (value) => {
        try {
            const currentToken = await AsyncStorage.getItem('token');
            console.log("Current token before update:", currentToken);

            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('token', jsonValue);
        } catch (e) {
            console.error("Error saving data", e);
        }
    };
    */

    const handleSubmit = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

    function signUp() {
        navigation.navigate('Sign Up');
    }

    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')} // Update the path to your image
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={styles.title}>S E R E N I T Y</Text>
            <View style={styles.overlay}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry
                />
                <Button title="Login" onPress={handleSubmit} />
                <Text style={styles.baseText}>{"\n"}Don't have an account?</Text>
                <Button title="Sign Up Here" onPress={signUp} />
            </View>
        </ImageBackground>
    );
};

export default Login;