import React, {useState, useEffect, useCallback} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput, 
  Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
import styles from "../styles/communityAndPostStyles"
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { SafeAreaView } from 'react-native-safe-area-context';

const Post = ({ navigation }) => {
  const [postList, setPosts] = useState([]);
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // For modal visibility
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // For modal visibility
  const [selectedPost, setSelectedPost] = useState(null); // For storing the selected post
  const [comments, setComments] = useState([]);
  const [newPostComment, setnewPostComment] = useState({content: '' });

  const postsUrl = Platform.select({
    ios: 'http://localhost:8000/community/postList/',
    android: 'http://10.0.2.2:8000/community/postList/',
  });

  const fetchPosts = useCallback(async () => {
    const tokenString = await AsyncStorage.getItem('userToken');
    const token = JSON.parse(tokenString);
    const access_token = token.access_token;
    try {
        const response = await fetch(postsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`, 
        }
      });
      const data = await response.json();
      if (data && data.posts) {
        setPosts(data.posts);  
      } else {
        // Handle any errors or empty responses
        console.error('Failed to fetch posts or no posts available');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  });
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const [liked, setLike] = useState(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
    fetchComments(post.post_id);
    
  };
  
 /* const handleLike = () => {
    setLike(!liked);
  };  */



  const fetchComments = async (postId) => {
    try {
        const commenturl = Platform.select({
            ios: `http://localhost:8000/community/commentList/${postId}/`,
            android: `http://10.0.2.2:8000/community/commentList/${postId}/`,
        });

      const response = await fetch(commenturl);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /*
  useEffect(() => {
    // Fetch comments when component mounts
    fetchComments(); // Provide postId if applicable
  }, []);
  */

  const handleAddComment = async (newPostComment,postId) => {
   
    const tokenString = await AsyncStorage.getItem('userToken');
    if (!tokenString) {
      console.warn('Token not available');
      return;
    }
    const token = JSON.parse(tokenString);
    const access_token = token.access_token;
    const commenturl = Platform.select({
        ios: `http://localhost:8000/community/comment/create/${postId}/`,
        android: `http://10.0.2.2:8000/community/comment/create/${postId}/`,
    });
      const response = await fetch( commenturl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({ 
          postId: selectedPost.post_id,
          PostContent: newPostComment || '', 
        }),
      });
      if (response.ok) {
        setIsCommentModalOpen(false);
        // Refresh comments after successful addition
        setnewPostComment('');
        fetchComments(postId)
      } else {
        console.error('Failed to add comment');
      }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.post}>
      {postList.map((post, index) => (
        
          
          <TouchableOpacity onPress={() => handlePostClick(post)}>
            <View key={index} style={styles.PostHolder} >
              <Text style={styles.frontPostTitle}>{post.post_title}</Text>
              <Text style={styles.frontPostedBy}>Posted by - {post.poster_name}</Text>
              {/* <button className={`likeButton ${liked ? 'clicked' : ''}`} onClick={handleLike}></button> */}
            </View>
        </TouchableOpacity>
          
      
        ))}
      
        
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPostModalOpen}
        onRequestClose={() => {
        setIsPostModalOpen(false);
      }}
      
      >
      <View style={styles.openPost}>
      <Button title="Close" onPress={() => setIsPostModalOpen(false)} />
      {selectedPost && (
        <TouchableOpacity onPress={() => fetchComments(selectedPost.post_id)}>
          <View style={styles.PostHolder2} key={selectedPost.post_id}>
              <Text style={styles.postTitle}>{selectedPost.post_title}</Text>
              <Text style={styles.postContent}>{selectedPost.post_content}</Text>
              <View style={styles.postInfo}>
                <Text style={styles.postedBy}>Posted by - {selectedPost.poster_name}</Text>
                <Text style={styles.PostDate}>Posted at - {selectedPost.posted_at}</Text>
              </View>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.CommentSection} key={comments.comment_id}>
            {comments.map((comment, index) => (
            <View key={index}  style={styles.Comment}>      
              <View style={styles.CommentInfo}>
                <Text key={index}>Commented at: {new Date(comment.commented_at).toLocaleString()}</Text>
                <Text key={index}> By :{comment.user_id}</Text>
              </View>
              <Text key={index}>{comment.PostContent}</Text>
              
          </View>
      ))}
      </View>

      <Button title="Write a Comment" style={styles.AddCommentButton} onPress={() => setIsCommentModalOpen(true)} />
    </View>
  </Modal>


      <Modal
          animationType="slide"
          transparent={true}
          visible={isCommentModalOpen }
          onRequestClose={() => {
              setIsCommentModalOpen(false);
          }}
          >
          {selectedPost && (
          <View style={styles.addCommmentWrapper}>
              <Button title="Close" onPress={() =>  setIsCommentModalOpen(false)} />
              <TextInput
                placeholder="Write comment here  ..."
                value={newPostComment}
                onChangeText={setnewPostComment}
                style={styles.modalText}
                multiline
              />
              <Button title="Add Comment" onPress={() => handleAddComment(newPostComment,selectedPost.post_id)} />
          </View>
        )}
      </Modal>
      
      </View>
    </SafeAreaView>
  )
}

export default Post;