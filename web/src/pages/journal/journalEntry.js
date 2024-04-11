import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/helper/supabaseClient";
import { Link } from "react-router-dom";

function JournalEntry() {
  const [fecthError, setFetchError] = useState(null);
  const [entries, setEntries] = useState(null);
  const [orderBy, setOrderBy] = useState("entry_id");

  useEffect(() => {
    getEntries();
  }, []);

  async function getEntries() {
    const { data, error } = await supabase
      .from("journal")
      .select()
      .order(orderBy);

    if (error) {
      setFetchError("Could not fetch entries");
      setEntries(null);
      console.log(error);
    }
    if (data) {
      setEntries(data);
      setFetchError(null);
    }
  }

  return (
    <ul>
      {fecthError && <li>{fecthError}</li>}
      {entries &&
        entries.map((entry) => (
          <div className="IndividualEntry">
            <div className="entryBackground">
              <li className="entryTitle">{entry.title}</li>
              <Link
                className="editEntryButton"
                to="/EditJournalEntry"
                state={{
                  title: entry.title,
                  entry: entry.entry,
                  entry_id: entry.entry_id,
                }}
              >
                Edit Entry
              </Link>
              <li className="entry">{entry.entry}</li>
            </div>
          </div>
        ))}
    </ul>
  );
}

export default JournalEntry;
