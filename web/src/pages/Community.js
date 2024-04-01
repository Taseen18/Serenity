import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import "../css/community.css"
import filter from "../assets/images/filter icon.png"
import Line from "../assets/images/Line.png"
import Post from "../components/post"

function Community() {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleOverlayClick = () => {
        closeModal();
    };



  return (
    <div className="Community">
      <Navbar />
      <button className="button" onClick={openModal}>add post</button>
            {showModal && (
                <div className="modal">
                    <h2>add post</h2>
                    {/* Insert add post POST form here*/}
                </div>
            )}
            {showModal && <div id="overlay" className="overlay" onClick={handleOverlayClick}></div>}

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
        <Post />
        <Post />
     
      </div>
    </div>
  )
}

export default Community
