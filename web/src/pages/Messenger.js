import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/helper/AuthContext';
import { Link } from 'react-router-dom';

function Messenger() {
  const { token } = useAuth();
  const [chats, setChats] = useState([]);

  
  useEffect(() => {
    const fetchChats = async () => {
      if (!token || !token.session.access_token) {
        console.error('Token not available');
        return;
      }
      const response = await fetch('/chat/getChats/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.session.access_token}`,  
        },
      });
      const data = await response.json();
      if (data && data.chats) {
        setChats(data.chats);
      } else {
        // Handle any errors or empty responses
        console.error('Failed to fetch chats or no chats available');
      }
    };

    fetchChats();
  }, [token]);

  return (
    <div>
      <h1>Chats with Mental Health Professionals</h1>
      <div>
        {chats.map((chat, index) => (
          <div key={index} className='chat-container'>
            <p>Chat with: {chat.mhp_id}</p>
            <p>Chat ID: {chat.chat_id}</p>
            <p>Created At: {chat.created_at}</p>
            {/* You can add more details or interaction options like opening the chat */}
          </div>
        ))}
      </div>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}

export default Messenger;
