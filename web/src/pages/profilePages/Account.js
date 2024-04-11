import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../css/Account.css'
function AccountSettings() {
  return (
    <div>
      <Navbar />
      
      <div className="profileStuff">
        <Link to="/ChangeName" className="profilebutton">Change Name</Link>
        <Link to="/ChangeEmail" className="profilebutton">Change Email</Link>
        <Link to="/ChangePassword" className="profilebutton">Change Password</Link>
      </div>
    </div>
  );
}

export default AccountSettings;
