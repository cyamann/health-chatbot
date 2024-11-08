const { Article } = require("../models");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

exports.getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Makale bulunamadı." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Makale alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Makaleler alınırken bir hata oluştu.",
      error: error.message,
    });
  }
};

exports.saveArticle = async (req, res) => {
  const { id, title, summary, content } = req.body;
  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  if (!title || !summary || !content) {
    return res
      .status(400)
      .json({ message: "Başlık, açıklama ve içerik zorunludur." });
  }

  try {
    const articleId = id || uuidv4();

    const newArticle = await Article.create({
      id: articleId,
      title,
      summary,
      content,
      imageUrl,
    });

    return res.status(201).json({
      message: "Makale başarıyla kaydedildi.",
      article: newArticle,
      imageUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Makale kaydedilirken bir hata oluştu.",
      error: error.message,
    });
  }
};
const findImagePath = (articleId) => {
  const imageDir = path.join(__dirname, "../../uploads/");
  const extensions = [".png", ".jpg", ".jpeg"];

  for (let ext of extensions) {
    const imagePath = path.join(imageDir, articleId + ext);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }
  return null;
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;

  try {
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Makale bulunamadı" });
    }

 
    let imageUrl;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;


      if (article.imageUrl) {
        const oldImagePath = path.join(
          __dirname,
          "../../uploads/",
          path.basename(article.imageUrl)
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) {
           
          }
        });
      }
    } else {
      imageUrl = article.imageUrl; 
    }

 
    article.title = title;
    article.summary = summary;
    article.content = content;
    article.imageUrl = imageUrl;

    await article.save();

    res.status(200).json({
      message: "Makale başarıyla güncellendi",
      article,
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu", error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Makale bulunamadı." });
    }

    await article.destroy();

    const possibleExtensions = [".jpg", ".jpeg", ".png"];
    let fileDeleted = false;

    for (const ext of possibleExtensions) {
      const filePath = path.join(process.env.UPLOAD_DIR, `${id}${ext}`);

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Dosya silinirken bir hata oluştu." });
          } else {
            fileDeleted = true;
          }
        });
        break;
      }
    }

  

    res
      .status(200)
      .json({ message: "Makale ve varsa dosya başarıyla silindi." });
  } catch (error) {
    res.status(500).json({
      message: "Makale silinirken bir hata oluştu.",
      error: error.message,
    });
  }
};
