const xss = require('xss');
const { normalizeEmail, isEmail, sanitizeUrl, isURL } = require('validator');

const sanitizeRequest = (req, res, next) => {
  const sanitize = (obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === 'string') {
        if (key === 'email' && isEmail(value)) {
          obj[key] = normalizeEmail(value); 
        } else if (key === 'website' && isURL(value)) {
          obj[key] = sanitizeUrl(value); 
        } else {
          obj[key] = xss(value); 
        }
      } else if (typeof value === 'object' && value !== null) {
        sanitize(value); 
      }
    });
  };

  if (req.body) sanitize(req.body); 
  if (req.query) sanitize(req.query); 
  if (req.params) sanitize(req.params); 

  next(); 
};

module.exports = sanitizeRequest;
