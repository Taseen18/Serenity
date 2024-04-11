import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/helper/AuthContext";
import "../../../css/Account.css";
import Navbar from "../../../components/Navbar";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [nonce, setNonce] = useState("");
  const [formError, setFormError] = useState(null);

  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    console.log(data);

    if (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="changeProfileSettings">
      <Navbar />
      <h1>Update Password</h1>
      <div className="profileUpdater">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="newPassword"
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="text"
            id="nonce"
            value={nonce}
            placeholder="Confirmation Code (optional)"
            onChange={(e) => setNonce(e.target.value)}
          />
          <button className="profileSubmitButton" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
