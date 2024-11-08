const { User } = require('../models');
const {
  sendMail,
  comparePasswords,
} = require("../utils");

exports.sendMailController = async (req, res) => {
  const { name, email,message } = req.body;
  const subject = "Hesabınızı Onaylayın";
    const htmlContent = `
      <h1>İsim: ${name}</h1>
      <p>Email: ${email}</p>
      <p>${message}</p>
    `;
  try {
    sendMail(process.env.TO_EMAIL_USER,subject,htmlContent)
    res.status(200).json({ message: "Email başarıyla gönderildi" });

  } catch (error) {
    res.status(500).json({ message: "Giriş işlemi sırasında bir hata oluştu." });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) return res.status(401).json({ success: false, message: "Geçersiz e-posta veya parola." });

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Geçersiz e-posta veya parola." });

    // Giriş başarılı olduğunda success ve token döndür
    res.status(200).json({ success: true, message: "Giriş başarılı.", token: "adminTokenHere" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Giriş işlemi sırasında bir hata oluştu." });
  }
};



