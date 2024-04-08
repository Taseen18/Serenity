import React, {useState, useEffect, useCallback} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput, 
  Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { supabase } from '../lib/helper/supabaseClient'; // Adjust the path as necessary
import styles from '../styles/HomepageStyles';
import { MaterialIcons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const Resources = ({navigation}) => {
    
}