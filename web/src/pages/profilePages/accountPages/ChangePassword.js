import React, { useState } from "react";
import { supabase } from "../../../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate;
  const [newPassword, setNewPassword] = useState("");
  const [nonce, setNonce] = useState("");
  const updatePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
      nonce: nonce,
    });

    if (error) {
      alert("Error", error.message);
      console.error("Error changing password", error);
    } else {
      alert("Success", "Password changed successfully");
      console.log("Password changed successfully");
      navigate("Account");
    }
  };

  return (
    <div>
      <form onSubmit={updatePassword}>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangePassword;
