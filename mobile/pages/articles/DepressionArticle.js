import React from 'react';
import { ScrollView, Text, StyleSheet, Linking, View } from 'react-native';
import styles from '../../styles/ArticleStyles';

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
      <Text style={styles.paragraph}>
        Symptoms of a general low mood may include feeling:
      </Text>
      <Text style={styles.listItem}>Sad</Text>
      <Text style={styles.listItem}>Anxious or panicky</Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/sleep-and-tiredness/')}>
        More tired than usual or being unable to sleep
      </Text>
      <Text style={styles.listItem}>Angry or frustrated</Text>
      <Text style={styles.listItem}>Low on confidence or self-esteem</Text>
      <Text style={styles.subheader}>See a GP if:</Text>
      <Text style={styles.listItem}>you've had a low mood for more than 2 weeks</Text>
      <Text style={styles.listItem}>you're struggling to cope with a low mood</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(`tel:116123`)}>
        116 123
      </Text>
    </ScrollView>
  );
};

export default DepressionArticle;