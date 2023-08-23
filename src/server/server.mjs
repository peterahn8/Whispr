import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateIdeas,
  generateRoadmap,
} from '../controllers/openaiController.mjs'; // Import your controller functions
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Deploy express
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}.`);
});

// Serve static
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(
  '/controllers',
  express.static(path.join(__dirname, '..', 'controllers'))
);

// Serve .mjs files as ESM
app.get('*.mjs', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, '..', req.path));
});

// Set up routes
app.post('/openai/applications', async (req, res) => {
  try {
    const { selectedTechnologies } = req.body;
    const ideas = await generateIdeas(selectedTechnologies);
    res.send(ideas);
  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).send('An error occurred while generating ideas.');
  }
});

app.post('/openai/roadmap', async (req, res) => {
  try {
    const { selectedTechnologies, selectedProjectIdea } = req.body;
    const roadmap = await generateRoadmap(
      selectedTechnologies,
      selectedProjectIdea
    );
    res.send(roadmap);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).send('An error occurred while generating a roadmap.');
  }
});

export const chatCompletion = async (options) => {
  try {
    const response = await openai.chat.completions.create(options);
    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};