import React, { useState } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import { useAuth } from "../../lib/helper/AuthContext";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../css/journal.css";

function CreateJournalEntry() {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { token } = useAuth();
  const user_id = token.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entry || !title) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const Today = new Date();

    console.log(user_id);

    const { data, error } = await supabase
      .from("journal")
      .insert([
        { user_id: user_id, title: title, entry: entry, date_added: Today },
      ]);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    navigate(-1);
  };
  return (
    <div className="Journal">
      <Navbar />

      <div className="createJournalEntry">
        <h2 className="title">Create an entry</h2>

        <form className="journal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="journal-textarea"
            id="entry"
            value={entry}
            placeholder="New Entry"
            onChange={(e) => setEntry(e.target.value)}
          />
          <button type="submit">Save Entry</button>
        </form>
      </div>
    </div>
  );
}

export default CreateJournalEntry;
