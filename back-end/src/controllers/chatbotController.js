const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

class ChatbotController {
  constructor() {
    // Initialize the OpenAI configuration and client
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getChatResponse(message) {
    if (!message) {
      throw new Error('Message content is required.');
    }

    try {
      console.log("API Key:", process.env.OPENAI_API_KEY); // For testing only

      const completion = await this.openai.createChatCompletion({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
      });

      return completion.data.choices[0].message.content;
    } catch (error) {
      console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
      throw new Error('Failed to get response from OpenAI API.');
    }
  }
}

module.exports = ChatbotController;
