import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/helper/AuthContext";
import { SignUp, Login, Homepage } from "./pages";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Chat from "./pages/Chat";
import Tracking from "./pages/Tracking";
import About from "./pages/About";
import Exercise from "./pages/Exercise";
import Diet from "./pages/Diet";
import MentalHealth from "./pages/MentalHealth";
import Messenger from "./pages/Messenger";
import Post from "./components/post";
import Journal from "./pages/journal/Journal";
import CreateJournalEntry from "./pages/journal/CreateJournalEntry";
import EditJournalEntry from "./pages/journal/EditJournalEntry";
import Account from "./pages/profilePages/Account";
import ChangePassword from "./pages/profilePages/accountPages/ChangePassword";
import ChangeName from "./pages/profilePages/accountPages/ChangeName";
import ChangeEmail from "./pages/profilePages/accountPages/ChangeEmail";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      console.log("token found");
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
      console.log("token set");
    }
  }, [token]);

  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/Tracking" element={<Tracking />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/About" element={<About />} />
          <Route path="/Exercise" element={<Exercise />} />
          <Route path="/Diet" element={<Diet />} />
          <Route path="/MentalHealth" element={<MentalHealth />} />
          <Route path="/Messenger" element={<Messenger />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Journal" element={<Journal />} />
          <Route path="/CreateJournalEntry" element={<CreateJournalEntry />} />
          <Route path="/EditJournalEntry" element={<EditJournalEntry />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/ChangeName" element={<ChangeName />} />
          <Route path="/ChangeEmail" element={<ChangeEmail />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
