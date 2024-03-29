import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ChatPage() {
  const [messages, setMessages] = useState([]); // State to store messages

  useEffect(() => {
    // Fetch existing chats from Supabase and setMessages
  }, []);

  const sendMessage = (content) => {
    // Function to send a message. Implement sending message to Supabase here.
  };

  return (
    <div>
      <h1>Chat with a Mental Health Professional</h1>
      <div>
        {/* Display messages here */}
        {messages.map((message) => (
          <div key={message.message_id}>{message.content}</div>
        ))}
      </div>
      <input type="text" placeholder="Type a message..." />
      <button onClick={() => sendMessage("Your message content")}>Send</button>
      <Link to="/Homepage"> Homepage </Link>
    </div>
  );
}

export default ChatPage;