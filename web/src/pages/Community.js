import React from 'react'
import Navbar from "../components/Navbar";
import "../css/community.css"
import filter from "../assets/images/filter icon.png"
import Line from "../assets/images/Line.png"
import post from "../assets/images/post.png"
function Community() {
  return (
    <div className="Community">
      <Navbar />

      <div className="topSection">
        <img className="filter" src={filter} />
        <div className="titleSection">
          <h1 className="title">Community</h1>
          <img className="underline" src={Line} />
        </div>
        <button className="postButton" >Add Post</button>
      </div>

      <div className="postsWrapper">
        {/* Make into components instead of img maybe or cld be like this as just prototype */}
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
        <img className="post"src={post} />
      </div>
    </div>
  )
}

export default Community
