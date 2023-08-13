const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/video/:videoId/comments', commentController.getComments);
router.post('/video/:videoId/comments', commentController.addComment);

module.exports = router;