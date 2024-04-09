import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
// import nhsLogo from "../assets/images/nhs_attribution.png";
import CaloriesArticle from './articles/CaloriesArticle';
import BalancedDietArticle from './articles/BalancedDietArticle';
import TipsArticle from './articles/TipsArticle';



function Diet() {

    const articles = [
        {
          id: 'calories',
          title: 'Understanding Calories',
          Component: CaloriesArticle,
          description: 'Explore the science of calories and their impact on weight management to help you make informed dietary choices',
        },
        {
          id: 'diet',
          title: 'Eating a balanced diet',
          Component: BalancedDietArticle,
          description:'Discover the key components of a balanced diet and how it can significantly improve your overall health',
        },
        {
          id: 'tips',
          title: '8 tips for healthy eating',
          Component: TipsArticle,
          description:'Learn eight practical tips that can guide you towards healthier eating habits and better nutrition.',
        },
      ];

  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id);
  };
  
  const SelectedArticleComponent = articles.find(article => article.id === selectedArticleId)?.Component;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Diet</Text>
      </View>
      <View style={styles.articleContainer}>
        {articles.map((article) => (
          <TouchableOpacity key={article.id} style={styles.card} onPress={() => handleArticleSelect(article.id)}>
            <Text>{article.title}</Text>
            <Text>{article.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {SelectedArticleComponent && <SelectedArticleComponent />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  articleContainer: {
    flexDirection: 'column',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  logoContainer: {
    alignItems: 'center',
    margin: 20,
  },
  logo: {
    width: 200,
    height: 100,
  }
});

export default Diet;
