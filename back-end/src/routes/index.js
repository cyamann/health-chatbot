const express = require('express');
//const authRoutes = require('./authRoutes');
const articleRoutes = require('./articleRoutes.js');
//const visitRoutes = require('./visitRoutes.js');

const router = express.Router();


//router.use('/auth', authRoutes); 

router.use('/article', articleRoutes); 

//router.use('/visit', visitRoutes);

module.exports = router;
