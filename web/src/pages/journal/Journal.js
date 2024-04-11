import React from "react";
import Navbar from "../../components/Navbar";
import JournalEntry from "./journalEntry";
import Line from "../../assets/images/Line.png";
import { Link } from "react-router-dom";
import "../../css/journal.css";

function JournalPage() {
  return (
    <div className="Journal">
      <Navbar />
      <div className="titleSection">
        <h1 className="title">Journal</h1>
        <img className="underline" src={Line} />
      </div>
      <div className="JournalSection">
        <div class="createEntrySection">
          <div class="noPadding">
            <Link className="createEntryButton" to="/CreateJournalEntry">
              Create Entry
            </Link>
          </div>
        </div>

        <div className="EntrySection">
          <JournalEntry />
        </div>
      </div>
    </div>
  );
}

export default JournalPage;
