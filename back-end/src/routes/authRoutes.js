// routes/authRoutes.js
const express = require('express');
const {
  loginUser,
  sendMailController


} = require('../controllers/authController');

const router = express.Router();


// Giriş yapma
router.post('/login', loginUser);


router.post('/send-mail', sendMailController);


module.exports = router;
