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

            // Handling the logo sway effect
            if (user.logo_sway === "true") {
                category.querySelector("[data-shop-category-logo-image]").classList.add('shop-logo-sway');
            }

            const cardHolder = category.querySelector(".shop-category-card-holder");

            // Function to create a card
            function createCard(item, isBundle = false) {
                const card = document.createElement('div');
                card.classList.add('shop-category-card');

                if (item.item_type === 'deco') {
                    card.classList.add('deco-card');
                } else if (item.item_type === 'effect') {
                    card.classList.add('effect-card');
                } else if (isBundle) {
                    card.classList.add('bundle-card');
                }

                if (isBundle && item.bundled_products) {
                    const bundleDescription = `Bundle Includes: ${item.bundled_products.filter(product => product.item_type === 'deco').map(deco => deco.name).join(', ')} Decoration & ${item.bundled_products.filter(product => product.item_type === 'effect').map(effect => effect.name).join(', ')} Profile Effect`;

                    card.innerHTML = `
                        <div class="bundle-items">
                            ${item.bundled_products.map(bundledItem => `
                                <div class="bundled-item">
                                    <img src="${bundledItem.static}" data-animated="${bundledItem.animated}" alt="${bundledItem.name}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="card-bottom">
                            <h3>${item.name}</h3>
                            <p class="bundle-description">${bundleDescription}</p>
                        </div>
                    `;
                } else {
                    card.innerHTML = `
                        <img src="${item.static}" data-animated="${item.animated}" alt="${item.name}">
                        <div class="card-bottom">
                            <h3>${item.name}</h3>
                            <p>${item.summary}</p>
                        </div>
                    `;
                }

                // Add hover effect for image animation
                card.addEventListener('mouseenter', function () {
                    const img = card.querySelector('img');
                    if (img && img.hasAttribute('data-animated')) {
                        img.dataset.originalSrc = img.src; // Save original src
                        img.src = img.getAttribute('data-animated'); // Switch to animated src
                    }
                });

                card.addEventListener('mouseleave', function () {
                    const img = card.querySelector('img');
                    if (img && img.hasAttribute('data-animated') && img.dataset.originalSrc) {
                        img.src = img.dataset.originalSrc; // Restore original src
                    }
                });

                return card;
            }

            // Sort and display the products: Bundle, Decoration, Effect
            const bundleProducts = [];
            const decorationProducts = [];
            const effectProducts = [];

            user.products.forEach(product => {
                // Check if the product is a bundle
                if (product.bundled_products) {
                    // Add bundle card with bundled items
                    bundleProducts.push(product);
                } else {
                    // Handle individual items
                    product.items.forEach(item => {
                        if (item.item_type === 'deco') {
                            decorationProducts.push(item);
                        } else if (item.item_type === 'effect') {
                            effectProducts.push(item);
                        }
                    });
                }
            });

            // Append Bundle, Decoration, and Effect cards in that order
            bundleProducts.forEach(product => cardHolder.appendChild(createCard(product, true)));
            decorationProducts.forEach(item => cardHolder.appendChild(createCard(item)));
            effectProducts.forEach(item => cardHolder.appendChild(createCard(item)));

            document.getElementById("shop-category-loading").classList.add('hidden');
            output.append(category);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("failed-to-load-pplus").classList.remove('hidden');
        document.getElementById("shop-category-loading").classList.add('hidden');
    });
