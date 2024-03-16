import React from 'react'
import Navbar from "../components/Navbar";
import "../css/community.css"
import filter from "../assets/images/filter icon.png"
import Line from "../assets/images/Line.png"
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
        
      </div>
    </div>
  )
}

export default Community
