const template = document.querySelector("[data-shop-category-template]");
const output = document.querySelector("[data-shop-output]");

fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/profiles-plus')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const category = template.content.cloneNode(true).children[0];

            const bannerImage = category.querySelector("[data-shop-category-banner-image]");
            bannerImage.src = user.banner;
            bannerImage.alt = user.name;

            const logoImage = category.querySelector("[data-shop-category-logo-image]");
            logoImage.src = user.logo;
            logoImage.alt = user.name;
            
            const summary = category.querySelector("[data-shop-category-desc]");
            summary.textContent = user.summary;

            if (user.summary_black === "true") {
                category.querySelector(".shop-category-text-holder").style.color = 'black';
            }

            document.getElementById("shop-category-loading").classList.add('hidden');
            output.append(category);

            if (user.logo_sway === "true") {
                document.getElementById("shop-banner-logo").classList.add('shop-logo-sway');
            }
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("failed-to-load-pplus").classList.remove('hidden');
        document.getElementById("shop-category-loading").classList.add('hidden');
    });

function reFetchProfilesPlus() {
    document.getElementById("shop-category-loading").classList.remove('hidden');
    document.getElementById("failed-to-load-pplus").classList.add('hidden');
    fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/profiles-plus')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const category = template.content.cloneNode(true).children[0];

                const bannerImage = category.querySelector("[data-shop-category-banner-image]");
                bannerImage.src = user.banner;
                bannerImage.alt = user.name;

                const logoImage = category.querySelector("[data-shop-category-logo-image]");
                logoImage.src = user.logo;
                logoImage.alt = user.name;
            
                const summary = category.querySelector("[data-shop-category-desc]");
                summary.textContent = user.summary;

                if (user.summary_black === "true") {
                    category.querySelector(".shop-category-text-holder").style.color = 'black';
                }

                document.getElementById("shop-category-loading").classList.add('hidden');
                output.append(category);
            });
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("failed-to-load-pplus").classList.remove('hidden');
            document.getElementById("shop-category-loading").classList.add('hidden');
        });
}
