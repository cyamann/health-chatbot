import React from 'react';

function Navbar({ chats, onChatSelect }) {
  return (
    <div className="w-64 p-5 bg-gray-200 border-r">
      <h3 className="text-xl font-bold mb-4">Chats</h3>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="cursor-pointer p-2 hover:bg-gray-300 rounded-lg"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
