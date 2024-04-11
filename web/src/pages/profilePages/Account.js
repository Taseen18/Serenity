import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AccountSettings() {
  return (
    <div>
      <Navbar />
      <div>
        <Link to="/ChangeName">Change Name</Link>
        <Link to="/ChangeEmail">Change Email</Link>
        <Link to="/ChangePassword">Change Password</Link>
      </div>
    </div>
  );
}

export default AccountSettings;
