const express = require('express');
const { getChatsWithMessages } = require('../controllers/chatbotController');

const router = express.Router();

router.get('/message/:id', getChatsWithMessages);

module.exports = router;