const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/videos', videoController.getVideos);
router.post('/videos', videoController.addVideo);

module.exports = router;
