import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/helper/supabaseClient";

const SignUp = () => {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    function handleChange(name, value) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    async function handleSubmit() {
        try {
            const { user, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            }, {
                data: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                }
            });

            if (error) throw error;

            Alert.alert('Success', 'Check your email for the verification link.');
            console.log("User signed up. Email must be verified")
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.error_description || error.message);
        }
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
                    placeholder="First Name"
                    value={formData.first_name}
                    onChangeText={(text) => handleChange('first_name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChangeText={(text) => handleChange('last_name', text)}
                />
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
                    secureTextEntry // Hide password input
                />
                <Button title="Sign Up" onPress={handleSubmit} />
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

export default SignUp;
