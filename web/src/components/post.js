import React, { useState, useEffect, useCallback } from "react";
import "../css/post.css";
import { useAuth } from '../lib/helper/AuthContext';

function Post() {
  const [postList, setPosts] = useState([]);
  const { token } = useAuth();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // For modal visibility
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // For modal visibility
  const [selectedPost, setSelectedPost] = useState(null); // For storing the selected post
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({content: '' });


  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('/community/postList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.session.access_token}`, 
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
  }, [token]);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);



  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
    fetchComments(post.post_id);
  };
  




  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`/community/commentList/${postId}/`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  const handleAddComment  = async (e,postId) => {
    e.preventDefault();
  
      const response = await fetch(`/community/comment/create/${postId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.session.access_token}`,
        },
        body: JSON.stringify({ 
          postId: selectedPost.post_id,
          PostContent: newComment.content || '', 
        }),
      });
      if (response.ok) {
        // Refresh comments after successful addition
        setNewComment({ content: '' });
        setIsCommentModalOpen(false)
        fetchComments(postId)
       
      } else {
        console.error('Failed to add comment');
      }
  };

  return (
    <div className="postss">
      {postList.slice().reverse().map((post, index) => (
        <div key={index} className='PostHolder'  onClick={() => handlePostClick(post)}>
          <div className="Postinfo">
            <h3 className="PostTitle">{post.post_title}</h3>
            <div className="infoContent"><p>{post.post_content}</p></div>
          </div>
          <h3 className="Name">Posted by - {post.poster_name}</h3>
  
          <h4 className="PostDate">{post.posted_at}</h4>
        </div>
      ))}
      {isPostModalOpen && selectedPost && (
        <div className='PostDisplay'>
          <button className="closeButton" onClick={() => setIsPostModalOpen(false)}>X</button>
            <div className='PostHolder'>
              <div className="Postinfo">
                <h3 className="PostTitle">{selectedPost.post_title}</h3>
                <div className="infoContent"><p>{selectedPost.post_content}</p></div>
              </div>
            <h3 className="Name">Posted By -{selectedPost.poster_name}</h3>
  
            <h4 className="PostDate">{selectedPost.posted_at}</h4>
          </div>
          <div className="CommentSection">
          {comments.map((comment, index) => (
          <div key={index} className="CommentHolder">
            <div className="commentInfo">            
              <p key={index}>commented at : {new Date(comment.commented_at).toLocaleString()}</p>
              <p className="commentdisplaytitle"key={index}> By {comment.user_id}</p>
            </div>
              

              <p key={index}>{comment.PostContent}</p>
              
              <hr></hr>
        </div>
      ))}
      </div>

          
          <button className="AddCommentButton "onClick={() => setIsCommentModalOpen(true)} >Add Comment</button>
        </div>
      )}

    {isCommentModalOpen && selectedPost && (
          <div className="addCommmentWrapper">
            <div className='AddPostWrapper'>
              <div className="AddPostContainer">
              <button className="closeButton" onClick={() => setIsCommentModalOpen(false)}>X</button>
              <h2>Add Comment</h2>
              <form>
             
                  <label>Comment</label>
                  <textarea value={newComment.content} onChange={(e) => setNewComment({ ...newComment, content: e.target.value })} required />
       
                  <button className="submitButton" type="submit" onClick={(e) => handleAddComment(e, selectedPost.post_id)}>Submit</button>
                
              </form>
              </div>
            </div>
          </div>
          )}
    </div>
  )
}

export default Post;