// controllers/chatController.js
const Chat = require('../models/chat');
const Message = require('../models/message');

// Yeni bir sohbet başlat
const startChat = async () => {
  const chat = await Chat.create();
  return chat;
};

// Mesaj ekle
const addMessage = async (chatId, sender, text) => {
  const message = await Message.create({ chatId, sender, text });
  return message;
};


// Belirli bir sohbetin mesajlarını almak için
const getChatsWithMessages = async (req, res) => {
  const chatId = req.params.id;  // URL'den chatId al

  try {
    // Veritabanından sohbeti ve o sohbetin mesajlarını al
    const chat = await Chat.findOne({
      where: { id: chatId },
      include: [{
        model: Message,
        where: { chatId: chatId },
        order: [['timestamp', 'ASC']],  // Mesajları zaman sırasına göre sırala
      }],
    });

    // Eğer sohbet bulunamazsa, 404 döndür
    if (!chat) {
      return res.status(404).json({ message: 'Sohbet bulunamadı.' });
    }

    // Sohbet ve mesajlarla birlikte başarı durumu döndür
    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};



module.exports = { startChat, addMessage, getChatsWithMessages };
