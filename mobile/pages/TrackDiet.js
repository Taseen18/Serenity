import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../lib/helper/supabaseClient";

function TrackDiet() {
    const [entries, setEntries] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [activeForm, setForm] = useState(false); // True for diet, false for exercise.

    const fetchEntries = async () => {
        const user = await supabase.auth.getUser();
        const userID = user.data.user.id;
        let table = 'diet'
        const { data, error } = await supabase.from(table).select().eq('user_id', userID);

        if (error) {
            console.error(error);
            return;
        }
        const aggregatedEntries = data.reduce((acc, entry) => {
            const dayOfWeek = new Date(entry.created_at).getDay();
            // console.log("acc",acc);
            // console.log("x:",acc[dayOfWeek]);


            if (!acc[dayOfWeek]) {
                acc[dayOfWeek] = { calories: 0, protein: 0, steps: 0, count: 0 };
            }
            acc[dayOfWeek].calories += entry.calories || 0;
            acc[dayOfWeek].protein += entry.protein || 0;
            acc[dayOfWeek].count += 1;
            return acc;
        }, {});

        setEntries(aggregatedEntries);
    };

    const insertData = async () =>{
        const user = supabase.auth.getUser();
        const userID = (await user).data.user.id;
        let table = 'diet';

        const {data, error} = await supabase.from(table).insert([{calories:value1, protein:value2, user_id:userID}])
        if (error){
            console.error(error);
        }
        else{
            fetchEntries();
        }
    }

    const handleSubmit = () => {
        if (value1 && value2) {
            insertData();
            setValue1('');
            setValue2('');
        } else {
            alert("Please fill in all required fields.");
        }
    };
    const isSubmitDisabled = !value1 || !value2;

    useEffect(() => {
        fetchEntries();
    }, []); 

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return (
        <View style = {styles.container}>        
            {/* <Button title = {activeForm ? 'Track Exercise': 'Track Diet'} onPress={() => setForm(!activeForm)}/> */}
            <FlatList
                data={daysOfWeek}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const entry = entries[index];
                    console.log(index);
                    console.log(entry);
                    if (entry) {
                        return <Text style={styles.entry}>{item}, Calories: {entry.calories}, Protein: {entry.protein}</Text>;
                    }
                    // Show something even if there's no entry for that day
                    return <Text style={styles.entry}>{item}</Text>;
                }}
            />
            <TextInput 
                placeholder='Calories'
                value = {value1}
                onChangeText={setValue1}
                keyboardType = "numeric"
                style ={styles.input} 
            />
            <TextInput
                placeholder = "Protein"
                value = {value2}
                onChangeText={setValue2}
                keyboardType = "numeric"
                style ={styles.input}
            />
            <TouchableOpacity 
                onPress={handleSubmit}
                disabled={isSubmitDisabled}
                style={[styles.button, isSubmitDisabled && styles.buttonDisabled]}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>    
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F4F8', // Soft neutral background
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    input: {
      height: 48,
      backgroundColor: '#FFFFFF', // Bright, clean input field
      borderRadius: 10,
      marginVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      backgroundColor: '#10B981', // A vibrant button color
      borderRadius: 25,
      paddingVertical: 12,
      marginVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 6,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    buttonDisabled: {
      backgroundColor: '#94A3B8', // A muted color for disabled state
    },
    entry: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 10,
      fontSize: 18,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
  });

export default TrackDiet;