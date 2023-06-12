const openai = require('../config/openaiConfig');

const generateMeta = async (answer) => {
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

  console.log(description.data.choices[0].message);

  // const tags = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'user',
  //       content: `Generate business applications of ${answer} in 5 points, delineated by commas.`,
  //     },
  //   ],
  //   max_tokens: 100,
  // });

  // console.log(tags.data.choices[0].message);
};

const generateImage = async (desc) => {
  const image = await openai.createImage({
    prompt: desc,
    n: 1,
    size: '512x512',
  });

  console.log(image.data.data[0].url);
};

module.exports = { generateMeta, generateImage };
