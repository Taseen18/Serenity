import React, { useState } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import { useAuth } from "../../lib/helper/AuthContext";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/journal.css";

function EditJournalEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const [entry, setEntry] = useState(
    location.state.entry ? location.state.entry : false
  );
  const [title, setTitle] = useState(
    location.state.title ? location.state.title : false
  );
  const [formError, setFormError] = useState(null);

  const { token } = useAuth();
  const user_id = token.user.id;

  const handleClick = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("journal")
      .delete()
      .eq("entry_id", location.state.entry_id);

    if (error) {
      console.log(error);
    }

    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entry || !title) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    console.log(user_id);

    const { data, error } = await supabase
      .from("journal")
      .update({ title: title, entry: entry })
      .eq("entry_id", location.state.entry_id);

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="journal-textarea"
            id="entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button type="submit">Save Entry</button>
          <button onClick={handleClick}>Delete Entry</button>
        </form>
      </div>
    </div>
  );
}

export default EditJournalEntry;
