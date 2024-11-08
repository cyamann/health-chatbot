import React, { useState } from 'react';
import ChatBot from './assets/Chatbot';
import Navbar from './assets/Navbar'; // Navbar bileşenini içeri aktar
import './index.css';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversation, setConversation] = useState([
    { id: 1, name: 'Chat 1', messages: [{ sender: 'user', text: 'Hi!' }, { sender: 'bot', text: 'Hello!' }] },
    { id: 2, name: 'Chat 2', messages: [{ sender: 'user', text: 'How are you?' }, { sender: 'bot', text: 'I am fine, thank you!' }] },
  ]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat); // Tıklanan chat'i seç
  };

  const handleStartNewChat = () => {
    const newChat = { id: conversation.length + 1, name: `Chat ${conversation.length + 1}`, messages: [] };
    setConversation([...conversation, newChat]); // Yeni chat ekle
    setSelectedChat(newChat); // Yeni chat'i seç
  };

  return (
    <div className="container flex">
      {/* Sol Sidebar (Navbar) */}
      <div className="navbar w-1/4 p-4">
        <button onClick={handleStartNewChat} className="mb-4 p-2 bg-blue-500 text-white">Yeni Sohbete Başla</button>
        <Navbar chats={conversation} onChatSelect={handleChatSelect} />
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
