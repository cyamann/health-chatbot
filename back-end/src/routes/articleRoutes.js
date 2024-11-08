const express = require('express');
const { getArticleById, saveArticle,getAllArticles, deleteArticle,updateArticle } = require('../controllers/articleController');
const uploadSingleImage = require("../middlewares/uploadMiddleware"); 
const router = express.Router();

router.get('/get-article/:id', getArticleById); 
router.post('/save-article', uploadSingleImage, saveArticle); 

router.get('/getAll', getAllArticles);



router.delete('/delete-article/:id', deleteArticle);

router.post('/update-article/:id', uploadSingleImage, updateArticle);

module.exports = router;
