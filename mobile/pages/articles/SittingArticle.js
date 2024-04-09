import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import styles from '../../styles/ArticleStyles';

const SittingArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Why we should sit less</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          There is increasing evidence that, unless you are a wheelchair user, sitting down too much can be a risk to your health.
        </Text>
        {' '}To reduce our risk of ill health from inactivity, we are advised to exercise regularly, at least{' '}
        <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/')}>
          150 minutes a week
        </Text>, and reduce sitting time.
      </Text>
        <Text style={styles.listItem}>• Do not leave a child in a pram or buggy, car seats or highchair for longer than 1 hour at a time</Text>
        <Text style={styles.listItem}>• Reduce time spent in walking aids or baby bouncers</Text>
        <Text style={styles.listItem}>• Reduce time spent in front of the TV or other screens</Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-children-under-five-years/')}>
      Find out about physical activity guidelines for children under 5 years
      </Text>
    </ScrollView>
  );
};

export default SittingArticle;