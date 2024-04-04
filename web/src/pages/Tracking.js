import React from 'react'
import '../css/Tracking.css'
import Navbar from "../components/Navbar";

import exercise from "../assets/images/exercise pad.png";
import diet from "../assets/images/diet pad.png";
import mh from "../assets/images/mh pad.png";
import{ Link } from "react-router-dom"
import Line from "../assets/images/Line.png"

function Tracking() {
  return (
  <div className="Tracking">
    <Navbar />

    <h1 className="title">Tracking</h1>
    <img className="underline" src={Line} />
    <div id="container">
      <div id="left">Track Diet</div>
      <div id="right">Track Exercise</div>
      <div id="center">Custom Goal</div>
    </div>
  </div>
)
}



export default Tracking
