import React from 'react'
import '../css/resourceMore.css';
//import {resourceList} from "../helper/resourceList" //use open and close curly braces to grab file individually from export
//import resourceItem from "../components/resource"
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
function MentalHealth() {
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
        <h3> {"<"}Exercise</h3>
        <div className="titleSection">
          <h1 className="title">Mental Health</h1>
          <img className="underline" src={Line} />
        </div>
        <h3> Diet {">"}</h3>
      </div>

      <div className="resourceWrapper">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
      </div>

    </div>
  )
}

export default MentalHealth
