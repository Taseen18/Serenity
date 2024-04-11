import React, { useState } from "react";
import { supabase } from "../../../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/helper/AuthContext";
import '../../../css/Account.css'
import Navbar from "../../../components/Navbar";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [nonce, setNonce] = useState("");
  const [formError, setFormError] = useState(null);

  const { token } = useAuth();
  const user_id = token.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    console.log(user_id);

    const { data, error } = await supabase
      .from("auth_user")
      .update({ password: newPassword })
      .eq("username", user_id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    navigate(-1);
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
        <button className="profileSubmitButton" type="submit">Save</button>
      </form>
      </div>
    </div>
  );
};

export default ChangePassword;
