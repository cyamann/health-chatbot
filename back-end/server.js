const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Message = require('./models/Message');
const sequelize = require('./db'); // sequelize'i doğru şekilde içeri aktar

dotenv.config(); // .env dosyasını yükle

const app = express();
app.use(bodyParser.json());

// Chatbot mesajlarını kaydedecek API
app.post('/api/message', async (req, res) => {
  const { message } = req.body;

  try {
    // Kullanıcı mesajını veritabanına kaydet
    const userMessage = await Message.create({
      sender: 'user',
      text: message,
    });

    // OpenAI ile yanıt al
    const openAIClient = new Client({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openAIClient.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const botMessage = response.choices[0].message.content;

    // Bot'un yanıtını veritabanına kaydet
    const botResponse = await Message.create({
      sender: 'bot',
      text: botMessage,
    });

    // Kullanıcı ve bot mesajlarını birlikte döndür
    res.json({ reply: botMessage });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Sohbet geçmişini alacak API
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['timestamp', 'ASC']], // Zaman sırasına göre sırala
    });
    res.json(messages);
  } catch (error) {
    console.error('Mesajları alırken hata:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Veritabanını senkronize et
sequelize.sync().then(() => { // sequelize burada tanımlı
  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
});
