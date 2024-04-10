import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import BenefitsArticle from './articles/BenefitsExerciseArticle';
import SittingArticle from './articles/SittingArticle';
import PhysicalActivitiesArticle from './articles/PhysicalActivitiesArticle';



function ExerciseArticle() {

  const articles = [
    {
      id: 'benefits',
      title: 'Benefits of exercise',
      Component: BenefitsArticle,
      description: 'Uncover the multitude of health benefits regular exercise offers beyond weight loss.',
    },
    {
      id: 'sitting',
      title: 'Sitting Disease',
      Component: SittingArticle,
      description: 'Delve into the risks associated with prolonged sitting and what it means for your long-term health.',
    },
    {
      id: 'activities',
      title: 'Physical activities',
      Component: PhysicalActivitiesArticle,
      description:'Find out how different types of physical activities can cater to varying fitness goals and lifestyles.',
    },
  ];

  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id);
  };
  
  const SelectedArticleComponent = articles.find(article => article.id === selectedArticleId)?.Component;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Exercise 💪</Text>
      </View>
      <View style={styles.articleContainer}>
        {articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.card}
            onPress={() => handleArticleSelect(article.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {SelectedArticleComponent && <SelectedArticleComponent />}
      <View style={styles.creditContainer}>
        <Image
            source={require("../assets/images/nhs.png")}
            resizeMode="contain"
            style={styles.creditLogo}
        />
        <Text style={styles.creditText}>Content supplied by the NHS website</Text>
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
  articleContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  articleDescription: {
    fontSize: 16,
    color: '#666666',
  },
  creditContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  creditLogo: {
    width: 150,
    height: 50, 
  },
  creditText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default ExerciseArticle;
