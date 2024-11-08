import React, { useState } from 'react';

function ChatBot({ selectedChat }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(selectedChat ? selectedChat.messages : []);

  // OpenAI modeline mesajı gönderen API
  const sendMessageToOpenAI = async (message) => {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY`, // OpenAI API key buraya gelecek
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // Kullanılacak model
          prompt: message, // Kullanıcının mesajı
          max_tokens: 150, // Cevap uzunluğu
        }),
      });

      const data = await response.json();
      return data.choices[0].text; // API'den dönen cevabı al
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
    }
  };

  // Mesaj gönderme işlemi
  const handleSendMessage = async () => {
    if (message.trim()) {
      const response = await sendMessageToOpenAI(message);
      setChatMessages([
        ...chatMessages,
        { sender: 'user', text: message },
        { sender: 'bot', text: response },
      ]);
      setMessage('');
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Chat Başla</h2>
        <p className="text-lg">Bir sohbet seçin veya yeni bir sohbet başlatın.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Chat: {selectedChat.name}</h2>
      <div className="h-64 overflow-y-scroll mb-4 border p-4 bg-white rounded-lg">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-xs ${
              msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800 mr-auto'
            }`}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
