function openDevModal() {
    document.getElementById("dev-modal-housing").classList.remove('hidden');
}

function closeLostModal() {
    document.getElementById("dev-modal-housing").classList.add('hidden');
}



if (localStorage.dev == "true") {
    const dev_tool_button = document.querySelector("#open-dev-tools-button");
    dev_tool_button.style.display = 'block';
}



if (localStorage.not_found_found == "true") {
    document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
}

if (localStorage.not_found_found != "true") {
    document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
}



function secret404ButtonHide() {
    localStorage.not_found_found = "false"
    console.log('hide 404 button')
    document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
}

function secret404ButtonShow() {
    localStorage.not_found_found = "true"
    console.log('show 404 button')
    document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.remove('refresh-button-selected');
}





if (localStorage.unreleased_profiles_plus == "true") {
    document.getElementById("2024-09_profiles_plus-1").classList.add('refresh-button-selected');
}

if (localStorage.unreleased_profiles_plus != "true") {
    document.getElementById("2024-09_profiles_plus-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_profiles_plus-2").classList.add('refresh-button-selected');
}


function unreleasedProfilesPlusItemsFalse() {
    localStorage.unreleased_profiles_plus = "false"
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

// Display local storage items on page load
window.onload = displayLocalStorage;