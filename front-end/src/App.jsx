import React, { useState } from 'react';
import ChatBot from './assets/Chatbot';
import Navbar from './assets/Navbar'; 
import './index.css';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversation, setConversation] = useState([]); 

  const handleChatSelect = (chat) => {
    setSelectedChat(chat); 
  };

  const handleStartNewChat = () => {
    const newChat = { id: conversation.length + 1, name: `Chat ${conversation.length + 1}`, messages: [] };
    setConversation([...conversation, newChat]);
    setSelectedChat(newChat); // Automatically open the new chat
  };

  return (
    <div className="container flex">
      {/* Sol Sidebar (Navbar) */}
      <div className="navbar w-1/4">
        <Navbar chats={conversation} onChatSelect={handleChatSelect} onStartNewChat={handleStartNewChat} />
      </div>

      {/* Sağ ChatBot Ekranı */}
      <div className="chat-container w-3/4 p-4">
        {selectedChat ? (
          <div className="chatbox-wrapper">
            <div className="chatbox bg-gray-100 p-4 rounded-lg shadow-lg">
              <ChatBot selectedChat={selectedChat} />
            </div>
          </div>
        ) : (
          <p>Yeni sohbet seçiniz ya da başlatın.</p>
        )}
      </div>
    </div>
  );
}

export default App;
