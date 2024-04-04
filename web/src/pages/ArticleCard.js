import React from 'react';
import '../css/articleCard.css';
import stressImg from "../assets/images/stress.jpeg";

function ArticleCard({ article, onArticleSelect }) {
  return (
    <div className="card" onClick={() => onArticleSelect(article.id)}>
      {article.title}
      <br></br>
      <div className='card-description'>
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default ArticleCard;