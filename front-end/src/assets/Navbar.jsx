import React from 'react';

function Navbar({ chats, onChatSelect }) {
  return (
    <div className="flex flex-col w-64 p-5 bg-gray-800 text-white h-full">
      <h2 className="text-2xl font-bold mb-4">Sohbetler</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="cursor-pointer hover:bg-gray-600 p-2 rounded-lg mb-2"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
