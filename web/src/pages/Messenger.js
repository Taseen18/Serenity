import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/helper/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Messenger.css';
import Navbar from '../components/Navbar';

function Messenger() {
  const { token } = useAuth();
  const user_id = token.user.id;
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const webSocket = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {

    if (!token || !token.session || !token.session.access_token) {
      console.error('Token not available for WebSocket connection');
      return;
    }

    const chatsWsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    const chatsWsUrl = `${chatsWsScheme}://localhost:8000/ws/chat/?token=${token.session.access_token}`;

    const chatsWebSocket = new WebSocket(chatsWsUrl);

    chatsWebSocket.onopen = (event) => {
      console.log('Chats WebSocket opened');
    };

    chatsWebSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Chat update received:", data);
      setChats(data.chats);
    };

    chatsWebSocket.onclose = (event) => {
      console.log('Chats WebSocket closed');
    };

    chatsWebSocket.onerror = (event) => {
      console.log('Chats WebSocket error', event);
    };

    return () => {
      if (chatsWebSocket.readyState === WebSocket.OPEN) {
        chatsWebSocket.close();
      }
    };
  }, [token]);

  useEffect(() => {
    if (selectedChatId) {
      if (webSocket.current && webSocket.current.readyState !== webSocket.CLOSED) {
        webSocket.current.close()
      }
      setMessages([]);
      const wsScheme = window.location.protocol === "https:" ? "wss" : "ws";
      const chatRoomUrl = `${wsScheme}://localhost:8000/ws/chat/${selectedChatId}/?token=${token.session.access_token}`;

      webSocket.current = new WebSocket(chatRoomUrl);

      webSocket.current.onopen =  (event) => {
        console.log('WebSocket opened for chat', selectedChatId);
      }; 

      webSocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);
        if (Array.isArray(data)) {
          setMessages(data);
        } else if (data.message) {
          setMessages(prevMessages => [...prevMessages, data.message]);
        }
      };

      webSocket.current.onclose = (event) => {
        console.log('WebSocket closed for chat', selectedChatId);
      };

      webSocket.current.onerror = (event) => {
        console.error('WebSocket error for chat', selectedChatId, event);
      };
    }
  }, [selectedChatId, token]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  const sendMessage = () => {
  if (newMessage.trim() !== '') {
    const messageData = {
      content: newMessage,
      sender: user_id,
      chat_id: selectedChatId,
    };
    webSocket.current.send(JSON.stringify(messageData));
    console.log("Message sent");
    setNewMessage('');
  }
};

  return (
    <div className='chats-page'>
      <Navbar />
      <h1 className="title">  Your Chats</h1>
      
      <div className='chats-container'>
        <div className='chats-box'>
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`chat-container ${selectedChatId === chat.chat_id ? 'selected-chat' : ''}`}
              onClick={() => handleChatClick(chat.chat_id)}
            >
              <p>Chat with: {chat.chat_with_first_name} {chat.chat_with_last_name}</p>
              <p>Chat ID: {chat.chat_id}</p>
              <p>Last Message At: {chat.last_message_at}</p>
            </div>
          ))}
        </div>
        {selectedChatId && (
          <div className='chat-interface'>
          <div className="postsWrapper">
          <div className="topWrapper"> </div>
            <div className="bodyWrapper">
            <div className='messages-scroll-box'>
              {messages.map((message, index) => (
                <div key={index} className={`message-container ${message.sender === user_id ? 'sent' : 'received'}`}>
                  <p>{message.content}</p>
                  <span className="timestamp">{new Date(message.sent_at).toLocaleString()}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            </div>
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button className="send-message-button" onClick={sendMessage}>Send</button>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messenger;
