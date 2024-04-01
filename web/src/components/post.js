import React, {useState, useEffect, useCallback} from "react";
import "../css/post.css"
import UserIcon from "../assets/images/UserIcon.png"
function Post() {
  const [postList, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    const response = await fetch('/community/postList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token.session.access_token}`, 
      },
    });
    const data = await response.json();
    if (data && data.postList) {
      setPosts(data.postList);  
    } else {
      // Handle any errors or empty responses
      console.error('Failed to fetch tasks or no tasks available');
    }
  }, );
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
      <button className="navbar-button" onClick={fetchPosts}>Fetch posts</button>

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
