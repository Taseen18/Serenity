import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';

const SittingArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Why we should sit less</Text>
      <Text style={styles.paragraph}>
        There is increasing evidence that, unless you are a wheelchair user, sitting down too much can be a risk to your health. To reduce our risk of ill health from inactivity, we are advised to exercise regularly, at least 150 minutes a week, and reduce sitting time.
      </Text>
      {/* Example of linking to external URLs */}
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/exercise/')}>
        Find out about physical activity guidelines
      </Text>
      {/* Continue with the rest of your article content */}
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
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

export default SittingArticle;