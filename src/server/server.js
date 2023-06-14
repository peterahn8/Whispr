const express = require('express');

const {
  generateMeta,
  generateImage,
} = require('../controllers/openaiController');

// Deploy Express server
const app = express();
app.listen(4000, () => console.log('Listening for requests on port 4000.'));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.post('/openai/meta', generateMeta);
app.post('/openai/image', generateImage);