import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import UserIcon from "../assets/images/UserIcon.png";

//import Navbar from "./components/Navbar";
//import Home from './pages/Homepage';

//import Community from './pages/Community'
//import Chat from './pages/Chat'
//import Tracking from './pages/Tracking'
//import About from './pages/About'

//if openlinks open to true, make id = "open",  if not(:) = "close"
function Navbar() {
  const name = sessionStorage.getItem("firstName");
  function handleLogout() {
    sessionStorage.removeItem("token");
  }
  return (
    <div className="navbar">
      <div className="leftSide">
        <Link to="/homepage" className="navTitle">
          <h1 className="navTitle">Serenity</h1>{" "}
        </Link>
      </div>
      <div className="middle">
        <Link to="/Exercise" className="linker">
          {" "}
          Resources{" "}
        </Link>
        <Link to="/Tracking" className="linker">
          {" "}
          Tracking{" "}
        </Link>
        <Link to="/Community" className="linker">
          {" "}
          Community{" "}
        </Link>
        <Link to="/Journal" className="linker">
          {" "}
          Journal{" "}
        </Link>
        <Link to="/Messenger" className="linker">
          {" "}
          Chat{" "}
        </Link>
        <Link to="/About" className="linker">
          {" "}
          About{" "}
        </Link>
        <Link to="/Account" className="navbar-button">
          {" "}
          Account
        </Link>
        {/*}  <button className="navbar-button" >Fetch Tasks</button> */}
      </div>
      <div className="rightSide">
        <img src={UserIcon} />
        <div className="UserInfo">
          <h2>FDM employee</h2>
          <div className="lower_section">
            <p> {name}</p>
            <Link to="/" onClick={handleLogout} className="navbar-button">
              Log out
            </Link>
          </div>
        </div>
        <div className="buttons"></div>
      </div>
    </div>
  );
}

export default Navbar;
