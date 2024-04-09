import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const PhysicalActivitiesArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Physical activity guidelines for adults aged 19 to 64</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Adults should do some type of physical activity every day. Exercise just once or twice a week can reduce the risk of heart disease or stroke.</Text>
      </Text>
      {/* Repeat for each paragraph, converting <ul> and <li> to Text components as needed */}
      <Text style={styles.paragraph}>
        Moderate activity will raise your heart rate, and make you breathe faster and feel warmer. One way to tell if you're working at a moderate intensity level is if you can still talk, but not sing.
      </Text>
      {/* Example of linking to external URLs */}
      <Text style={styles.link} onPress={() => openURL('https://www.gov.uk/government/publications/physical-activity-guidelines-uk-chief-medical-officers-report')}>
        UK Chief Medical Officers' Physical Activity Guidelines
      </Text>
      {/* Repeat for each section of your article */}
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
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

export default PhysicalActivitiesArticle;