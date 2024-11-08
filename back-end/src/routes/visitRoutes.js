const express = require('express');
const router = express.Router();
const VisitController = require('../controllers/visitController.js') ;
router.get('/visit-count', VisitController.getVisitData);
router.get('/visit-increment', VisitController.incrementVisit);
module.exports = router;
