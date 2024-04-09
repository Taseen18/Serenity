import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';

const StressArticle = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Stress</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Most people feel stressed sometimes and some people find stress helpful or even motivating. But if stress is affecting your life, there are things you can try that may help.</Text> Support is also available if you're finding it hard to cope with stress.
      </Text>
      <Text style={styles.paragraph}>
        Stress can cause many different symptoms. It might affect how you feel physically, mentally, and also how you behave.
      </Text>
      <Text style={styles.paragraph}>
        It's not always easy to recognise when stress is the reason you're feeling or acting differently.
      </Text>

      <Text style={styles.subheader}>Referring yourself for therapy</Text>
      <Text style={styles.paragraph}>
        If you need more support, you can get free talking therapies like cognitive behavioural therapy (CBT) on the NHS. You can refer yourself directly to an NHS talking therapies service without a referral from a GP.
      </Text>
      {/* Convert <a> tags to clickable Text components */}
      <Text style={styles.link} onPress={() => openURL('https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt/overview/')}>
        cognitive behavioural therapy (CBT)
      </Text>

      <Text style={styles.subheader}>See a GP if:</Text>
      {/* Example of converting <ul><li> to Text components */}
      <Text style={styles.listItem}>you're struggling to cope with stress</Text>
      <Text style={styles.listItem}>things you're trying yourself are not helping</Text>
      <Text style={styles.listItem}>you would prefer to get a referral from a GP</Text>

      {/* Continue converting the rest of the article content */}
      
      {/* For handling telephone numbers */}
      <Text style={styles.link} onPress={() => Linking.openURL(`tel:111`)}>
        call: 111
      </Text>
      
      {/* Convert the remaining parts of the article in the same manner */}
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
  }
});

export default StressArticle;