import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
// import nhsLogo from "../assets/images/nhs_attribution.png";
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
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => {/* Navigation logic to Diet */}}>
          <Text>{"< Diet"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Exercise</Text>
        <TouchableOpacity onPress={() => {/* Navigation logic to Mental Health */}}>
          <Text>{"Mental Health >"}</Text>
        </TouchableOpacity>
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
      {/* <View style={styles.logoContainer}>
        <Image source={require("../assets/images/nhs_attribution.png")} style={styles.logo} />
      </View> */}
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

export default ExerciseArticle;
