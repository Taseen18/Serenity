import React from 'react';
import { ScrollView, Text, StyleSheet, Linking, View } from 'react-native';
import styles from '../../styles/ArticleStyles';

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
      <Text style={styles.subheader}>Symptoms of depression</Text>
      <Text style={styles.paragraph}>
        If you have a low mood that lasts 2 weeks or more, it could be a sign of depression. Other symptoms of depression may include: not getting any enjoyment out of life, feeling hopeless, not being able to concentrate on everyday things, having suicidal thoughts or thoughts about harming yourself.
      </Text>
      <Text style={styles.listItem}>Sad</Text>
      <Text style={styles.listItem}>Anxious or panicky</Text>
      <Text style={styles.link} onPress={() => openURL('https://www.samaritans.org/how-we-can-help/contact-samaritan/')}>
        Samaritans
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL(`tel:116123`)}>
        116 123
      </Text>
      <View>
        <Text style={styles.subheader}>Symptoms - Possible cause</Text>
        <Text style={styles.paragraph}>Feeling low or depressed in a seasonal pattern, usually during winter - Seasonal Affective Disorder (SAD)</Text>
        <Text style={styles.paragraph}>Feeling low or depressed after the birth of a child - Postnatal depression</Text>
      </View>
    </ScrollView>
  );
};

export default AnxietyArticle;