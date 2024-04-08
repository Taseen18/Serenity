import React from 'react';
import  { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountSettings = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Change Name')}>
                    <Text style={styles.text}>Change Name</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Change Email')}>
                    <Text style={styles.text}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Change Password')}>
                    <Text style={styles.text}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f8f',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 17,
        marginBottom: 9,
    },
  });
  
  export default AccountSettings;