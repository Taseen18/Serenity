import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/helper/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Messenger.css';

function Messenger() {
  const { token } = useAuth();
  const user_id = token.user.id;
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

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
        console.error('Failed to fetch chats or no chats available');
      }
    };

    fetchChats();
  }, [token]);

  const fetchMessages = async (chatId) => {
    if (!token || !token.session.access_token) {
      console.error('Token not available');
      return;
    }
    // Assuming your server expects the chat_id as a query parameter
    const response = await fetch(`/chat/getMessages/?chat_id=${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.session.access_token}`,
      },
    });
    const data = await response.json();
    if (data && data.messages) {
      setMessages(data.messages);
    } else {
      console.error('Failed to fetch messages or no messages available');
    }
  };
  

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
    fetchMessages(chatId);
  };

  return (
    <div className='chats-page'>
      <h1>Your Chats</h1>
      <button onClick={() => navigate('/homepage')}>Back to homepage</button>
      <div className='chats-container'>
        <div className='chats-box'>
          {chats.map((chat, index) => (
            <div key={index} className='chat-container' onClick={() => handleChatClick(chat.chat_id)}>
              <p>Chat with: {chat.user_id}</p>
              <p>Chat ID: {chat.chat_id}</p>
              <p>Created At: {chat.created_at}</p>
            </div>
          ))}
        </div>
        {selectedChatId && (
          <div className='messages-box'>
          {messages.map((message, index) => (
            <div key={index} className={`message-container ${message.sender_id === user_id ? 'sent' : 'received'}`}>
              <p>{message.content}</p>
              <span className="timestamp">{new Date(message.sent_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}

export default Messenger;
