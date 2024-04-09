import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';

const BalancedDietArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Eating a balanced diet</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Eating a healthy, balanced diet is an important part of maintaining good health, and can help you feel your best.</Text> This means eating a wide variety of foods in the right proportions, and consuming the right amount of food and drink to achieve and maintain a healthy body weight.
      </Text>
      <Text style={styles.paragraph}>
        This page covers healthy eating advice for the general population. People with special dietary needs or a medical condition should ask their doctor or a registered dietitian for advice.
      </Text>
      {/* Section header */}
      <Text style={styles.subheader}>Food groups in your diet</Text>
      <Text style={styles.paragraph}>
        The Eatwell Guide shows that to have a healthy, balanced diet, people should try to: eat at least 5 portions of a variety of fruit and vegetables every day, base meals on higher fibre starchy foods like potatoes, bread, rice or pasta, and more.
      </Text>
      {/* Link example */}
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/eat-well/the-eatwell-guide/')}>
        The Eatwell Guide
      </Text>
      {/* Continue adapting the rest of your article content similarly */}
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
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 8,
  }
});

export default BalancedDietArticle;