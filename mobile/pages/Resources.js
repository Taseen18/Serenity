import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput, 
  Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
import styles from '../styles/ResourcesStyles';
import ExerciseArticle from './ExerciseArticle';
import { MaterialIcons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import exerciseImage from '../assets/images/exercise.png';
import dietImage from '../assets/images/diet.png';
import mentalHealthImage from '../assets/images/brain.png';
import { SafeAreaView } from 'react-native-safe-area-context';


const Resources = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Resources</Text>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ExerciseArticle')}
            >
              <ImageBackground source={exerciseImage} style={styles.cardImage}>
                <Text style={styles.cardText}>Exercise</Text>
              </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Diet')}
            >
              <ImageBackground source={dietImage} style={styles.cardImage}>
                <Text style={styles.cardText}>Diet</Text>
              </ImageBackground>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('MentalHealth')}
            >
              <ImageBackground source={mentalHealthImage} style={styles.cardImage}>
                <Text style={styles.cardText}>Mental Health</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
    );
  };
export default Resources;
