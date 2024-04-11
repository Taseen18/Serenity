import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import JournalEntry from "./journalEntry";
//import styles from "../../styles/JournalStyles";

const Journal = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.JournalHeader}>
        <Text style={styles.JournalTitle}>Journal📖</Text>
      </View>

      <View>
        <Pressable
          onPress={() => navigation.navigate("CreateJournalEntry")}
          style={styles.AddEntryButton}
        >
          <Text>Add Entry</Text>
        </Pressable>
      </View>

      <View>
        <JournalEntry />
      </View>
    </ScrollView>
  );
};

export default Journal;