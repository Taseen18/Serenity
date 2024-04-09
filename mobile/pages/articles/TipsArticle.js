import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import styles from '../../styles/ArticleStyles';

const TipsArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>8 tips for healthy eating</Text>
      <Text style={styles.paragraph}>These 8 practical tips cover the basics of healthy eating and can help you make healthier choices.</Text>
      <Text style={styles.paragraph}>
        The key to a healthy diet is to eat the right amount of calories for how active you are so you balance the energy you consume with the energy you use.
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/')}>
        Starchy carbohydrates
      </Text>
      <Text style={styles.listItem}>Choose higher fibre or wholegrain varieties, such as wholewheat pasta, brown rice or potatoes with their skins on.</Text>
      <Text style={styles.subheader}>Sugar</Text>
      <Text style={styles.paragraph}>
        Regularly consuming foods and drinks high in sugar increases your risk of obesity and tooth decay.
      </Text>
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/how-to-cut-down-on-sugar-in-your-diet/')}>
        Find out how to cut down on sugar in your diet
      </Text>
    </ScrollView>
  );
};

export default TipsArticle;