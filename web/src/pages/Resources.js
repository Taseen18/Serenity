import React from "react";
import exercise from "../assets/images/exercise pad.png";
import diet from "../assets/images/diet pad.png";
import mh from "../assets/images/mh pad.png";
import{ Link } from "react-router-dom"
//import { supabase } from '../lib/helper/supabaseClient';
import '../css/Resources.css';
import Line from "../assets/images/Line.png"

import Navbar from "../components/Navbar";
function Resources() {
  return (
    <div className="Resources">
      <Navbar />

      <h1 className="title">Resources</h1>
      <img className="underline" src={Line} />
      <div className="info">Click on a lilypad</div>
      <div className="selection">
          
        
        <Link to="/exercise" className="linker"> <img className="pad" src={diet} /> </Link>
        <Link to="/exercise" className="linker"> <img id="middlepad"className="pad"src={exercise} /> </Link>
        <Link to="/exercise" className="linker">  <img className="pad"src={mh} /> </Link>
        
       
      </div>
    </div>
  )
}

export default Resources
