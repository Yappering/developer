function openDevModal() {
    document.getElementById("dev-modal-housing").classList.remove('hidden');
}

function closeLostModal() {
    document.getElementById("dev-modal-housing").classList.add('hidden');
}



if (localStorage.not_found_found == "true") {
    document.getElementById("404-mains-button").classList.remove('hidden'); 
}



function secret404ButtonHide() {
    document.getElementById("404-mains-button").classList.add('hidden');
    localStorage.not_found_found = "false"
    console.log('hide 404 button')
}

function secret404ButtonShow() {
    document.getElementById("404-mains-button").classList.remove('hidden');
    localStorage.not_found_found = "true"
    console.log('show 404 button')
}



function unreleasedProfilesPlusItemsFalse() {
    localStorage.unreleased_profiles_plus = "false"
    console.log('hide Unreleased Profiles Plus Items')
}

function unreleasedProfilesPlusItemsTrue() {
    localStorage.unreleased_profiles_plus = "true"
    console.log('show Unreleased Profiles Plus Items')
}