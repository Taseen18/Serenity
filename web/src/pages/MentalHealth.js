import React from 'react'
import '../css/resourceMore.css';
//import {resourceList} from "../helper/resourceList" //use open and close curly braces to grab file individually from export
//import resourceItem from "../components/resource"
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import { useState, useEffect } from 'react';
import axios from 'axios';
import nhsLogo from "../assets/images/nhs_attribution.png";
function MentalHealth() {


  const [stressData, setstressData] = useState(null);
  const [axietyData, setaxietyData] = useState(null);
  const [sadnessData, setsadnessData] = useState(null);

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
    fetchData('https://api.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/', {
      'subscription-key': 'af78f07dd16b47319525bc4c719bb9b2',
      'Content-Type': 'application/json'
    }).then(data => {
      console.log('Diet Data:', data);
      setstressData(data);
    });

    // Call fetch for another type of content
    fetchData('https://api.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-disorder-signs/', {
      'subscription-key': 'af78f07dd16b47319525bc4c719bb9b2',
      'Content-Type': 'application/json'
    }).then(data => {
      console.log('Another Data:', data);
      setaxietyData(data);
    });

    // Call fetch for another type of content
    fetchData('https://api.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/low-mood-sadness-depression/', {
      'subscription-key': 'af78f07dd16b47319525bc4c719bb9b2',
      'Content-Type': 'application/json'
    }).then(data => {
      console.log('Another Data:', data);
      setsadnessData(data);

    });
    


  }, []); // Runs once on component mount

  if (!axietyData || !stressData || !sadnessData) return <div className='loader'></div>;

    const stressContent = getContent(stressData.mainEntityOfPage)
    const anxietyContent = getContent(axietyData.mainEntityOfPage)
    const sadnessContent = getContent(sadnessData.mainEntityOfPage)


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
        <h3><a href="exercise">Exercise</a> {"<"}</h3>
        <div className="titleSection">
          <h1 className="title"><a href="mentalhealth">Mental Health</a></h1>
          <img className="underline" src={Line} />
        </div>
        <h3><a href="diet">Diet</a>{">"}</h3>
      </div>

      <div className="resourceWrapper">
        <h1>{stressData.name}</h1>
        <ul>{stressContent}</ul>
        <h1>{axietyData.name}</h1>
        <ul>{anxietyContent}</ul>
        <h1>{sadnessData.name}</h1>
        <ul>{sadnessContent}</ul>
        <div className="logo-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href='https://www.nhs.uk/'><img src={nhsLogo} alt="NHS Logo" className="nhs" style={{ maxWidth: '200px' }} /></a>
        </div>
      </div>

    </div>
  )
}

export default MentalHealth
