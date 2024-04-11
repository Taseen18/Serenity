import React, { useState } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../../styles/JournalStyles";

const EditJournalEntry = ({ navigation }) => {
  const route = useRoute();
  const [title, setTitle] = useState(
    route.params?.title ? route.params?.title : false
  );
  const [entry, setEntry] = useState(
    route.params?.entry ? route.params?.entry : false
  );
  const [formError, setFormError] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("journal")
      .delete()
      .eq("entry_id", route.params?.entry_id);

    if (error) {
      console.log(error);
    }

    navigation.navigate("Journal");
  };

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

    const { data, error } = await supabase
      .from("journal")
      .update({ title: title, entry: entry })
      .eq("entry_id", route.params?.entry_id);

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
      <Text>Create an entry</Text>
      <View>
        <TextInput value={title} onChangeText={setTitle} />
        <TextInput value={entry} onChangeText={setEntry} />
        <Button title="Save Entry" onPress={handleSubmit} />
        <Button title="Delete Entry" onPress={handleClick} />
      </View>
    </View>
  );
};

export default EditJournalEntry;
