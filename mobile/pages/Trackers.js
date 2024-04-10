import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../lib/helper/supabaseClient";
import trackdiet from '../assets/images/trackdiet.png';
import trackexercise from '../assets/images/trackexercise.png';


function Trackers({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Trackers</Text>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TrackDiet')}
            >
              <ImageBackground source={trackdiet} style={styles.cardImage}>
                <Text style={styles.cardText}>Track Diet</Text>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TrackExercise')}
            >
              <ImageBackground source={trackexercise} style={styles.cardImage}>
                <Text style={styles.cardText}>Track Exercise</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.footer}>
            <Text>Stay motivated and track your progress!</Text>
        </View>
        </SafeAreaView>
    );
    
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Consider using a softer color or a gradient
        marginTop: 10,
      },
      headerText: {
        fontSize: 36, // A more reasonable font size for smaller screens
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold', // Ensure this font is included in your project
        paddingLeft: 20,
        color: '#333', // Softer color for the text
      },
      grid: {
        flex: 1, 
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      card: {
        width: '48%',
        height: 200,
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden', 
        elevation: 4, 
      },
      cardImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end', 
      },
      cardText: {
        textAlign:'center',
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        margin: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    entry: {
      fontSize: 18,
      marginVertical: 8,
    },
    footer: { // new footer style
        height: 50,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },

  });

export default Trackers;