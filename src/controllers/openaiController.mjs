import { chatCompletion } from '../server/server.mjs';

export const generateIdeas = async (selectedTechnologies) => {
  const ideas = await chatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that helps new developers plan their passion projects.',
      },
      {
        role: 'user',
        content: `In 200 words or fewer, generate 3 project ideas using the selected technologies: ${selectedTechnologies.join(
          ', '
        )}. Delineate each idea with a number.`,
      },
    ],
    max_tokens: 500,
  });
  console.log(ideas)
  return ideas;
};

export const generateRoadmap = async (
  selectedTechnologies,
  selectedProjectIdea
) => {
  const roadmap = await chatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that helps new developers plan their passion projects.',
      },
      {
        role: 'user',
        content: `Generate a project roadmap for the selected idea: "${selectedProjectIdea}" that utilizes the following technologies: ${selectedTechnologies.join(
          ', '
        )}. Delineate each step with a number.`,
      },
    ],
    max_tokens: 1000,
  });

  return roadmap;
};
