import React from 'react'
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import "../css/about.css"
function About() {
  return (
    <div className="About">
      <Navbar/>
      <div className="titleSection">
          <h1 className="title">About</h1>
          <img className="underline" src={Line} />
        </div>
        <div className="aboutWrapper">
  <div className="sideWrapper">  </div>
  <div className="bodyWrapper">
    <p>Welcome to Serenity - your comprehensive companion on the journey towards holistic wellbeing. At the heart of Serenity is the belief that true wellness encompasses both physical and mental health, intertwined in a harmonious balance that fosters inner peace and resilience.</p>
    <p>Serenity is built on the foundation of compassion, innovation, and inclusivity. We understand that each individual's path to wellbeing is unique, and our mission is to empower you with the tools, resources, and support needed to navigate this journey. Our approach integrates the latest in wellness research with timeless practices, ensuring you receive guidance that is both effective and enduring.</p>
    <p>Mental health is a pivotal aspect of your overall wellbeing. Serenity provides a safe, confidential platform to connect with licensed mental health professionals. Whether you're seeking therapy, counseling, or simply someone to talk to, our experts are here to listen, guide, and uplift.</p>
    <p>You're not alone on this journey. The Serenity community forum is a vibrant space for sharing experiences, advice, and encouragement. Engage in meaningful discussions, connect with others who share your interests and challenges, and discover the power of collective support.</p>
    <p>Serenity is more than just an application; it's a movement towards a healthier, happier world. Whether you're taking the first steps towards wellness or seeking to deepen your journey, Serenity is here to light the way. With Serenity, you're not just adopting a wellness application; you're joining a community dedicated to nurturing every aspect of your wellbeing.</p>
    <p>Let Serenity be your guide to a more fulfilled, balanced life. Together, we can discover the serenity within.</p>
  </div>
</div>


    </div>
  )
}

export default About
