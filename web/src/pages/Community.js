import React, { useState, useTransition } from 'react';
import { useAuth } from "../lib/helper/AuthContext";
import Navbar from "../components/Navbar";
import "../css/community.css"
import filter from "../assets/images/filter icon.png"
import Line from "../assets/images/Line.png"
import Post from "../components/post"

function Community() {
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const { token } = useAuth();


  const handleAddPost = async (e) => {
    //e.preventDefault();
    if (!newPost.title) {
      alert("Title is required.");
      return;
    }
    const response = await fetch('/community/posts/create/', {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.session.access_token}`,
      },
      body: JSON.stringify({ title: newPost.title, content: newPost.content || '' }),
    }, [token]);
    if (response.ok) {
      //reload posts
      setIsModalOpen(false);
      setNewPost({ title: '', content: '' });
    } else {
      console.error('Error: failed to add new task');
    }
  };

  /* mig
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.content) {
      alert("Please add comment content.");
      return;
    }
    const response = await fetch('/community/post/', {
      body: JSON.stringify({ content:newComment.content }),
    });
  }
  */

  return (
    <div className="Community">
      <Navbar />
       
      {isModalOpen && (
        <div className='AddPostWrapper'>
          <div className="AddPostContainer">
          <button className="closeButton" onClick={() => setIsModalOpen(false)}>X</button>
           <h2>Add Post</h2>
          <form onSubmit={handleAddPost}>
            <div className="AddPostInput">
              <label>Title</label>
              <input type="text" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} required />
              <label>Content</label>
              <textarea value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} required />
            </div>
            <button className="submitButton " type="submit" >Submit</button>
            
          </form>
          </div>
        </div>
      )}





      <div className="topSection">
        <div className="titleSection">
          <h1 className="title">Community</h1>
          <img className="underline" src={Line} />
        </div>
       <button className="postButton" onClick={() => setIsModalOpen(true)}>Add post</button>
      </div>

      <div className="postsWrapper">
        <Post />
     
      </div>
    </div>
  )
}

export default Community
