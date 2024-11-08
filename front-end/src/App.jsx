import React, { useState } from 'react';
import ChatBot from './assets/Chatbot';
import Navbar from './assets/Navbar'; // Navbar bileşenini içeri aktar
import './index.css';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversation, setConversation] = useState([
    // Simülasyon olarak birkaç chat verisi ekledim, kendi API'nize göre düzenleyin
    { id: 1, name: 'Chat 1', messages: [{ sender: 'user', text: 'Hi!' }, { sender: 'bot', text: 'Hello!' }] },
    { id: 2, name: 'Chat 2', messages: [{ sender: 'user', text: 'How are you?' }, { sender: 'bot', text: 'I am fine, thank you!' }] },
  ]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat); // Tıklanan chat'i seç
  };

  return (
    <div className="flex min-h-screen">
      {/* Sol Sidebar (Navbar) */}
      <Navbar chats={conversation} onChatSelect={handleChatSelect} />

      {/* Sağ ChatBot Ekranı */}
      <div className="flex-1 p-5 max-w-md mx-auto mt-10 border rounded-lg shadow-lg bg-white">
        <ChatBot selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default App;
