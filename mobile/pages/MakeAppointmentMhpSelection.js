import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../lib/helper/djangoURL';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MHPSelection = ({ route }) => {
    const navigation = useNavigation();
    const [mhpList, setMhpList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const apiUrl = getApiUrl();

    useEffect(() => {
        const fetchMhps = async () => {
            try {
                const tokenString = await AsyncStorage.getItem('userToken');
                if (!tokenString) {
                    console.warn('Token not available');
                    return;
                }
                const token = JSON.parse(tokenString);
                const access_token = token.access_token;
                console.log(apiUrl);
                console.log(access_token);

                const response = await fetch(`${apiUrl}appointment/getMhps/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch MHPs');
                }
                const data = await response.json();
                setMhpList(data.mhps);
            } catch (error) {
                console.error('Failed to load MHPs', error);
            }
        };

        fetchMhps();
    }, []);

    const selectMhp = (mhp) => {
        navigation.navigate('Make Appointment', { selectMhp: mhp });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20 }}>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
                    placeholder='Search for an MHP'
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Button title="No Preference" onPress={() => selectMhp({ mhp_id: 'any', name: 'Any' })} />
                <FlatList
                    data={mhpList.filter(mhp => mhp.name.toLowerCase().includes(searchText.toLowerCase()))}
                    keyExtractor={(item) => item.mhp_id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => selectMhp(item)}>
                            <Text style={{ padding: 10 }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default MHPSelection;