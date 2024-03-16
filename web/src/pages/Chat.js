import React from 'react'
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import "../css/chat.css"
import dmLeft from "../assets/images/dmLeft.png"
import dmRight from "../assets/images/dmRight.png"
function Chat() {
  return (
    <div className="Chat">
      <Navbar />
        <div className="titleSection">
          <h1 className="title">Connect</h1>
          <img className="underline" src={Line} />
        </div>

      <div className="main">
        <div className="postsWrapper">
          <div className="topWrapper"> </div>
          <div className="bodyWrapper">
             {/* These are just plaeholders for now. Could make as components if want functionality here>*/}
            <img className="dm" src={dmLeft} />
            <img className="dmRight" src={dmRight}/>
            <img className="dm" src={dmLeft} />

            <div className="typingSection"> 
              <input type="text" className="type" placeholder="Type here..." />
              <button className="send">Send</button>
            </div>
          </div>
        </div>
        <div className="sideBar">
          <button className="option"> Make appointment</button>
          <button className="option"> Calendar</button>
          <button className="option"> Therapist setting</button>
        </div>
        
      </div>
    </div>
  )
}

export default Chat
