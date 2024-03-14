document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('searchBtn').addEventListener('click', function(){
        const username = document.getElementById('username').value.trim();
        if (username === ''){
            alert('Please enter Github username');
            return;
        }
    
        fetch('https://api.github.com/users/JohnathanGallimore/repos')
            .then(response => response.json())
            .then(data =>{
                displayRepositories(data);
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
            });
    });
    
    function displayRepositories(repositories){
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
    
        repositories.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo');

            const nameElement = document.createElement('h2');
            nameElement.textContent = repo.name;
            const nameLink = document.createElement('a');
            nameLink.textContent = repo.html_url;
            nameLink.target = '_blank';
            nameElement.appendChild(nameLink);

            const githubIcon = document.createElement('i');
            githubIcon.classList.add('fa-brands', 'fa-github-alt');

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = repo.description;

            const creationDateElement = document.createElement('p');
            creationDateElement.textContent = "Created: " + new Date(repo.created_at).toLocaleDateString();
            
            const updateDateElement = document.createElement('p');
            updateDateElement.textContent = "Last Updated: " + new Date(repo.updated_at).toLocaleDateString();

            const commitsElement = document.createElement('p');
            commitsElement.textContent = "Number of Commits: " + repo.commits_url;

            const languagesElement = document.createElement('p');
            languagesElement.textContent = "Languages: " + repo.languages_url;

            const watchersElement = document.createElement('p');
            watchersElement.textContent = "Numbers of Watchers: " + repo.watchers;

            const linkElement = document.createElement('a');
            linkElement.textContent = 'View on Github';
            linkElement.href = repo.html_url;
            linkElement.target = '_blank';
            linkElement.prepend(githubIcon);

            repoElement.appendChild(nameElement);
            repoElement.appendChild(descriptionElement);
            repoElement.appendChild(creationDateElement);
            repoElement.appendChild(updateDateElement);
            repoElement.appendChild(commitsElement);
            repoElement.appendChild(languagesElement);
            repoElement.appendChild(watchersElement);
            repoElement.appendChild(linkElement);

            gallery.appendChild(repoElement)
    
            
        });
    }
})
