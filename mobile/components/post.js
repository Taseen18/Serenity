import React, {useState, useEffect, useCallback} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput, 
  Button, TouchableOpacity, ScrollView, Platform, ImageBackground, Modal } from 'react-native';
import styles from "../styles/communityAndPostStyles"
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Post = ({ navigation }) => {
  const [postList, setPosts] = useState([]);
 
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // For modal visibility
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // For modal visibility
  const [selectedPost, setSelectedPost] = useState(null); // For storing the selected post
  const [comments, setComments] = useState([]);
  const [newPostComment, setnewPostComment] = useState({content: '' });

  const postsUrl = Platform.select({
    ios: 'http://localhost:8000/postList/',
    android: 'http://10.0.2.2:8000/postList/',
  });

  const fetchPosts = useCallback(async () => {
    try {
        const response = await fetch(postsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token.session.access_token}`, 
        },
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
  }, [fetchPosts]);

  const [liked, setLike] = useState(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
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

  useEffect(() => {
    // Fetch comments when component mounts
    fetchComments(); // Provide postId if applicable
  }, []);

  const handleAddComment = async (newPostComment) => {
    newPostComment.preventDefault(selectedPost);
    const commenturl = Platform.select({
        ios: `http://localhost:8000/community/comment/create`,
        android: `http://10.0.2.2:8000/community/comment/create/`,
    });
      const response = await fetch( commenturl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //  'Authorization': `Bearer ${token.session.access_token}`,
        },
        body: JSON.stringify({ 
          postId: selectedPost.post_id,
          PostContent: newPostComment || '', 
        }),
      });
      if (response.ok) {
        // Refresh comments after successful addition
        setNewComment('');
      } else {
        console.error('Failed to add comment');
      }
  };

  return (
    <View style={styles.post}>
    {postList.map((post, index) => (
        <View key={index} style={styles.PostHolder}  onPress={() => handlePostClick(post)}>
            <Text style={styles.postTitle}>{post.post_title}</Text>
            <Text style={styles.postContent}>{post.post_content}</Text>
            <Text style={styles.postedBy}>Posted by - {post.poster_name}</Text>
            {/* <button className={`likeButton ${liked ? 'clicked' : ''}`} onClick={handleLike}></button> */}   
          <Text style={styles.PostDate}>Posted by - {post.posted_at}</Text>
        </View>
      ))}
    
      
    <Modal
    animationType="slide"
    transparent={true}
    visible={isPostModalOpen}
    onRequestClose={() => {
        setIsPostModalOpen(false);
    }}
>
    <Button title="Close" onPress={() => setIsPostModalOpen(false)} />
    {selectedPost && (
        <View style={styles.PostHolder} key={selectedPost.post_id}>
            <Text style={styles.postTitle}>{selectedPost.post_title}</Text>
            <Text style={styles.postContent}>{selectedPost.post_content}</Text>
            <Text style={styles.postedBy}>Posted by - {selectedPost.poster_name}</Text>
            <Text style={styles.PostDate}>Posted by - {selectedPost.posted_at}</Text>
        </View>
    )}
    <View style={styles.CommentSection} key={comments.comment_id}>
        <Text>{comments.content}</Text>
    </View>
    <Button title="Add comment" style={styles.AddCommentButton} onPress={() => setIsCommentModalOpen(true)} />
</Modal>


    <Modal
        animationType="slide"
        transparent={true}
        visible={isCommentModalOpen }
        onRequestClose={() => {
            setIsCommentModalOpen(false);
        }}
        >
        
        <View style={styles.addCommmentWrapper}>
            <Button title="Close" onPress={() =>  setIsCommentModalOpen(false)} />
            <TextInput
              placeholder="..."
              value={newPostComment}
              onChangeText={setnewPostComment}
              style={styles.modalText}
              multiline
            />
            <Button title="Add Comment" onPress={() => handleAddComment(newPostComment)} />
        </View>
    </Modal>
    
    </View>
  )
}

export default Post;