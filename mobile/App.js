import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {TouchableOpacity} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ChatsList from './pages/ChatsList';
import MessengerScreen from './pages/MessengerScreen';
import MakeAppointmentScreen from './pages/MakeAppointment';
import MHPSelection from './pages/MakeAppointmentMhpSelection';
import AccountSettings from './pages/profilePages/Account';
import ChangeName from './pages/profilePages/accountPages/ChangeName';
import ChangeEmail from './pages/profilePages/accountPages/ChangeEmail';
import ChangePassword from './pages/profilePages/accountPages/ChangePassword'
import Community from './pages/Community';
import Resources from './pages/Resources';
import ExerciseArticle from './pages/ExerciseArticle'
import Diet from './pages/Diet'
import MentalHealth from './pages/MentalHealth'

//Placeholders:
const Trackers = () => null;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabScreen() {
  return (
    <Tab.Navigator 
      initialRouteName="Homepage" 
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          //tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
  name="Community"
  component={Community}
  options={{
    // Add any options here if needed
  }}
/>
      <Tab.Screen 
        name="Messages" 
        component={ChatsList}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Resources" 
        component={Resources}
        options={{
          tabBarLabel: 'Resources',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Trackers" 
        component={Trackers}
        options={{
          tabBarLabel: 'Trackers',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Wrap your app in the NavigationContainer and set up the stack navigator
const App = () => {
  SplashScreen.preventAutoHideAsync();
  let [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
  });
  useEffect(() => {
    async function handleSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    handleSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Sign Up" 
          component={SignUp}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Messenger" 
          component={MessengerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ExerciseArticle"
          component={ExerciseArticle}
          options={({ navigation }) => ({ 
            title: 'Articles',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Resources')}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Diet"
        component={Diet}
        options={({ navigation }) => ({ 
          title: 'Articles',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Resources')}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
        />
        <Stack.Screen name="MentalHealth"
        component={MentalHealth}
        options={({ navigation }) => ({ 
          title: 'Articles',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Resources')}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
        />
        <Stack.Screen 
          name="Make Appointment" 
          component={MakeAppointmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Select MHP" 
          component={MHPSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Account Settings" 
          component={AccountSettings}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Change Name" 
          component={ChangeName}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Change Email" 
          component={ChangeEmail}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="Change Password" 
          component={ChangePassword}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;