const express = require('express');
const ChatbotController = require('./src/controllers/chatbotController'); // Adjusted import
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
// Initialize OpenAI service
const openAIService = new ChatbotController(); // Initialize instance of ChatbotController

// Route to handle chat messages
app.post('/api', async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await openAIService.getChatResponse(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
