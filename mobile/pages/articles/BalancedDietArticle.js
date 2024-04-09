import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import styles from '../../styles/ArticleStyles';


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
      <Text style={styles.subheader}>Food groups in your diet</Text>
      <Text style={styles.paragraph}>
        The Eatwell Guide shows that to have a healthy, balanced diet, people should try to: eat at least 5 portions of a variety of fruit and vegetables every day, base meals on higher fibre starchy foods like potatoes, bread, rice or pasta, and more.
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/eat-well/the-eatwell-guide/')}>
        The Eatwell Guide
      </Text>
    </ScrollView>
  );
};

export default BalancedDietArticle;