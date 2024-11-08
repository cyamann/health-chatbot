const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


async function sendMail(to, subject, htmlContent) {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to, 
    subject, 
    html: htmlContent, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('E-posta gönderilemedi.');
  }
}

module.exports = sendMail;
