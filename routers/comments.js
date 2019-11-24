const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments');

router
    .route('/')
    .get(controller.getComments);


module.exports = router;