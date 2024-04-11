import React, { useState } from "react";
import { supabase } from "../../../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/helper/AuthContext";
import "../../../css/Account.css";
import Navbar from "../../../components/Navbar";

const ChangeName = () => {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.updateUser({
      email: email,
    });

    if (error) {
      alert(error);
      console.log(error);
      return;
    }

    navigate(-1);
  };

  return (
    <div className="changeProfileSettings">
      <Navbar />
      <h1>Update Email</h1>
      <div className="profileUpdater">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="New Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="profileSubmitButton" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeName;
