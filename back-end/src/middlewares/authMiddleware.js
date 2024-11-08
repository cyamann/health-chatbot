const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  try {

    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Yetkisiz erişim. Token gerekli.' });
    }


    const token = authHeader.split(' ')[1];


    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 

    next(); 
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token süresi dolmuş. Lütfen tekrar giriş yapın.' });
    } else {
      return res.status(401).json({ message: 'Geçersiz token.' });
    }
  }
};
