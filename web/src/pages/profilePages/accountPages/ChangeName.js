import React, { useState } from "react";
import { supabase } from "../../../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/helper/AuthContext";
import "../../../css/Account.css";
import Navbar from "../../../components/Navbar";
const ChangeName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { token } = useAuth();
  const user_id = token.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "/auth_users",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
      },
      [token]
    );
    if (response.ok) {
      alert("yipeeee");
    } else {
      console.error("Error: failed to add new task");
    }
  };

  return (
    <div className="changeProfileSettings">
      <Navbar />
      <h1>Update Name</h1>
      <div className="profileUpdater">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="firstName"
            value={firstName}
            placeholder="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="LastName"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button
            className="profileSubmitButton"
            type="submit"
            onPress={() => navigate("/Homepage")}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeName;
