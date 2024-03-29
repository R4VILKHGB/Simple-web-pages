document.addEventListener('DOMContentLoaded', function () {
    //Fetch JSON data
    fetch('projects-data.json')
        .then(response => response.json())
        .then(data => {
            populateProjects(data.projects);
        })
        .catch(error => console.error('Error fetching projects:', error));
});

function populateProjects(projects) {
    const shelfContainer = document.querySelector('.library-shelf');
    projects.forEach(project => {
        const book = createBook(project);
        shelfContainer.appendChild(book);
    });
}

function createBook(project) {
    const book = document.createElement('div');
    book.className = 'book';
    book.onclick = function () {
        showProjectDetails(project.id, projects); 
    };
    const title = document.createElement('h3');
    title.textContent = project.title;
    book.appendChild(title);
    return book;
}

function showProjectDetails(projectId, projects) {
    const project = projects.find(p => p.id === projectId);
    const detailsContainer = document.getElementById('project-details');
    detailsContainer.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <div>
            ${project.images.map(image => `<img src="${image}" alt="${project.title}">`).join('')}
        </div>
    `;
}
