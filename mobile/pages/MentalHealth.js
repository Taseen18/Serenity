import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
// import nhsLogo from "../assets/images/nhs_attribution.png";
import StressArticle from './articles/StressArticle';
import AnxietyArticle from './articles/AnxietyArticle';
import DepressionArticle from './articles/DepressionArticle';



function MentalHealth() {

    const articles = [
        {
          id: 'stress',
          title: 'Stress',
          description: 'Understanding and managing stress.',
          Component: StressArticle,
        },
        {
          id: 'anxiety',
          title: 'Anxiety',
          description: 'Identifying and coping with anxiety disorders.',
          Component: AnxietyArticle,
        },
        {
          id: 'depression',
          title: 'Depression',
          description: 'Approaches to dealing with depression.',
          Component: DepressionArticle,
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
        <Text style={styles.title}>Mental Health</Text>
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

export default MentalHealth;
