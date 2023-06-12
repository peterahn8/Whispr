// const readline = require('readline');
const express = require('express');

const {
  generateMeta,
  generateImage,
} = require('./controllers/openaiController');

// Deploy Express server
const app = express();
app.listen(4000, () => console.log('Listening for requests on port 4000.'));

// Middleware
app.use(express.json());

// Routes
app.post('/openai/meta', generateMeta);
app.post('/openai/image', generateImage);

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('Ask GPT about a technology: \n', generateMeta);
// rl.question('Describe your thumbnail: \n', generateImage);
