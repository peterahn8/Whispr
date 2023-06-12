const openai = require('../config/openaiConfig');

const generateMeta = async (req, res) => {
  const { answer } = req.body;

  const description = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Explain how this technology works: ${answer}`,
      },
    ],
    max_tokens: 100,
  });

  const tags = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Generate business applications of ${answer} in 5 points, delineated by commas.`,
      },
    ],
    max_tokens: 100,
  });

  res.status(200).json({
    description: description.data.choices[0].message,
    tags: tags.data.choices[0].message,
  });
};

const generateImage = async (req, res) => {

  const image = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: '512x512',
  });

  res.json({
    url: image.data.data[0].url
  })
};

module.exports = { generateMeta, generateImage };
