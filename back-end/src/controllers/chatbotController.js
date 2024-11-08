const Chat = require('../models/chat');
const Message = require('../models/message');

const startChat = async () => {
  const chat = await Chat.create();
  return chat;
};

const addMessage = async (chatId, sender, text) => {
  const message = await Message.create({ chatId, sender, text });
  return message;
};


const getChatsWithMessages = async (req, res) => {
  const chatId = req.params.id;

  try {
    const chat = await Chat.findOne({
      where: { id: chatId },
      include: [{
        model: Message,
        where: { chatId: chatId },
        order: [['timestamp', 'ASC']], 
      }],
    });

    if (!chat) {
      return res.status(404).json({ message: 'Sohbet bulunamadı.' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};



module.exports = { startChat, addMessage, getChatsWithMessages };
