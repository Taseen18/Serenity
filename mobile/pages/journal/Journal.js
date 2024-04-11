import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import JournalEntry from "./journalEntry";
import { SafeAreaView } from "react-native";
//import styles from "../../styles/JournalStyles";

const Journal = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text>Journal 📖</Text>
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
