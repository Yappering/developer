if (localStorage.full_client_rework === "true") {

    const params = new URLSearchParams(window.location.search);

    function setParams(params) {
        const url = new URL(window.location);
    
        // Clear all existing query parameters
        url.search = '';
    
        // Set the new query parameters from the provided object
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    
        // Update the address bar without reloading the page
        history.replaceState(null, '', url);
    }
    
    // Function to clear the shop data
    function clearShopData() {
        const output = document.querySelector("[data-shop-output]");
        output.innerHTML = ''; // Clears the content of the shop category
        createShopCategoryLoadingElement()
    }
    
    // Function to fetch and display shop data
    function fetchData() {
        if (params.get("page") != "home") {
            createMainShopElement()
            createShopCategoryLoadingElement()
        
            // Clear the previous data
            clearShopData();
        
            // Fetch new data
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    data.forEach(api_category => {
                        const category_template = document.querySelector("[data-shop-category-template]");
                        const category_output = document.querySelector("[data-shop-output]");
            
                        const category = category_template.content.cloneNode(true).children[0];
    
                        if (params.get("page") === "shop") {
                            const banner = category.querySelector("[data-shop-category-banner]");
                            banner.id = api_category.sku_id;
                
                            const bannerImage = category.querySelector("[data-shop-category-banner-image]");
                            bannerImage.src = 'https://cdn.discordapp.com/app-assets/1096190356233670716/' + api_category.banner + '.png?size=4096';
                            bannerImage.alt = api_category.name;
                
                            const logoImage = category.querySelector("[data-shop-category-logo-image]");
                            logoImage.src = 'https://cdn.discordapp.com/app-assets/1096190356233670716/' + api_category.logo + '.png?size=4096';
                            logoImage.alt = api_category.name;
                
                            const summary = category.querySelector("[data-shop-category-desc]");
                            summary.textContent = api_category.summary;
                        }
    
                        if (params.get("page") === "pplus") {
                            const banner = category.querySelector("[data-shop-category-banner]");
                            banner.id = api_category.sku_id;
                
                            const bannerImage = category.querySelector("[data-shop-category-banner-image]");
                            bannerImage.src = api_category.banner;
                            bannerImage.alt = api_category.name;
                
                            const logoImage = category.querySelector("[data-shop-category-logo-image]");
                            logoImage.src = api_category.logo;
                            logoImage.alt = api_category.name;
                
                            const summary = category.querySelector("[data-shop-category-desc]");
                            summary.textContent = api_category.summary;
                        }
        
                        // Append the category to the output section
                        document.getElementById("shop-category-loading-container").innerHTML = ``;
                        category_output.append(category);
                    });
                })
                .catch(error => {
                    console.error('Error fetching the API:', error);
                    document.getElementById("everything-housing-container").innerHTML = `
                        <div style="text-align: center; margin-top: 10px;" id="failed-to-load-shop">
                            <img style="width: 200px;" src="https://raw.githubusercontent.com/DTACat/Collectibles/main/Images/shopuhoh.png">
                            <h2>Well, this is awkward.</h2>
                            <p>Hmmm, we weren&#8217;t able to load the shop. Check back later.</p>
                            <p>${error}</p>
                            <button class="refresh-button" onclick="location.reload();">Reload</button>
                        </div>
                    `;
                    document.getElementById("shop-category-loading-container").innerHTML = ``;
                });
        } else {
                
            apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/home-page-preview';
            
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    const template = document.querySelector("[data-shop-category-template]");
                    const output = document.querySelector("[data-shop-output]");
            
                    const category = template.content.cloneNode(true).children[0];
            
                    const bannerImage = category.querySelector("[data-shop-category-banner-image]");
                    bannerImage.src = user.hero_banner;
                    bannerImage.alt = user.name;
            
                    const logoImage = category.querySelector("[data-shop-category-logo-image]");
                    logoImage.src = user.hero_logo;
                    logoImage.alt = user.name;
            
                    const summary = category.querySelector("[data-shop-category-desc]");
                    summary.textContent = user.summary;
            
                    const previewCategoryButton = category.querySelector("[data-preview-new-categoey-button]");
            
                    const newCategoryName = user.name;
            
                    previewCategoryButton.innerHTML = `
                        <button class="home-page-preview-button" onclick="location.href='/shop';">Shop the ${newCategoryName} Collection</button>
                    `;
            
                    output.append(category);
                });
            })
            .catch(error => {
                console.error('Error fetching the API:', error);
            });
            
            
            apiUrlplus = 'https://raw.githubusercontent.com/Yappering/api/main/v1/home-page-p-plus';
            
            fetch(apiUrlplus)
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    const template = document.querySelector("[data-shop-category-template-plus]");
                    const output = document.querySelector("[data-shop-output-plus]");
            
                    const category = template.content.cloneNode(true).children[0];
            
                    const oneImage = category.querySelector("[data-shop-preview-image-plus]");
                    oneImage.src = user.src;
                    oneImage.alt = user.name;
            
                    output.append(category);
                });
            
            })
            .catch(error => {
                console.error('Error fetching the API:', error);
            });
        }
    }
    
    // Function to copy the emoji to clipboard
    function copyEmoji(emoji) {
        navigator.clipboard.writeText(emoji).then(() => {
            alert('Emoji copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy emoji:', err);
        });
    }
    
    // Redirect to Google if emojiCopy is null
    function redirectToGoogle() {
        window.location.href = 'https://discord.gg/Mcwh7hGcWb';
    }
    
    // Initial data fetch when the page loads
    window.onload = fetchData;

    const clickable_side_tabs_container = document.getElementById('clickable-side-tabs-container');
    if (clickable_side_tabs_container) {  // Check if element exists
        document.getElementById('clickable-side-tabs-container').innerHTML = `
        <p class="center-text" style="font-size: 12px; display: flex;">Discord is a registered trademark of Discord Inc. Shop Archives is not affiliated with, endorsed or sponsored by Discord Inc.</p>
        <div>
            <button class="dm-button" id="home-tab" onclick="setParams({page: 'home'}); location.reload();">
                <p class="dm-button-text">Home</p>
            </button>
            <button class="dm-button" id="shop-tab" onclick="setParams({page: 'shop'}); location.reload();">
                <p class="dm-button-text">Shop</p>
            </button>
            <button class="dm-button" id="potions-tab" onclick="setParams({page: 'consumables'}); location.reload();">
                <p class="dm-button-text">Consumables</p>
            </button>
            <button class="dm-button" id="miscellaneous-tab" onclick="setParams({page: 'miscellaneous'}); location.reload();">
                <p class="dm-button-text">Miscellaneous</p>
            </button>
            <button class="dm-button" id="pplus-tab" onclick="setParams({page: 'pplus'}); location.reload();">
                <p class="dm-button-text">Profiles Plus</p>
            </button>
        </div>
        <div class="dm-divider">Shop</div>
        <div>
            <button class="dm-button" id="leaks-tab" onclick="setParams({page: 'leaks'}); location.reload();">
                <p class="dm-button-text">Leaks</p>
            </button>
            <button class="dm-button" id="avatar-decorations-debug-tab" onclick="setParams({page: 'item_tool'}); location.reload();">
                <p class="dm-button-text">Item Debug</p>
            </button>
            <button class="dm-button" id="shop-assets-tab" onclick="setParams({page: 'shop_assets'}); location.reload();">
                <p class="dm-button-text">Shop Assets</p>
            </button>
            <button class="dm-button" id="published-listings-tab" onclick="setParams({page: 'published_listings'}); location.reload();">
                <p class="dm-button-text">Published Listings</p>
            </button>
            <button class="dm-button" onclick="location.href='https://old.yapper.shop/';">
                <p class="dm-button-text">Old UI</p>
            </button>
        </div>
        `;
    }

    function pageCheck() {
        if (params.get("page") === "home") {
            document.title = "Home | Shop Archives";
            createHomePageElement()
            document.getElementById("home-tab").classList.add('dm-button-selected');
        } else if (params.get("page") === "shop") {
            document.title = "Shop | Shop Archives";
            if (localStorage.items_in_shop_yes == "true") {
                apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v2/collectibles-in-shop';
            } else {
                apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v2/collectibles';
            }
            createMainShopElement()
            document.getElementById("shop-tab").classList.add('dm-button-selected');
            document.getElementById("top-bar-container").innerHTML = `
                <h2 style="margin-left: 260px; margin-top: 10px;">Shop</h2>
                <div id="open-help-modals-buttons-holder"></div>
            `;
        } else if (params.get("page") === "pplus") {
            document.title = "Profiles Plus | Shop Archives";
            if (localStorage.unreleased_profiles_plus == "true") {
                apiUrl = 'https://raw.githubusercontent.com/Yappering/private-api/refs/heads/main/v2/profiles-plus-u';
            } else {
                apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/profiles-plus';
            }
            createMainShopElement()
            document.getElementById("pplus-tab").classList.add('dm-button-selected');
            document.getElementById("top-bar-container").innerHTML = `
                <h2 style="margin-left: 260px; margin-top: 10px;">Profiles Plus</h2>
                <div id="open-help-modals-buttons-holder"></div>
            `;
        } else {
            setParams({page: 'home',err: '404'});
            document.title = "Home | Shop Archives";
            location.reload();
        }

        const open_help_modals_buttons_holder = document.getElementById('open-help-modals-buttons-holder');
    open_help_modals_buttons_holder.innerHTML = `
        <svg title="Help" x="0" y="0" onclick="openLostModal()" id="open-lost-tools-button" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path></svg>
        <svg title="Dev Tools" x="0" y="0" onclick="openDevModal()" style="display: none;" id="open-dev-tools-button" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2 20.59V19.4a1 1 0 0 1 .3-.7l2.4-2.42a1 1 0 0 1 .71-.29H6l9-9-.85-.85a1 1 0 0 1-.23-.34l-1.49-3.73a.5.5 0 0 1 .65-.65l3.73 1.5a1 1 0 0 1 .34.22l.64.64a1 1 0 0 1 1.42 0l1 1a1 1 0 0 1 0 1.42l1.58 1.58a1 1 0 0 1 0 1.42l-1.58 1.58a1 1 0 0 1-1.42 0L17 9l-9 9v.59a1 1 0 0 1-.3.7l-2.4 2.42a1 1 0 0 1-.71.29H3.4a1 1 0 0 1-.7-.3l-.42-.4a1 1 0 0 1-.29-.71Z" class=""></path><path fill="currentColor" d="M8.23 10.23c.2.2.51.2.7 0l1.3-1.3a.5.5 0 0 0 0-.7L6.5 4.5l.3-.3a1 1 0 0 0 0-1.4l-.5-.5c-.2-.2-.45-.3-.7-.22-.43.14-1.17.49-2.1 1.42a5.37 5.37 0 0 0-1.42 2.1c-.08.25.03.5.21.7l.5.5a1 1 0 0 0 1.42 0l.29-.3 3.73 3.73ZM13.77 15.06a.5.5 0 0 0 0 .7l1.73 1.74 1.44 2.4a1 1 0 0 0 .15.19l1.73 1.73c.1.1.26.1.36 0l2.64-2.64c.1-.1.1-.26 0-.36L20.1 17.1a1 1 0 0 0-.2-.15L17.5 15.5l-1.73-1.73a.5.5 0 0 0-.7 0l-1.3 1.3Z" class=""></path></svg>
        <svg title="Options" x="0" y="0" onclick="openOptionsModal()" id="open-options-tools-button" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.4483 8.3333H18.3333V11.6667H16.4492C16.2483 12.4425 15.9167 13.165 15.4708 13.8033L16.6667 15 15 16.6667 13.8042 15.47C13.1642 15.9158 12.4433 16.2483 11.6667 16.4483V18.3333H8.3333V16.4483C7.5575 16.2483 6.8358 15.9158 6.1967 15.47L5 16.6667 3.3333 15 4.53 13.8033C4.0842 13.1658 3.7517 12.4433 3.5517 11.6667H1.6667V8.3333H3.5517C3.7517 7.5567 4.0833 6.835 4.53 6.1967L3.3333 5 5 3.3333 6.1967 4.53C6.835 4.0833 7.5567 3.7517 8.3333 3.5517V1.6667H11.6667V3.5508C12.4433 3.7517 13.1642 4.0833 13.8042 4.5292L15 3.3325 16.6667 4.9992 15.47 6.1967C15.9158 6.835 16.2483 7.5575 16.4483 8.3333ZM10 13.3333C11.8409 13.3333 13.3333 11.8409 13.3333 10 13.3333 8.159 11.8409 6.6667 10 6.6667 8.159 6.6667 6.6667 8.159 6.6667 10 6.6667 11.8409 8.159 13.3333 10 13.3333Z")></path></svg>
        <svg title="Downloads" x="0" y="0" onclick="openDownloadsModal()" id="open-downloads-button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3837 15.2952V20.7776H3.61379V15.2952H0.390625V22.3892C0.390625 23.2787 1.11115 24 2.00461 24H21.9929C22.8855 24 23.6068 23.2795 23.6068 22.3892V15.2952H20.3837Z" fill="white"/><path d="M11.7028 14.7516L7.08818 9.17553C7.08818 9.17553 6.38607 8.51264 7.14742 8.51264C7.90878 8.51264 9.74773 8.51264 9.74773 8.51264C9.74773 8.51264 9.74773 8.06672 9.74773 7.37901C9.74773 5.41837 9.74773 1.85016 9.74773 0.39549C9.74773 0.39549 9.64445 0 10.2401 0C10.8405 0 13.4705 0 13.9004 0C14.3295 0 14.3199 0.333044 14.3199 0.333044C14.3199 1.74368 14.3199 5.43519 14.3199 7.33178C14.3199 7.94663 14.3199 8.34532 14.3199 8.34532C14.3199 8.34532 15.7946 8.34532 16.72 8.34532C17.6439 8.34532 16.9482 9.03943 16.9482 9.03943C16.9482 9.03943 13.0221 14.2513 12.4745 14.7981C12.0806 15.1943 11.7028 14.7516 11.7028 14.7516Z" fill="white"/></svg>
    `;
    if (localStorage.dev == "true") {
        const dev_tool_button = document.querySelector("#open-dev-tools-button");
        dev_tool_button.style.display = 'block';
    }
    }

    pageCheck();



    function createHomePageElement() {
        document.getElementById("everything-housing-container").innerHTML = `
            <div id="home-page-warning-container">
            </div>
            <template data-shop-category-template>
                <div>
                    <div>
                        <div id="home-page-preview-banner-container">
                            <img class="home-page-preview-banner" src="" data-shop-category-banner-image>
                        </div>
                        <div style="margin-top: -250px; margin-bottom: 50px; position: relative; z-index: 1;">
                            <h2 style="margin-left: 20px; margin-top: -40px; position: absolute;">What's new on Discord</h2>
                            <div id="home-page-preview-logo-container">
                                <img src="" style="height: 130px;" data-shop-category-logo-image>
                            </div>
                            <div id="home-page-preview-button-container" data-preview-new-categoey-button>
                            </div>
                            <div id="home-page-preview-desc-container">
                                <p style="font-size: 18px; margin-left: 20px; margin-top: -10px;" data-shop-category-desc></p>
                            </div>
                        </div>
                        <!-- Timer Display -->
                        <div class="shop-expiry-timer" style="display: none;">
                            <p class="shop-expiry-timer-timer" id="shop-expiry-timer"></p>
                        </div>
                    </div>
                    <div class="shop-category-card-holder">
                    </div>
                </div>
            </template>
            <div data-shop-output>
            </div>
            
            <h2 style="margin-left: 60px;">What's new for Profiles Plus</h2>
            <div style="display: flex; width: 1300px; margin-left: auto; margin-right: auto;" data-shop-output-plus>
                <template data-shop-category-template-plus>
                    <div onclick="setParams({page: 'pplus'}); location.reload();" style="width: 550px; margin-left: auto; margin-right: auto; cursor: pointer;">
                        <img style="width: 550px;" src="" data-shop-preview-image-plus>
                    </div>
                </template>
            </div>
        `;
        if (params.get("err") === "404") {
            document.getElementById("home-page-warning-container").innerHTML = `
                <div class="shop-warning" style="position: absolute; z-index: 10; width: 200px; left: 53%;">
                    <p class="shop-notice-text">Error: 404 Page Not Found</p>
                </div>
            `;
        }
    }


    function createMainShopElement() {
        document.getElementById("everything-housing-container").innerHTML = `
            <div class="shop-container" style="overflow-y: auto;">
                <div class="shop-category" style="margin-top: 50px;">
                    <div class="shop-notice">
                        <p class="shop-notice-text">Notice: All 'collectibles' on this page have been made by Discord NOT by our team</p>
                    </div>
                    <template data-shop-category-template>
                        <div>
                            <div class="shop-category-banner" data-shop-category-banner>
                                <div class="discordLogo_be5025"><svg class="discordIcon_be5025" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.35.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z" class=""></path></svg><svg class="discordWordmark_be5025" aria-hidden="true" role="img" width="55" height="16" viewBox="0 0 55 16"><g fill="currentColor"><path d="M3 4.78717H6.89554C7.83025 4.78717 8.62749 4.93379 9.27812 5.22703C9.92875 5.52027 10.4144 5.92348 10.7352 6.44582C11.0559 6.96815 11.2208 7.5638 11.2208 8.24192C11.2208 8.90171 11.0559 9.49736 10.7168 10.038C10.3778 10.5695 9.8646 11.0002 9.17732 11.3118C8.49003 11.6234 7.6378 11.7791 6.6197 11.7791H3V4.78717ZM6.57388 10.0014C7.2071 10.0014 7.69278 9.84559 8.03184 9.52485C8.3709 9.21328 8.54501 8.77343 8.54501 8.23276C8.54501 7.72875 8.38923 7.32555 8.08682 7.02314C7.78442 6.72073 7.32623 6.56495 6.71225 6.56495H5.49255V10.0014H6.57388Z"></path><path d="M17.2882 11.7709C16.7475 11.6335 16.2618 11.4319 15.8311 11.1569V9.4983C16.161 9.75489 16.5917 9.95649 17.1416 10.1214C17.6914 10.2864 18.2229 10.3689 18.7361 10.3689C18.9743 10.3689 19.1576 10.3414 19.2767 10.2772C19.3959 10.2131 19.46 10.1398 19.46 10.0481C19.46 9.94733 19.4233 9.86485 19.3592 9.80071C19.2951 9.73656 19.1668 9.68158 18.9743 9.62659L17.7739 9.36084C17.0866 9.20506 16.6009 8.97596 16.3077 8.70105C16.0144 8.42613 15.877 8.05042 15.877 7.59223C15.877 7.20735 16.0053 6.86829 16.2527 6.58421C16.5093 6.30013 16.8667 6.0802 17.334 5.92442C17.8014 5.76863 18.342 5.68616 18.9743 5.68616C19.5333 5.68616 20.0465 5.74114 20.5138 5.86944C20.9812 5.98857 21.3661 6.14435 21.6685 6.32763V7.89464C21.3569 7.71136 20.9904 7.56474 20.5871 7.45477C20.1748 7.34481 19.7533 7.28982 19.3226 7.28982C18.6994 7.28982 18.3878 7.39979 18.3878 7.61056C18.3878 7.71136 18.4337 7.78467 18.5345 7.83966C18.6353 7.89464 18.8094 7.94046 19.066 7.99544L20.0648 8.17871C20.7155 8.28868 21.2011 8.49028 21.5219 8.77436C21.8426 9.05844 21.9984 9.47081 21.9984 10.0298C21.9984 10.6346 21.7326 11.1203 21.2011 11.4685C20.6696 11.8259 19.9182 12 18.9468 12C18.3787 11.9817 17.8289 11.9084 17.2882 11.7709Z"></path><path d="M24.4735 11.5602C23.9054 11.2761 23.4655 10.9004 23.1814 10.4239C22.8882 9.94733 22.7507 9.40666 22.7507 8.80185C22.7507 8.20621 22.8974 7.66554 23.1998 7.19819C23.5022 6.72167 23.942 6.35512 24.5194 6.0802C25.0967 5.81445 25.7931 5.677 26.5995 5.677C27.5984 5.677 28.4231 5.88776 29.0829 6.3093V8.1329C28.8538 7.97712 28.5789 7.83965 28.2673 7.74802C27.9558 7.64721 27.6259 7.6014 27.2777 7.6014C26.6545 7.6014 26.178 7.71137 25.8206 7.94046C25.4724 8.16956 25.2983 8.46279 25.2983 8.82934C25.2983 9.18673 25.4632 9.47998 25.8115 9.70907C26.1505 9.93817 26.6453 10.0573 27.2868 10.0573C27.6167 10.0573 27.9466 10.0115 28.2673 9.91067C28.5881 9.80987 28.8722 9.69991 29.1013 9.55329V11.3219C28.3681 11.7618 27.5159 11.9817 26.5537 11.9817C25.7381 11.9817 25.0509 11.8351 24.4735 11.5602Z"></path><path d="M31.6955 11.5602C31.1182 11.2761 30.6783 10.9004 30.3759 10.4147C30.0735 9.929 29.9177 9.38834 29.9177 8.78353C29.9177 8.18788 30.0735 7.64722 30.3759 7.17986C30.6783 6.71251 31.1182 6.34595 31.6863 6.0802C32.2545 5.81445 32.9418 5.677 33.7299 5.677C34.518 5.677 35.2053 5.80529 35.7743 6.0802C36.3425 6.34595 36.7824 6.71251 37.0848 7.17986C37.3872 7.64722 37.5338 8.17872 37.5338 8.78353C37.5338 9.37918 37.3872 9.929 37.0848 10.4147C36.7824 10.9004 36.3517 11.2852 35.7743 11.5602C35.1961 11.8351 34.518 11.9817 33.7299 11.9817C32.951 11.9817 32.2728 11.8351 31.6955 11.5602ZM34.7287 9.79155C34.967 9.55329 35.0953 9.22339 35.0953 8.82934C35.0953 8.42614 34.9762 8.11457 34.7287 7.87632C34.4813 7.63806 34.1514 7.51892 33.7391 7.51892C33.3084 7.51892 32.9785 7.63806 32.731 7.87632C32.4928 8.11457 32.3645 8.42614 32.3645 8.82934C32.3645 9.23255 32.4836 9.55329 32.731 9.79155C32.9785 10.039 33.3084 10.1581 33.7391 10.1581C34.1514 10.1489 34.4905 10.0298 34.7287 9.79155Z"></path><path d="M43.6644 6.0435V8.19699C43.4078 8.03204 43.0779 7.94956 42.6747 7.94956C42.1432 7.94956 41.7308 8.11451 41.4467 8.43524C41.1626 8.75598 41.016 9.25999 41.016 9.93811V11.7709H38.5693V5.9427H40.9702V7.80295C41.0985 7.12482 41.3184 6.62082 41.6117 6.30008C41.9049 5.97935 42.2898 5.80524 42.7572 5.80524C43.1054 5.80524 43.4078 5.88771 43.6644 6.0435Z"></path><path d="M51.9136 4.58649V11.7801H49.4659V10.4696C49.2552 10.9645 48.9436 11.3402 48.5221 11.5968C48.1005 11.8534 47.5782 11.9817 46.9551 11.9817C46.4052 11.9817 45.9195 11.8442 45.5072 11.5785C45.0948 11.3127 44.7741 10.937 44.5542 10.4696C44.3342 9.99313 44.2242 9.46163 44.2242 8.87514C44.2151 8.26117 44.3342 7.71134 44.5816 7.22566C44.8199 6.73998 45.1681 6.36426 45.608 6.08935C46.0479 5.81444 46.5519 5.67698 47.12 5.67698C48.2838 5.67698 49.0627 6.18099 49.4659 7.19817V4.58649H51.9136ZM49.0994 9.7457C49.3468 9.50744 49.4751 9.18671 49.4751 8.80183C49.4751 8.42612 49.356 8.12371 49.1086 7.89462C48.8611 7.66552 48.5312 7.5464 48.1189 7.5464C47.7065 7.5464 47.3766 7.66553 47.1292 7.90378C46.8818 8.14204 46.7626 8.44444 46.7626 8.82932C46.7626 9.2142 46.8818 9.51661 47.1292 9.75487C47.3766 9.99313 47.6973 10.1123 48.1097 10.1123C48.5221 10.1123 48.852 9.99313 49.0994 9.7457Z"></path><path d="M13.4751 6.29095C14.1789 6.29095 14.7489 5.77778 14.7489 5.14547C14.7489 4.51317 14.1789 4 13.4751 4C12.7723 4 12.2014 4.51317 12.2014 5.14547C12.2014 5.77778 12.7723 6.29095 13.4751 6.29095Z"></path><path d="M14.7489 7.07812C13.97 7.41719 12.9986 7.42635 12.2014 7.07812V11.7792H14.7489V7.07812Z"></path></g></svg></div>
                                <img class="shop-category-banner-img" src="" data-shop-category-banner-image>
                                <div class="shop-category-logo-holder">
                                    <img class="shop-category-banner-logo" src="" id="shop-banner-logo" data-shop-category-logo-image>
                                </div>
                                <div class="shop-category-text-holder">
                                    <p style="font-size: 18px;" data-shop-category-desc></p>
                                </div>
                                <!-- Timer Display -->
                                <div class="shop-expiry-timer" style="display: none;">
                                    <p class="shop-expiry-timer-timer" id="shop-expiry-timer"></p>
                                </div>
                            </div>
                            <div class="shop-category-card-holder hidden" id="shop-category-card-holder">
                            </div>
                            <div class="shop-category-card-holder-standard hidden" id="shop-category-card-holder-standard"></div>
                            </div>
                        </div>
                    </template>
                    <div data-shop-output>
                    </div>
                    <div id="shop-category-loading-container">
                        <div class="shop-category-loading" id="shop-category-loading">
                            <div>
                                <div class="shop-category-banner-loading">
                                </div>
                                <div class="shop-category-card-holder-loading">
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="shop-category-banner-loading">
                                </div>
                                <div class="shop-category-card-holder-loading">
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                    <div class="shop-category-card-loading">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function createShopCategoryLoadingElement() {
        document.getElementById("shop-category-loading-container").innerHTML = `
            <div class="shop-category-loading" id="shop-category-loading">
                <div>
                    <div class="shop-category-banner-loading">
                    </div>
                    <div class="shop-category-card-holder-loading">
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="shop-category-banner-loading">
                    </div>
                    <div class="shop-category-card-holder-loading">
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                        <div class="shop-category-card-loading">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }



    function openLostModal() {
        const lost_modal = document.getElementById('modal-housing');
        lost_modal.innerHTML = `
        <div class="modal-housing-1" id="modal-housing-1">
            <div class="lost-modal">
                <div class="lost-modal-inner">
                    <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Help</h1>
                    Old user interface:
                    <button class="refresh-button" onclick="location.href='https://old.yapper.shop/';">Old UI</button>
                    <hr style="opacity: 0">
                    Discord Server:
                    <button class="refresh-button" onclick="location.href='https://discord.gg/Mcwh7hGcWb/';">Discord</button>
                    <hr style="opacity: 0">
                    Github:
                    <button class="refresh-button" onclick="location.href='https://github.com/Yappering/';">Github</button>
                    <hr style="opacity: 0">
                    Trella on Youtube:
                    <button class="refresh-button" onclick="location.href='https://www.youtube.com/@Trell_ie';">Youtube</button>
                    <hr style="opacity: 0">
                    DTACat on Youtube:
                    <button class="refresh-button" onclick="location.href='https://www.youtube.com/@DTACat';">Youtube</button>
                    <hr style="opacity: 0">
                    <button class="refresh-button" onclick="closeLostModal()">Close</button>
                    <hr style="opacity: 0">
                    App Version: Dev 127
                </div>
            </div>
        </div>
        `;
    }
    
    function openMobileModal() {
        const lost_modal = document.getElementById('modal-housing');
        lost_modal.innerHTML = `
        <div class="modal-housing-1" id="modal-housing-1">
            <div class="lost-modal">
                <div class="lost-modal-inner">
                    <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Looks like you're on mobile</h1>
                    <p>Would you like to use the mobile client?</p>
                    <button class="refresh-button" onclick="location.href='https://m.yapper.shop/';">Yes</button>
                    <button class="refresh-button" onclick="closeMobileModal()">No</button>
                </div>
            </div>
        </div>
    `;
    }
    
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        openMobileModal()
    }
    
    function openOptionsModal() {
        const options_modal = document.getElementById('modal-housing');
        options_modal.innerHTML = `
        <div class="modal-housing-1" id="modal-housing-1">
            <div class="lost-modal">
                <div class="lost-modal-inner">
                    <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Options</h1>
                    <div>
                        <div class="experiment-card-holder">
                            <div class="experiment-card" id="is-in-shop-box-option">
                                <p>Shop: Hide removed items</p>
                                <p class="experiment-subtext">This will hide all categories that are not currently in the shop</p>
                                <input class="options-toggle-box" onclick="inShopIsChecked();" style="cursor: pointer; scale: 2; posision: center;" id="is-in-shop-box" type="checkbox">
                            </div>
                            <div class="experiment-card">
                                <p>Shop: Hide bundles</p>
                                <p class="experiment-subtext">This will hide all bundles in the shop page</p>
                                <input class="options-toggle-box" onclick="noBundlesInShopIsChecked();" style="cursor: pointer; scale: 2; posision: center;" id="no-bundles-in-shop-box" type="checkbox">
                            </div>
                        </div>
                    </div>
                    <button class="refresh-button" onclick="closeLostModal()">Close</button>
                </div>
            </div>
        </div>
        `;
    
        if (localStorage.items_in_shop_yes == "true") {
            document.getElementById("is-in-shop-box").checked = true;
        }
    
        if (localStorage.items_in_shop_yes == "none") {
            document.getElementById("is-in-shop-box").checked = true;
        }
    
        if (localStorage.items_in_shop != "true") {
            if (localStorage.items_in_shop != "none") {
                document.getElementById("is-in-shop-box-option").style.display = 'none';
            }
        }
    
    
        if (localStorage.shop_have_no_bundles == "true") {
            document.getElementById("no-bundles-in-shop-box").checked = true;
        }
    }
    
    function inShopIsChecked() {
        if (localStorage.items_in_shop_yes != "true") {
            localStorage.items_in_shop_yes = "true"
        }
        else {
            localStorage.items_in_shop_yes = "false"
        }
        if (typeof fetchData === 'function') {
            fetchData(pageCheck());
        }
    }
    
    function noBundlesInShopIsChecked() {
        if (localStorage.shop_have_no_bundles != "true") {
            localStorage.shop_have_no_bundles = "true"
        }
        else {
            localStorage.shop_have_no_bundles = "false"
        }
        if (typeof fetchData === 'function') {
            pageCheck();
        }
    }
    
    function openDownloadsModal() {
        const downloads_modal = document.getElementById('modal-housing');
        downloads_modal.innerHTML = `
        <div class="modal-housing-1" id="modal-housing-1">
            <div class="dev-modal">
                <div class="dev-modal-inner">
                    <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Manual Downloads</h1>
                    <p style="margin-top: -50px;">Experimental</p>
                    <div>
                        <div class="experiment-card-holder">
                        <template id="downloadables-api-template">
                            <div class="item experiment-card">
                                <p class="name"></p>
                                <p class="summary experiment-subtext"></p>
                                <div class="downloadables"></div>
                            </div>
                        </template>
                        <div class="experiment-card-holder" id="downloadables-output"></div>
                    </div>
                    <button class="refresh-button" onclick="closeLostModal()">Close</button>
                </div>
            </div>
        </div>
        `;
        
        // Fetch the data from the API
        fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/downloadable-data')
            .then(response => response.json())
            .then(data => {
                // Call the function to display the data
                displayData(data);
            })
            .catch(error => {
                console.error('Error fetching the API:', error);
            });
            
            // Function to display the data in the HTML
            function displayData(data) {
            const content = document.getElementById('downloadables-output');
            const template = document.getElementById('downloadables-api-template');
            
            data.forEach(item => {
                // Clone the template
                const clone = template.content.cloneNode(true);
            
                // Fill in the name and summary
                clone.querySelector('.name').textContent = item.name;
                clone.querySelector('.summary').textContent = item.summary;
            
                // Add buttons for downloadables
                const downloadablesDiv = clone.querySelector('.downloadables');
                item.downloadables.forEach(downloadable => {
                    const button = document.createElement('button');
                    button.textContent = downloadable.name;
                    button.classList.add('card-button');
                    button.addEventListener('click', () => {
                        window.open(downloadable.url, '_blank');
                    });
                    downloadablesDiv.appendChild(button);
                });
            
                // Append the cloned template to the content
                content.appendChild(clone);
            });
        }
    
    }
    
    
    function openDevModal() {
        if (localStorage.dev == "true") {
            const dev_modal = document.getElementById('modal-housing');
            dev_modal.innerHTML = `
            <div class="modal-housing-1" id="modal-housing-1">
                <div class="dev-modal">
                    <div class="dev-modal-inner">
                        <h1 class="center-text" style="font-size: 54px; margin-top: -10px; margin-bottom: -5px;">Dev Options</h1>
                        <button class="refresh-button" onclick="closeDevModal()">Close</button>
                        <button class="refresh-button" onclick="turnOffDevMode()">Safe Mode</button>
                        <hr>
                        <div>
                            <h2>Experiments</h2>
                            <p class="experiment-subtext">Test out new features</p>
                            <div class="experiment-card-holder">
    
    
                                <div class="experiment-card">
                                    <p>Client Rework</p>
                                    <p class="experiment-subtext">2024-11_full_client_rework</p>
                                    <button class="refresh-button" onclick="fullClientRework1()" id="2024-11_full_client_rework-1">Override 1</button>
                                    <button class="refresh-button" onclick="fullClientRework0()" id="2024-11_full_client_rework-0">No Override</button>
                                    <button class="refresh-button" onclick="fullClientRework00()" id="2024-11_full_client_rework-00">Override -1</button>
                                </div>
    
    
                                <div class="experiment-card">
                                    <p>Epic Profiles Plus Category Changes</p>
                                    <p class="experiment-subtext">2024-11_epic_profiles_plus_category_changes</p>
                                    <button class="refresh-button" onclick="epicProfilesPlusCategoryChanges1()" id="2024-11_epic_profiles_plus_category_changes-1">Override 1</button>
                                    <button class="refresh-button" onclick="epicProfilesPlusCategoryChanges0()" id="2024-11_epic_profiles_plus_category_changes-0">No Override</button>
                                    <button class="refresh-button" onclick="epicProfilesPlusCategoryChanges00()" id="2024-11_epic_profiles_plus_category_changes-00">Override -1</button>
                                </div>
        
        
                                <div class="experiment-card">
                                    <p>Top Selling Item Tag</p>
                                    <p class="experiment-subtext">2024-11_top_selling_item_tag</p>
                                    <button class="refresh-button" onclick="topSellingItemTag2()" id="2024-11_top_selling_item_tag-2" title="show popular tag on all items">Override 2</button>
                                    <button class="refresh-button" onclick="topSellingItemTag1()" id="2024-11_top_selling_item_tag-1" title="show popular tag on popular items">Override 1</button>
                                    <button class="refresh-button" onclick="topSellingItemTag0()" id="2024-11_top_selling_item_tag-0">No Override</button>
                                    <button class="refresh-button" onclick="topSellingItemTag00()" id="2024-11_top_selling_item_tag-00">Override -1</button>
                                </div>
        
        
                                <div class="experiment-card">
                                    <p>Item Data Downloads</p>
                                    <p class="experiment-subtext">2024-11_item_data_downloads</p>
                                    <button class="refresh-button" onclick="itemDataDownloads2()" id="2024-11_item_data_downloads-2" title="show download button on modal and card">Override 2</button>
                                    <button class="refresh-button" onclick="itemDataDownloads1()" id="2024-11_item_data_downloads-1" title="show download button on modal">Override 1</button>
                                    <button class="refresh-button" onclick="itemDataDownloads0()" id="2024-11_item_data_downloads-0">No Override</button>
                                    <button class="refresh-button" onclick="itemDataDownloads00()" id="2024-11_item_data_downloads-00">Override -1</button>
                                </div>
        
                                
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h2>Modals</h2>
                            <div class="experiment-card-holder">
                                <div class="experiment-card">
                                    <p>Lost</p>
                                    <button class="refresh-button" onclick="openLostModal()">Open</button>
                                </div>
                                <div class="experiment-card">
                                    <p>Dev</p>
                                    <button class="refresh-button" onclick="openDevModal()">Open</button>
                                </div>
                                <div class="experiment-card">
                                    <p>Options</p>
                                    <button class="refresh-button" onclick="openOptionsModal()">Open</button>
                                </div>
                                <div class="experiment-card">
                                    <p>Downloads</p>
                                    <button class="refresh-button" onclick="openDownloadsModal()">Open</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h2>Debug</h2>
                            <p class="experiment-subtext">Overrides</p>
                            <div class="experiment-card-holder">
                                <div class="experiment-card">
                                    <p>Unreleased Profiles Plus Items</p>
                                    <p class="experiment-subtext">2024-09_profiles_plus</p>
                                    <button class="refresh-button" onclick="unreleasedProfilesPlusItemsTrue()" id="2024-09_profiles_plus-1">Override 1</button>
                                    <button class="refresh-button" onclick="unreleasedProfilesPlusItemsFalse()" id="2024-09_profiles_plus-2">No Override</button>
                                </div>
                                <div class="experiment-card">
                                    <p>Show 404 Button</p>
                                    <p class="experiment-subtext">2024-09_not_found</p>
                                    <button class="refresh-button" onclick="secret404ButtonShow()" id="2024-09_not_found-1">Override 1</button>
                                    <button class="refresh-button" onclick="secret404ButtonHide()" id="2024-09_not_found-2">No Override</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <h2>Local Storage Overrides</h2>
                            <p class="experiment-subtext">Refresh the page for changes to take effect</p>
                            <button class="refresh-button" style="opacity: 0; pointer-events: none;">Save</button>
                            <input type="text" class="dev-local-storage-input-1" id="keyInput" placeholder="Enter key">
                            <input type="text" class="dev-local-storage-input-1" id="valueInput" placeholder="Enter value">
                            <button class="refresh-button" onclick="saveToLocalStorage()">Save</button>
                            <div id="storageItems"></div>
                        </div>
                        <hr>
                        <button class="refresh-button" onclick="closeDevModal()">Close</button>
                        <button class="refresh-button" onclick="turnOffDevMode()">Safe Mode</button>
                    </div>
                </div>
            </div>
            `;
    
    
    
    
            if (localStorage.full_client_rework == "true") {
                document.getElementById("2024-11_full_client_rework-1").classList.add('refresh-button-selected');
                document.getElementById("2024-11_full_client_rework-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_full_client_rework-00").classList.remove('refresh-button-selected');
            }
            
            if (localStorage.full_client_rework != "true") {
                if (localStorage.full_client_rework != "false") {
                    document.getElementById("2024-11_full_client_rework-1").classList.remove('refresh-button-selected');
                    document.getElementById("2024-11_full_client_rework-0").classList.add('refresh-button-selected');
                    document.getElementById("2024-11_full_client_rework-00").classList.remove('refresh-button-selected');
                }
            }
        
            if (localStorage.full_client_rework == "false") {
                document.getElementById("2024-11_full_client_rework-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_full_client_rework-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_full_client_rework-00").classList.add('refresh-button-selected');
            }
    
    
    
    
    
            if (localStorage.epic_pplus_balls == "true") {
                document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.add('refresh-button-selected');
                document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
            }
            
            if (localStorage.epic_pplus_balls != "true") {
                if (localStorage.epic_pplus_balls != "false") {
                    document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
                    document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.add('refresh-button-selected');
                    document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
                }
            }
        
            if (localStorage.epic_pplus_balls == "false") {
                document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.add('refresh-button-selected');
            }
    
        
        
            if (localStorage.top_selling_item != "true") {
                if (localStorage.top_selling_item != "false") {
                    if (localStorage.top_selling_item != "two") {
                        document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
                        document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
                        document.getElementById("2024-11_top_selling_item_tag-0").classList.add('refresh-button-selected');
                        document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
                    }
                }
            }
        
            if (localStorage.top_selling_item == "two") {
                document.getElementById("2024-11_top_selling_item_tag-2").classList.add('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
            }
            
            if (localStorage.top_selling_item == "true") {
                document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-1").classList.add('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
            }
        
            if (localStorage.top_selling_item == "false") {
                document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_top_selling_item_tag-00").classList.add('refresh-button-selected');
            }
        
        
        
            if (localStorage.item_data_downloads != "true") {
                if (localStorage.item_data_downloads != "false") {
                    if (localStorage.item_data_downloads != "two") {
                        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
                        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
                        document.getElementById("2024-11_item_data_downloads-0").classList.add('refresh-button-selected');
                        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
                    }
                }
            }
        
            if (localStorage.item_data_downloads == "two") {
                document.getElementById("2024-11_item_data_downloads-2").classList.add('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
            }
            
            if (localStorage.item_data_downloads == "true") {
                document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-1").classList.add('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
            }
            
            if (localStorage.item_data_downloads == "false") {
                document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_item_data_downloads-00").classList.add('refresh-button-selected');
            }
        
        
            
            
            if (localStorage.not_found_found == "true") {
                const fourohfour = document.getElementById("404-mains-button");
            if (fourohfour) {  // Check if element exists
                if (localStorage.not_found_found == "true") {
                    document.getElementById("404-mains-button").classList.remove('hidden');
                }
            }
                document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
            }
            
            if (localStorage.not_found_found != "true") {
                document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
            }
            
            
            if (localStorage.unreleased_profiles_plus == "true") {
                document.getElementById("2024-09_profiles_plus-1").classList.add('refresh-button-selected');
            }
            
            if (localStorage.unreleased_profiles_plus != "true") {
                document.getElementById("2024-09_profiles_plus-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-09_profiles_plus-2").classList.add('refresh-button-selected');
            }
        
            displayLocalStorage();
        }else {
            console.error('403 (Forbidden)')
        }
    }
    
    
    function closeDevModal() {
        const dev_modal = document.getElementById('modal-housing');
        dev_modal.innerHTML = ``;
    }
    
    function closeMobileModal() {
        const mobile_modal = document.getElementById('modal-housing');
        mobile_modal.innerHTML = ``;
    }
    
    function closeLostModal() {
        const lost_modal = document.getElementById('modal-housing');
        lost_modal.innerHTML = ``;
    }
    
    
    
    
    const fourohfour = document.getElementById("404-mains-button");
    if (fourohfour) {  // Check if element exists
        if (localStorage.not_found_found == "true") {
            document.getElementById("404-mains-button").classList.remove('hidden');
        }
    }
    
    
    function turnOffDevMode() {
        localStorage.dev = "false"
        location.reload();
    }
    
    function dev() {
        localStorage.dev = "true"
        location.reload();
    }
    
    
    
    
    function fullClientRework0() {
        localStorage.full_client_rework = "none"
        document.getElementById("2024-11_full_client_rework-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_full_client_rework-0").classList.add('refresh-button-selected');
        document.getElementById("2024-11_full_client_rework-00").classList.remove('refresh-button-selected');
    }
    
    function fullClientRework1() {
        localStorage.full_client_rework = "true"
        document.getElementById("2024-11_full_client_rework-1").classList.add('refresh-button-selected');
        document.getElementById("2024-11_full_client_rework-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_full_client_rework-00").classList.remove('refresh-button-selected');
    }
    
    function fullClientRework00() {
        localStorage.full_client_rework = "false"
        document.getElementById("2024-11_full_client_rework-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_full_client_rework-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_full_client_rework-00").classList.add('refresh-button-selected');
    }
    
    
    
    function epicProfilesPlusCategoryChanges0() {
        localStorage.epic_pplus_balls = "none"
        document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.add('refresh-button-selected');
        document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
    }
    
    function epicProfilesPlusCategoryChanges1() {
        localStorage.epic_pplus_balls = "true"
        document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.add('refresh-button-selected');
        document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
    }
    
    function epicProfilesPlusCategoryChanges00() {
        localStorage.epic_pplus_balls = "false"
        document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.add('refresh-button-selected');
    }
    
    
    
    function topSellingItemTag2() {
        localStorage.top_selling_item = "two"
        document.getElementById("2024-11_top_selling_item_tag-2").classList.add('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
    }
    
    function topSellingItemTag1() {
        localStorage.top_selling_item = "true"
        document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-1").classList.add('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
    }
    
    function topSellingItemTag0() {
        localStorage.top_selling_item = "none"
        document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-0").classList.add('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
    }
    
    function topSellingItemTag00() {
        localStorage.top_selling_item = "false"
        document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_top_selling_item_tag-00").classList.add('refresh-button-selected');
    }
    
    
    
    
    function itemDataDownloads2() {
        localStorage.item_data_downloads = "two"
        document.getElementById("2024-11_item_data_downloads-2").classList.add('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
    }
    
    function itemDataDownloads1() {
        localStorage.item_data_downloads = "true"
        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.add('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
    }
    
    function itemDataDownloads0() {
        localStorage.item_data_downloads = "none"
        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.add('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
    }
    
    function itemDataDownloads00() {
        localStorage.item_data_downloads = "false"
        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.add('refresh-button-selected');
    }
    
    
    
    
    
    function itemDataDownloads2() {
        localStorage.item_data_downloads = "two"
        document.getElementById("2024-11_item_data_downloads-2").classList.add('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
    }
    
    function itemDataDownloads1() {
        localStorage.item_data_downloads = "true"
        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.add('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
    }
    
    function itemDataDownloads0() {
        localStorage.item_data_downloads = "none"
        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.add('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
    }
    
    function itemDataDownloads00() {
        localStorage.item_data_downloads = "false"
        document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
        document.getElementById("2024-11_item_data_downloads-00").classList.add('refresh-button-selected');
    }
    
    
    
    
    
    
    function secret404ButtonHide() {
        const fourohfour = document.getElementById("404-mains-button");
        if (fourohfour) {  // Check if element exists
            if (localStorage.not_found_found == "true") {
                document.getElementById("404-mains-button").classList.add('hidden');
            }
        }
        localStorage.not_found_found = "none"
        console.log('hide 404 button')
        document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
    }
    
    function secret404ButtonShow() {
        const fourohfour = document.getElementById("404-mains-button");
        if (fourohfour) {  // Check if element exists
            if (localStorage.not_found_found == "true") {
                document.getElementById("404-mains-button").classList.remove('hidden');
            }
        }
        localStorage.not_found_found = "true"
        console.log('show 404 button')
        document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
        document.getElementById("2024-09_not_found-2").classList.remove('refresh-button-selected');
    }
    
    
    
    function unreleasedProfilesPlusItemsFalse() {
        localStorage.unreleased_profiles_plus = "none"
        console.log('hide Unreleased Profiles Plus Items')
        document.getElementById("2024-09_profiles_plus-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-09_profiles_plus-2").classList.add('refresh-button-selected');
    }
    
    function unreleasedProfilesPlusItemsTrue() {
        localStorage.unreleased_profiles_plus = "true"
        console.log('show Unreleased Profiles Plus Items')
        document.getElementById("2024-09_profiles_plus-1").classList.add('refresh-button-selected');
        document.getElementById("2024-09_profiles_plus-2").classList.remove('refresh-button-selected');
    }
    
    
    
    
    function saveToLocalStorage() {
        // Get the values from the inputs
        const key = document.getElementById('keyInput').value;
        const value = document.getElementById('valueInput').value;
        
        // Save to local storage
        localStorage.setItem(key, value);
        
        // Refresh the display
        displayLocalStorage();
    }
        
    function displayLocalStorage() {
        // Get the container element
        const storageItems = document.getElementById('storageItems');
        
        // Clear the container
        storageItems.innerHTML = '';
        
        // Iterate over all items in local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            
            // Create a container for each item
            const itemDiv = document.createElement('div');
            
            // Create editable input fields for key and value
            const keyInput = document.createElement('input');
            keyInput.type = 'text';
            keyInput.value = key;
            keyInput.disabled = true; // Disable key editing
            keyInput.className = 'dev-local-storage-input-2';
            
            const valueInput = document.createElement('input');
            valueInput.type = 'text';
            valueInput.value = value;
            valueInput.className = 'dev-local-storage-input-3';
            
            // Save button for each item
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Update';
            saveButton.className = 'refresh-button';
            saveButton.onclick = function() {
                localStorage.setItem(key, valueInput.value);
            };
            
            // Delete button for each item
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'refresh-button';
            deleteButton.onclick = function() {
                localStorage.removeItem(key);
                displayLocalStorage(); // Refresh the display
            };
            
            // Append elements to the item div
            itemDiv.appendChild(deleteButton);
            itemDiv.appendChild(keyInput);
            itemDiv.appendChild(valueInput);
            itemDiv.appendChild(saveButton);
            
            // Append the item div to the container
            storageItems.appendChild(itemDiv);
        }
    }

}