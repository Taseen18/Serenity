import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput, 
    Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
   
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Post from '../components/post';

import styles from '../styles/communityAndPostStyles';

const Community = ({ navigation }) => {
    const [IsAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
    const [newPostTitle, setnewPostTitle] = useState('');
    const [newPostContent, setnewPostContent] = useState('');


    const apiUrl = Platform.select({
        ios: 'http://localhost:8000/community/posts/create/',
        android: 'http://10.0.2.2:8000/community/posts/create/',
      });

  const handleAddPost = async (newPostTitle, newPostContent = '') => {
    const tokenString = await AsyncStorage.getItem('userToken');
    if (!tokenString) {
      console.warn('Token not available');
      return;
    }
    const token = JSON.parse(tokenString);
    const access_token = token.access_token;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
    });

    if (response.ok) {
      setIsAddPostModalOpen(false);
      setNewPostTitle('');
      setNewPostContent('');
    } else {
      console.error('Error: Failed to add new post');
    }
};
  return (
    <View style={styles.community}>
        <Text style={styles.communityTitle}>Community📝</Text>
        <TouchableOpacity onPress={() => setIsAddPostModalOpen(true)}>
          <View style={styles.addPostButton}>
            <Text stlye={styles.addPostButtonText}>ADD POST</Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View styles={styles.postsWrapper}>
            <Post />
          </View>
        </ScrollView>


      <Modal
        animationType="slide"
        transparent={true}
        visible={IsAddPostModalOpen}
        onRequestClose={() => {
          setIsAddPostModalOpen(false);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="..."
              value={newPostTitle}
              onChangeText={setnewPostTitle}
              style={styles.modalText}
            />
            <TextInput
              placeholder="..."
              value={newPostContent}
              onChangeText={setnewPostContent}
              style={styles.modalText}
              multiline
            />
            <Button title="Add Task" onPress={() => handleAddPost(newPostTitle, newPostContent)} />
            <Button title="Close" onPress={() =>  setIsAddPostModalOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>


  );

};

export default Community;