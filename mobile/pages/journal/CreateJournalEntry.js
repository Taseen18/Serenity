import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, Button } from "react-native";
import styles from "../../styles/JournalStyles";

const CreateJournalEntry = ({ navigation }) => {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entry || !title) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const tokenString = await AsyncStorage.getItem("userToken");
    if (!tokenString) {
      console.warn("Token not available");
      return;
    }
    const token = JSON.parse(tokenString);
    const user_id = token.user.id;
    console.log(user_id);

    const Today = new Date();

    const { data, error } = await supabase
      .from("journal")
      .insert([
        { user_id: user_id, title: title, entry: entry, date_added: Today },
      ]);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    navigation.navigate("Journal");
  };
  return (
    <View>
      <Text style={styles.entryTitleStyle}>Create an entry</Text>
      <View>
        <TextInput placeholder="entry title ..." value={title} onChangeText={setTitle} />
        <TextInput placeholder="entry content ..."value={entry} onChangeText={setEntry} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default CreateJournalEntry;
