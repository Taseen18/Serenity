import React, {useState, useEffect, useCallback} from "react";
import "../css/post.css"
import UserIcon from "../assets/images/UserIcon.png"
import { useAuth } from '../lib/helper/AuthContext';

function Post() {
  const [postList, setPosts] = useState([]);
  const { token } = useAuth();

  const fetchPosts = useCallback(async () => {
    const response = await fetch('/community/postList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.session.access_token}`, 
      },
    });
    const data = await response.json();
    console.log(data)
    if (data && data.posts) {
      setPosts(data.posts);  
    } else {
      // Handle any errors or empty responses
      console.error('Failed to fetch posts or no posts available');
    }
  }, [token]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  

  const [liked, setLike] = useState(false);

  const handleLike = () => {
    setLike(!liked);
  };

  const [flagged, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flagged);
  };
  return (
    <div className="postss">
      {postList.map((postList, index) => (
                        <div key={index} className='PostHolder'>
                          {/*Insert users profile picture here */}<div className="imgHolder"><img src={UserIcon} /></div>
                          <div className="Postinfo">
                            {/*Insert post title here */} <h3 className="PostTitle">{postList.post_title}</h3>
                            <div className="infoContent"><p>{postList.post_content}</p></div>
                          </div>
                          {/*Insert users Name here */} <h3 className="Name">{postList.user}</h3>
                          <button className={`likeButton ${liked ? 'clicked' : ''}`} onClick={handleLike}>
                          </button>
                          <button className={`flag ${flagged ? 'clicked' : ''}`} onClick={handleFlag}>
                          </button>       
                          {/*Insert date posted here */} <h4 className="PostDate">{postList.posted_at}</h4>
                        </div>
                    ))}
   {/*<div className = "PostHolder">  </div> */} 
      


   
    </div>
  )
}

export default Post
