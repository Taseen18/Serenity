import React from 'react';
import { ScrollView, Text, Linking } from 'react-native';
import styles from '../../styles/ArticleStyles';

const BenefitsExerciseArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Benefits of exercise</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Step right up! It's the miracle cure we've all been waiting for.</Text> It can reduce your risk of major illnesses, such as coronary heart disease, stroke, type 2 diabetes, and cancer, and lower your risk of early death by up to 30%.
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/conditions/coronary-heart-disease/')}>
        coronary heart disease
      </Text>
      <Text style={styles.paragraph}>
        It's free, easy to take, has an immediate effect and you don't need a GP to get some. Its name? Exercise.
      </Text>
      <Text style={styles.paragraph}>
        Check physical activity guidelines for:
      </Text>
      <Text style={styles.listItem} onPress={() => openURL('https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-children-under-five-years/')}>
        children (under 5 years)
      </Text>
      <Text style={styles.paragraph}>
        Exercise is the miracle cure we've always had, but for too long we've neglected to take our recommended dose. Our health is now suffering as a consequence.
      </Text>
    </ScrollView>
  );
};

export default BenefitsExerciseArticle;