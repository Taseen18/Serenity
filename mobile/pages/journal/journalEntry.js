import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/JournalStyles";

function JournalEntry() {
  const navigation = useNavigation();
  const [fecthError, setFetchError] = useState(null);
  const [entries, setEntries] = useState(null);
  const [orderBy, setOrderBy] = useState("entry_id");

  useEffect(() => {
    getEntries();
  });

  async function getEntries() {
    const { data, error } = await supabase
      .from("journal")
      .select()
      .order(orderBy);

    if (error) {
      setFetchError("Could not fetch entries");
      setEntries(null);
      console.log(error);
    }

    if (data) {
      setEntries(data);
      setFetchError(null);
    }
  }

  return (
    <View>
      {fecthError && <Text>{fecthError}</Text>}
      {entries &&
        entries.map((entry) => (
          <View  >
            <Text style={styles.entryStyling}>{entry.title}</Text>
            <Button
              title="Edit Entry"
              onPress={() =>
                navigation.navigate("EditJournalEntry", {
                  title: entry.title,
                  entry: entry.entry,
                  entry_id: entry.entry_id,
                })
              }
            />
            <Text style={styles.entryTitleStyle}>{entry.entry}</Text>
          </View>
        ))}
    </View>
  );
}

export default JournalEntry;
