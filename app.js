const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const uri = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(uri), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const Video = require('./models/Video');
const Comment = require('./models/Comment');
const Product = require('./models/Product'); // Create Product model

// Fetch all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
});

// Fetch comments for a video
app.get('/api/video/:videoId/comments', async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ videoId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// post comments for a video
app.post('/api/video/:videoId/comments', async (req, res) => {
  try {
    const { videoId } = req.params;
    const { name, comment } = req.body;

    const newComment = new Comment({
      name,
      comment,
      videoId,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});


// Fetch product list
app.get('/api/video/:videoId/products', async (req, res) => {
    try {
      const { videoId } = req.params;
      const products = await Product.find({ videoId });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

// show video detail
  app.get('/api/video/:videoId', async (req, res) => {
    try {
      const { videoId } = req.params;
      const video = await Video.findOne({ videoId }); // Assuming 'videoId' is a field in your Video model
      if (video) {
        res.json(video);
      } else {
        res.status(404).json({ error: 'Video not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching video details' });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});