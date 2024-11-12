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
    setSelectedChat(newChat); // Yeni sohbeti otomatik aç
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row h-screen">
      {/* Sol Sidebar (Navbar) */}
      <div className="navbar w-full md:w-1/4 h-full bg-gray-200 p-4 overflow-y-auto">
        <Navbar chats={conversation} onChatSelect={handleChatSelect} onStartNewChat={handleStartNewChat} />
      </div>

      {/* Sağ ChatBot Ekranı */}
      <div className="chat-container flex-1 p-4">
        {selectedChat ? (
          <div className="chatbox bg-white p-4 rounded-lg shadow-lg h-full overflow-y-auto">
            <ChatBot selectedChat={selectedChat} />
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">Yeni sohbet seçiniz ya da başlatın.</p>
        )}
      </div>
    </div>
  );
}

export default App;
