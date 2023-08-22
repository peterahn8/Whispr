const openai = require('../config/openaiConfig');

// This whole script is still in early stage, while I learn more about prompt engineering.
// My goal is to figure out how to split prompts into smaller subtasks for GPT to consume.

const generateDescription = async (req, res) => {
  const { answer } = req.body;

  const description = await openai.createChatCompletion({
    model: 'gpt-4-0314',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that helps new developers plan their passion projects.',
      },
      {
        role: 'user',
        content: `In 50 words or fewer, explain how this technology works: ${answer}`,
      },
    ],
    max_tokens: 200,
  });

  res.status(200).json({
    description: description.data.choices[0].message,
  });
};

const generateIdeas = async (req, res) => {
  const { answer } = req.body;

  const ideas = await openai.createChatCompletion({
    model: 'gpt-4-0314',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that helps new developers plan their passion projects.',
      },
      {
        role: 'user',
        content: `In 200 words or fewer, generate 3 project ideas for ${answer}.`,
      },
    ],
    max_tokens: 500,
  });

  res.status(200).json({
    ideas: ideas.data.choices[0].message,
  });
};

async function generateRoadmap(selectedTechnologies) {
  const roadmap = await openai.createChatCompletion({
    model: 'gpt-4-0314',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that helps new developers plan their passion projects.',
      },
      {
        role: 'user',
        content: `Generate a project roadmap that utilizes the following technologies: ${selectedTechnologies.join(
          ', '
        )}. Format the project roadmap with numbers for each step.`,
      },
    ],
    max_tokens: 1000,
  });

  return roadmap.data.choices[0].message;
}

const generateImage = async (req, res) => {
  const image = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: '512x512',
  });

  res.status(200).json({
    url: image.data.data[0].url,
    S,
  });
};

module.exports = {
  generateDescription,
  generateIdeas,
  generateRoadmap,
  generateImage,
};
