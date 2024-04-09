import React from 'react';
import { ScrollView, Text, StyleSheet, Linking, View } from 'react-native';

const AnxietyArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Signs of an anxiety disorder</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Most people feel low sometimes, but if it's affecting your life, there are things you can try that may help.</Text> Support is also available if you're finding it hard to cope with low mood, sadness, or depression.
      </Text>
      
      {/* Continue converting content */}
      <Text style={styles.subheader}>Symptoms of depression</Text>
      <Text style={styles.paragraph}>
        If you have a low mood that lasts 2 weeks or more, it could be a sign of depression. Other symptoms of depression may include: not getting any enjoyment out of life, feeling hopeless, not being able to concentrate on everyday things, having suicidal thoughts or thoughts about harming yourself.
      </Text>
      
      {/* Example of converting lists */}
      <Text style={styles.listItem}>sad</Text>
      <Text style={styles.listItem}>anxious or panicky</Text>
      {/* Include more list items here */}
      
      {/* Example of handling links */}
      <Text style={styles.link} onPress={() => openURL('https://www.samaritans.org/how-we-can-help/contact-samaritan/')}>
        Samaritans
      </Text>
      
      {/* Handling telephone links */}
      <Text style={styles.link} onPress={() => Linking.openURL(`tel:116123`)}>
        116 123
      </Text>
      
      {/* Example of a simple table representation */}
      <View>
        <Text style={styles.tableHeader}>Symptoms - Possible cause</Text>
        <Text style={styles.tableRow}>Feeling low or depressed in a seasonal pattern, usually during winter - Seasonal Affective Disorder (SAD)</Text>
        <Text style={styles.tableRow}>Feeling low or depressed after the birth of a child - Postnatal depression</Text>
      </View>
      
      {/* Convert the remaining parts of the article in the same manner */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  tableRow: {
    fontSize: 16,
    marginBottom: 4,
  }
});

export default AnxietyArticle;