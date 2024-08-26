const servers = document.querySelector("[data-servers-template]");
const serversList = document.querySelector("[data-servers]");

fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/servers')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const card = servers.content.cloneNode(true).children[0];
            const serversButton = card;  // Corrected the selection of the button element

            serversButton.classList.add(user.class);

            if (user.titleText) {
                serversButton.title = user.titleText;
            }

            const userImage = card.querySelector("[data-server-icon]");
            userImage.src = user.image;
            userImage.alt = user.title;

            // Set the button's click event to redirect to the URL stored in the API
            serversButton.onclick = function() {
                window.location.href = user.url;
            };

            serversList.append(card);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
    });
    
fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/news')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("blog-failed").classList.remove('hidden');
    });