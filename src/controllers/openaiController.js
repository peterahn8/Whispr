const openai = require('../config/openaiConfig');

const generateDescription = async (req, res) => {
  const { answer } = req.body;

  const description = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `In 50 words or fewer, explain how this technology works: ${answer}`,
      },
    ],
    max_tokens: 100,
  });

  res.status(200).json({
    description: description.data.choices[0].message,
  });
};

const generateApplications = async (req, res) => {
  const { answer } = req.body;

  const applications = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `In 150 words or fewer, generate business applications of ${answer} in 5 points.`,
      },
    ],
    max_tokens: 300,
  });

  res.status(200).json({
    applications: applications.data.choices[0].message,
  });
};

const generateImage = async (req, res) => {
  const image = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: '512x512',
  });

  res.status(200).json({
    url: image.data.data[0].url,
  });
};

module.exports = { generateDescription, generateApplications, generateImage };
