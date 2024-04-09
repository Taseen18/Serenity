import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import styles from '../../styles/ArticleStyles';


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
      <Text style={styles.paragraph}>
        Moderate activity will raise your heart rate, and make you breathe faster and feel warmer. One way to tell if you're working at a moderate intensity level is if you can still talk, but not sing.
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.gov.uk/government/publications/physical-activity-guidelines-uk-chief-medical-officers-report')}>
        UK Chief Medical Officers' Physical Activity Guidelines
      </Text>
    </ScrollView>
  );
};

export default PhysicalActivitiesArticle;