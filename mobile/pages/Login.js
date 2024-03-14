import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../lib/helper/supabaseClient";

const Login = () => {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('token', jsonValue);
        } catch (e) {
            console.error("Error saving data", e);
        }
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) throw error;
            await storeData(data);
            navigation.navigate('Homepage');
        } catch (error) {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      fontSize: 48, // Adjust the size as needed
      color: 'white', // Choose a color that stands out against your background
      fontWeight: 'bold',
      position: 'absolute',
      top: 100, // Adjust the distance from the top as needed
      textShadowColor: 'rgba(0, 0, 0, 0.75)', // Optional: Adds a shadow for better readability
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10
    },
    overlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)', // Add a slight background overlay to ensure text is readable
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        width: '80%',
        backgroundColor: 'white',
    },
    baseText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    }
});

export default Login;