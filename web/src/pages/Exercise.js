import React from 'react'
import '../css/resourceMore.css';
//import {resourceList} from "../helper/resourceList" //use open and close curly braces to grab file individually from export
//import resourceItem from "../components/resource"
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import { useState, useEffect } from 'react';
import axios from 'axios';
import nhsLogo from "../assets/images/nhs_attribution.png";

function Exercise() {

  const [benefitsData, setbenefitsData] = useState(null);
  const [sittingData, setsittingData] = useState(null);
  const [guidelinesData, setguidelinesData] = useState(null);

  const fetchData = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers });
    // Ensure there is a response and it has the expected structure
    if (response.data && response.data.mainEntityOfPage) {
      return response.data;
    } else {
      // Handle the unexpected structure or missing data gracefully
      console.warn('Unexpected response structure', response);
      return { mainEntityOfPage: [] }; // Provide a default structure
    }
  } catch (error) {
    console.error('There was an error fetching data', error);
    return { mainEntityOfPage: [] }; // Provide a default structure in case of error
  }
};

function getContent(contents) {
  // Use optional chaining and provide a default empty array to map over
  const listItems = (contents || []).map((content, index) => {
    // Your existing logic, perhaps with added null checks
    if (!content.hasPart || !Array.isArray(content.hasPart) || content.hasPart.length === 0) {
      console.error('Invalid content structure', content);
      return null; // Return null for React to ignore
    }
    return <div key = {index} dangerouslySetInnerHTML={{__html: content.hasPart[0].text}} />
  });
  return listItems;
}


  useEffect(() => {
    // Call fetch for the first type of content
    fetchData('https://api.nhs.uk/live-well/exercise/exercise-health-benefits/', {
      'subscription-key': 'af78f07dd16b47319525bc4c719bb9b2',
      'Content-Type': 'application/json'
    }).then(data => {
      console.log('Diet Data:', data);
      setbenefitsData(data);
    });

    // Call fetch for another type of content
    fetchData('https://api.nhs.uk/live-well/exercise/why-sitting-too-much-is-bad-for-us/', {
      'subscription-key': 'af78f07dd16b47319525bc4c719bb9b2',
      'Content-Type': 'application/json'
    }).then(data => {
      console.log('Another Data:', data);
      setsittingData(data);
    });

    // Call fetch for another type of content
    fetchData('https://api.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/', {
      'subscription-key': 'af78f07dd16b47319525bc4c719bb9b2',
      'Content-Type': 'application/json'
    }).then(data => {
      console.log('Another Data:', data);
      setguidelinesData(data);

    });
    


  }, []); // Runs once on component mount

  if (!sittingData || !benefitsData || !guidelinesData) return <div className='loader'></div>;

    const benefitsContent = getContent(benefitsData.mainEntityOfPage)
    const sittingContent = getContent(sittingData.mainEntityOfPage)
    const guidelinesContent = getContent(guidelinesData.mainEntityOfPage)

  return (
    <div className="Holder">
          {/*Going to make the holder section a component, so doesnt refresh to new page when u use the h3 links to cycle inbetween..
          <div className="menuList">
            {resourceList.map((resourceItem, key) => {
           return <resourceItem key={key} titleCenter={resourceItem.titleCenter} leftScroll={resourceItem.leftScroll} rightScroll={resourceItem.rightScroll} infomation={resourceItem.infomation}/>
        })}
      </div>*/}
      <Navbar />
      <div className="topSection">
        <h3> {"<"}<a href="diet">Diet</a></h3>
        <div className="titleSection">
          <h1 className="title">Exercise</h1>
          <img className="underline" src={Line} />
        </div>
        <h3><a href="mentalhealth">Mental Health </a>{">"}</h3>
      </div>

      <div className="resourceWrapper">
        <h1>{benefitsData.name}</h1>
        <ul>{benefitsContent}</ul>
        <h1>{sittingData.name}</h1>
        <ul>{sittingContent}</ul>
        <h1>{guidelinesData.name}</h1>
        <ul>{guidelinesContent}</ul>
        <div className="logo-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href='https://www.nhs.uk/'><img src={nhsLogo} alt="NHS Logo" className="nhs" style={{ maxWidth: '200px' }} /></a>
        </div>
      </div>

    </div>
  )
}

export default Exercise
