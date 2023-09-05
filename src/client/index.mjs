document.addEventListener('DOMContentLoaded', () => {
  const generateIdeasButton = document.getElementById('generateIdeasButton');
  const generateRoadmapButton = document.getElementById(
    'generateRoadmapButton'
  );
  const technologyForm = document.getElementById('technologyForm');
  const projectIdeasDiv = document.getElementById('projectIdeas');
  const projectRoadmapDiv = document.getElementById('projectRoadmap');

  let selectedProjectIdea = ''; // Store selected project idea

  generateIdeasButton.addEventListener('click', async () => {
    const selectedTechnologies = Array.from(technologyForm.elements)
      .filter(
        (checkbox) => checkbox.checked && checkbox.name === 'technologies'
      )
      .map((checkbox) => checkbox.value);

    // Fetch request to "/openai/applications" endpoint
    const response = await fetch('/openai/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedTechnologies }),
    });

    const ideas = await response.text();

    // Parse the response text into an array
    const ideasArray = ideas.split('\n').filter((item) => item.trim() !== '');

    // Clear projectIdeasDiv before adding new content
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

        // Toggle selected class for the clicked idea
        ideaParagraph.classList.toggle('selected-idea');

        // Update selected project idea
        selectedProjectIdea = ideaParagraph.classList.contains('selected-idea')
          ? idea
          : '';
      });

      projectIdeasDiv.appendChild(ideaParagraph);
    });

    // Clear selected project idea when generating new ideas
    selectedProjectIdea = '';
  });

  generateRoadmapButton.addEventListener('click', async () => {
    if (!selectedProjectIdea) {
      // If no project idea selected, show a message
      projectRoadmapDiv.innerHTML =
        '<p>Please select a project idea first.</p>';
      return;
    }

    const selectedTechnologies = Array.from(technologyForm.elements)
      .filter(
        (checkbox) => checkbox.checked && checkbox.name === 'technologies'
      )
      .map((checkbox) => checkbox.value);

    // Fetch request to "/openai/roadmap" endpoint
    const response = await fetch('/openai/roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedTechnologies, selectedProjectIdea }),
    });

    const roadmap = await response.text();

    // Split and delineate roadmap
    const roadmapSteps = roadmap
      .split('\n')
      .filter((item) => item.trim() !== '');
    const formattedRoadmap = roadmapSteps.join('<br>');

    // Display formatted roadmap
    projectRoadmapDiv.innerHTML = formattedRoadmap;
  });
});
