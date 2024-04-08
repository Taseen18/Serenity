import React, { useState, useEffect } from 'react';
import '../css/resourceMore.css';
//import {resourceList} from "../helper/resourceList" //use open and close curly braces to grab file individually from export
//import resourceItem from "../components/resource"
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import nhsLogo from "../assets/images/nhs_attribution.png";
import CaloriesArticle from './articles/CaloriesArticle';
import BalancedDietArticle from './articles/BalancedDietArticle';
import TipsArticle from './articles/TipsArticle';
import ArticleCard from './ArticleCard';



function Diet() {

  const articles = [
    {
      id: 'calories',
      title: 'Understanding Calories',
      Component: CaloriesArticle,
      description: 'Explore the science of calories and their impact on weight management to help you make informed dietary choices',
    },
    {
      id: 'diet',
      title: 'Eating a balanced diet',
      Component: BalancedDietArticle,
      description:'Discover the key components of a balanced diet and how it can significantly improve your overall health',
    },
    {
      id: 'tips',
      title: '8 tips for healthy eating',
      Component: TipsArticle,
      description:'Learn eight practical tips that can guide you towards healthier eating habits and better nutrition.',
    },
  ];

  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id);
  };
  
  const SelectedArticleComponent = articles.find(article => article.id === selectedArticleId)?.Component;


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
      <h3> {"<"}<a href="/mentalhealth">Mental Health</a></h3>
        <div className="titleSection">
          <h1 className="title">Diet</h1>
          <img className="underline" src={Line} />
        </div>
        <h3><a href="/exercise">Exercise</a>{">"}</h3>
      </div>

      <div className='container'>
        {articles.map((article) => (
            <a href="#content"><ArticleCard className='card' key={article.id} article={article} onArticleSelect={handleArticleSelect} /></a>
        ))}
      </div>
      <div id= "content" className='resourceWrapper'>
        {SelectedArticleComponent && <div style={{ marginTop: '20px' }}><SelectedArticleComponent /></div>}
        <div className="logo-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href='https://www.nhs.uk/'><img src={nhsLogo} alt="NHS Logo" className="nhs" style={{ maxWidth: '200px' }} /></a>
        </div>
      </div>
    </div>
  )
}

export default Diet;
