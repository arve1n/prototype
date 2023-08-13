const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  videoId: String,
});

module.exports = mongoose.model('Comment', commentSchema);