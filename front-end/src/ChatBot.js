import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);  // Mesajlar state'i
  const [input, setInput] = useState('');  // Kullanıcı girişi

  // Sayfa yüklendiğinde sohbet geçmişini al
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages');
        const data = await response.json();
        setMessages(data);  // Gelen mesajları state'e set et
      } catch (error) {
        console.error('Sohbet geçmişi alınırken bir hata oluştu:', error);
      }
    };
    fetchMessages();  // Mesajları yükle
  }, []);  // Sadece ilk renderda çalışacak

  // Mesaj gönderme fonksiyonu
  const sendMessage = async () => {
    if (input.trim() !== '') {
      // Kullanıcı mesajını ekle
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');  // Giriş kutusunu temizle

      try {
        // Kullanıcı mesajını backend'e gönder
        const response = await fetch('http://localhost:5000/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();  // Bot yanıtını al
        // Yeni mesajları state'e ekle
        const updatedMessages = [
          ...newMessages,
          { sender: 'bot', text: data.reply },
        ];
        setMessages(updatedMessages);  // Mesajları güncelle
      } catch (error) {
        console.error('Mesaj gönderme sırasında bir hata oluştu:', error);
      }
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}  // Kullanıcı girişi
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}  // Enter ile gönder
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
