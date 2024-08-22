fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/collectibles')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("failed-to-load-shop").classList.remove('hidden');
        document.getElementById("shop-category-loading").classList.add('hidden');
    });

function reFetchCollectibles() {
    document.getElementById("shop-category-loading").classList.remove('hidden');
    document.getElementById("failed-to-load-shop").classList.add('hidden');
    fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/collectibles')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
            });
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("failed-to-load-shop").classList.remove('hidden');
            document.getElementById("shop-category-loading").classList.add('hidden');
        });
}
