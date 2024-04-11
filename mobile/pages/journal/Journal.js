import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import JournalEntry from "./journalEntry";
import styles from "../../styles/JournalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
const Journal = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView> 
        <View style={styles.JournalHeader}>
          <Text style={styles.JournalTitle}>Journal📖</Text>
        </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate("CreateJournalEntry")}
            >
              <Text>Add Entry</Text>
            </Pressable>
          </View>

        <View>
          <JournalEntry />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Journal;
