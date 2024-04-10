import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "../lib/helper/supabaseClient";
import trackdiet from '../assets/images/trackdiet.png';
import trackexercise from '../assets/images/trackexercise.png';


function Trackers({navigation}) {
    const [entries, setEntries] = useState([]);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [activeForm, setForm] = useState(false); // True for diet, false for exercise.

    const fetchEntries = async () => {
        const user = await supabase.auth.getUser();
        const userID = user.data.user.id;
        let table = activeForm ? 'diet' : 'exercise';
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
            if (activeForm) {
                acc[dayOfWeek].calories += entry.calories || 0;
                acc[dayOfWeek].protein += entry.protein || 0;
            } else {
                acc[dayOfWeek].steps += entry.steps|| 0;
            }
            acc[dayOfWeek].count += 1;
            return acc;
        }, {});

        setEntries(aggregatedEntries);
    };

    const insertData = async () =>{
        const user = supabase.auth.getUser();
        const userID = (await user).data.user.id;
        let table = activeForm ? 'diet':'exercise';
        if (activeForm){
            const {data, error} = await supabase.from(table).insert([{calories:value1, protein:value2, user_id:userID}])
            if (error){
                console.error(error);
            }
            else{
                fetchEntries();
            }
        }
        else {
            const {data, error} = await supabase.from(table).insert([{steps:value1, user_id:userID}]);
            if (error){
                console.error(error);
            }
            else{
                fetchEntries();
            }
        }
    }

    const handleSubmit = () => {
        if ((activeForm && value1 && value2) || (!activeForm && value1)) {
            insertData();
            setValue1('');
            setValue2('');
        } else {
            // Optionally alert the user that all fields are required.
            alert("Please fill in all required fields.");
        }
    };
    const isSubmitDisabled = activeForm ? !value1 || !value2 : !value1;

    useEffect(() => {
        fetchEntries();
    }, [activeForm]); // Refetch entries when activeForm changes

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


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
        </SafeAreaView>

        // <View style = {styles.container}>
        //     <TextInput 
        //         placeholder={activeForm ? 'Calories':'Steps'}
        //         value = {value1}
        //         onChangeText={setValue1}
        //         keyboardType = "numeric"
        //         style ={styles.input} 
        //         required/>
        //         {activeForm && (
        //             <TextInput
        //                 placeholder = "Protein"
        //                 value = {value2}
        //                 onChangeText={setValue2}
        //                 keyboardType = "numeric"
        //                 style ={styles.input}
        //                 required
        //             />
        //         )}
        //     <TouchableOpacity 
        //         onPress={handleSubmit}
        //         disabled={isSubmitDisabled}
        //         style={[styles.button, isSubmitDisabled && styles.buttonDisabled]}>
        //         <Text style={styles.buttonText}>Submit</Text>
        //     </TouchableOpacity>            
        //     <Button title = {activeForm ? 'Track Exercise': 'Track Diet'} onPress={() => setForm(!activeForm)}/>
        //     <FlatList
        //         data={daysOfWeek}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderItem={({ item, index }) => {
        //             const entry = entries[index];
        //             console.log(index);
        //             console.log(entry);
        //             if (entry && activeForm) {
        //                 return <Text style={styles.entry}>{item}, Calories: {entry.calories}, Protein: {entry.protein}</Text>;
        //             } else if (entry && !activeForm) {
        //                 return <Text style={styles.entry}>{item}, Steps: {entry.steps}</Text>;
        //             }
        //             // Show something even if there's no entry for that day
        //             return <Text style={styles.entry}>{item}</Text>;
        //         }}
        //     />
        // </View>
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
        justifyContent: 'space-between', // Evenly space out cards
        paddingHorizontal: 10, // Add padding on the sides
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
        justifyContent: 'flex-end', // Aligns the text to the bottom
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
  });

export default Trackers;