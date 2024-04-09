import React from 'react';
import { ScrollView, Text, StyleSheet, Linking, View } from 'react-native';

const DepressionArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Low mood, sadness and depression</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Most people feel low sometimes, but if it's affecting your life, there are things you can try that may help.</Text> Support is also available if you're finding it hard to cope with low mood, sadness or depression.
      </Text>
      {/* Symptoms of a general low mood */}
      <Text style={styles.paragraph}>
        Symptoms of a general low mood may include feeling:
      </Text>
      <Text style={styles.listItem}>sad</Text>
      <Text style={styles.listItem}>anxious or panicky</Text>
      {/* Link example */}
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/sleep-and-tiredness/')}>
        more tired than usual or being unable to sleep
      </Text>
      {/* More list items */}
      <Text style={styles.listItem}>angry or frustrated</Text>
      <Text style={styles.listItem}>low on confidence or self-esteem</Text>
      
      {/* Other sections converted in a similar manner */}
      
      {/* See a GP if: */}
      <Text style={styles.subheader}>See a GP if:</Text>
      <Text style={styles.listItem}>you've had a low mood for more than 2 weeks</Text>
      <Text style={styles.listItem}>you're struggling to cope with a low mood</Text>
      {/* More conversion following the pattern */}
      
      {/* Handling a telephone link */}
      <Text style={styles.link} onPress={() => Linking.openURL(`tel:116123`)}>
        116 123
      </Text>
      {/* Convert the rest following the pattern above */}
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
});

export default DepressionArticle;