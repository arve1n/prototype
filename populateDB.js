const mongoose = require('mongoose');
const Video = require('./models/Video'); // Adjust the path if necessary

mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const videos = [
  {
    title: 'Video 1',
    videoId: 'abc123',
  },
  {
    title: 'Video 2',
    videoId: 'def456',
  },
  // Add more sample data as needed
];

(async () => {
  try {
    await Video.insertMany(videos);
    console.log('Sample video data inserted successfully.');
  } catch (error) {
    console.error('Error inserting sample video data:', error);
  } finally {
    mongoose.disconnect();
  }
})();