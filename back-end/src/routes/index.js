// routes/chatbotRoutes.js
const express = require('express');
const { getChatsWithMessages } = require('../controllers/chatbotController');

const router = express.Router();

// Mesajları almak için endpoint
router.get('/message/:id', getChatsWithMessages);

module.exports = router;