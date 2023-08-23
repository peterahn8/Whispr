document.addEventListener('DOMContentLoaded', () => {
  const generateIdeasButton = document.getElementById('generateIdeasButton');
  const generateRoadmapButton = document.getElementById(
    'generateRoadmapButton'
  );
  const technologyForm = document.getElementById('technologyForm');
  const projectIdeasDiv = document.getElementById('projectIdeas');
  const projectRoadmapDiv = document.getElementById('projectRoadmap');

  let selectedProjectIdea = ''; // Store the selected project idea

  generateIdeasButton.addEventListener('click', async () => {
    const selectedTechnologies = Array.from(technologyForm.elements)
      .filter(
        (checkbox) => checkbox.checked && checkbox.name === 'technologies'
      )
      .map((checkbox) => checkbox.value);

    // Make a fetch request to your server's "/openai/applications" endpoint
    const response = await fetch('/openai/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedTechnologies }),
    });

    // Extract and display the generated ideas
    const ideas = await response.text();

    // Parse the response text into an array of ideas
    const ideasArray = ideas.split('\n').filter((item) => item.trim() !== '');

    // Clear the projectIdeasDiv before adding new content
    projectIdeasDiv.innerHTML = '';

    // Create and add each idea as a clickable paragraph
    ideasArray.forEach((idea) => {
      const ideaParagraph = document.createElement('p');
      ideaParagraph.textContent = idea;
      ideaParagraph.classList.add('clickable-idea');

      // Event listener to handle selecting/deselecting ideas
      ideaParagraph.addEventListener('click', () => {
        // Remove the class from all ideas
        projectIdeasDiv.querySelectorAll('.clickable-idea').forEach((el) => {
          el.classList.remove('selected-idea');
        });

        // Toggle the selected class for the clicked idea
        ideaParagraph.classList.toggle('selected-idea');

        // Update the selected project idea
        selectedProjectIdea = ideaParagraph.classList.contains('selected-idea')
          ? idea
          : '';
      });

      projectIdeasDiv.appendChild(ideaParagraph);
    });

    // Clear the selected project idea when generating new ideas
    selectedProjectIdea = '';
  });

  generateRoadmapButton.addEventListener('click', async () => {
    if (!selectedProjectIdea) {
      // If no project idea is selected, show a message to the user
      projectRoadmapDiv.innerHTML =
        '<p>Please select a project idea first.</p>';
      return;
    }

    const selectedTechnologies = Array.from(technologyForm.elements)
      .filter(
        (checkbox) => checkbox.checked && checkbox.name === 'technologies'
      )
      .map((checkbox) => checkbox.value);

    // Make a fetch request to your server's "/openai/roadmap" endpoint
    const response = await fetch('/openai/roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedTechnologies, selectedProjectIdea }),
    });

    // Extract and display the generated roadmap
    const roadmap = await response.text();
    projectRoadmapDiv.innerHTML = roadmap;
  });
});
