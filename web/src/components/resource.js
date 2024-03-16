import React from 'react'

function resourceItem(titleCenter,leftScroll,rightScroll, infomation) {
  return (
    <div className="resourceHolder">
      <div style={{}}></div>
      <h1> {titleCenter}</h1>
      <h3>{leftScroll}</h3>
      <h3>{rightScroll}</h3>
      <p>{infomation}</p>
    </div>
  )
}

export default resourceItem
