import React from 'react';
import { ScrollView, Text, StyleSheet, Linking, View } from 'react-native';
import styles from '../../styles/ArticleStyles';


const CaloriesArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Understanding Calories</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>The amount of energy in food or drink is measured in calories.</Text> You need energy from calories for your body to work properly. Your body uses this energy to function properly.
      </Text>
      <Text style={styles.paragraph}>
        To stay at around the same weight, the calories your body uses should be the same as the amount of calories you eat and drink.
      </Text>
      <Text style={styles.paragraph}>
        If you do not use the same amount of calories as you eat and drink, your body weight may change. For example:
      </Text>
      <Text style={styles.listItem}>you're likely to put on weight if you eat and drink more calories than you use. This is because your body stores the extra energy as fat</Text>
      <Text style={styles.listItem}>you're likely to lose weight if you eat and drink fewer calories than you use. This is because your body uses its stored fat for energy</Text>
      <Text style={styles.paragraph}>
        Calorie information is often given in kcals, which is short for kilocalories. It may also be given in kJ, which is short for kilojoules.
      </Text>
      <Text style={styles.paragraph}>As a guide:</Text>
      <Text style={styles.listItem}>An average man needs 2,500kcal a day</Text>
      <Text style={styles.listItem}>an average woman needs 2,000kcal a day</Text>
      <Text style={styles.paragraph}>This could be different based on your:</Text>
      <Text style={styles.listItem}>Age</Text>
      <Text style={styles.listItem}>Weight</Text>
      <Text style={styles.listItem}>height</Text>
      <Text style={styles.listItem}>How much exercise you do</Text>
      <Text style={styles.subheader}>BMI calculator</Text>
      <Text style={styles.paragraph}>
        Body mass index (BMI) is a measurement that works out if you're a healthy weight for your height.
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/healthy-weight/bmi-calculator/')}>
        Find out your BMI
      </Text>
      <Text style={styles.subheader}>Do</Text>
      <Text style={styles.listItem}>
        check nutrition labels on food packaging for calorie information – this will be displayed under the "energy" heading
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/')}>
        The Eatwell Guide
      </Text>
    </ScrollView>
  );
};


export default CaloriesArticle;