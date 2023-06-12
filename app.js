const readline = require('readline');

const {
  generateMeta,
  generateImage,
} = require('./controllers/openaiController');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Ask GPT about a technology: \n', generateMeta);
// rl.question('Describe your thumbnail: \n', generateImage);
