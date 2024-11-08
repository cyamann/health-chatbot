const sanitizeRequest = require('./sanitize');
const rateLimit = require('express-rate-limit');
const { authenticateToken } = require('./authMiddleware');
const uploadSingleImage = require("./uploadMiddleware"); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
});

const userRegisterMiddleware = [sanitizeRequest, limiter];
const userVerifyMiddleware = [sanitizeRequest, limiter];

module.exports = {
  userRegisterMiddleware,
  userVerifyMiddleware,
  authenticateToken,
  sanitizeRequest,
  uploadSingleImage
};
