"use strict";

window.onload = () => {
    displayDropdownSearchBar(locationsArray);

    input.onkeyup = (e) =>{
        if(e.key === "Enter"){
            changeInputField(input.value);
            localStorage.setItem("state", input.value);
            window.location.href = "nationalParkPage.html";
        } else{
            filterFunction();
        }
    }

};

//  loop through array and create anchor tags
const createAllAnchorTags = (selectedTypeOption) => {
    selectedTypeOption.forEach((parkTypeOrLocation) => {
    createSingleAnchorTag(parkTypeOrLocation);
    });
};

// remove old anchor tags and create a dropdown for the searchBar
const displayDropdownSearchBar = (selectedTypeOption) =>{
    addDropdown.style.display = "none";
    createAllAnchorTags(selectedTypeOption);
}

// create a single anchor tag with click event listener
const createSingleAnchorTag = (parkTypeOrLocation) => {
    const a = document.createElement("a");
    a.className = "dropdown-item selectedType";
    a.textContent = parkTypeOrLocation;
    a.href = "nationalParkPage.html"
    a.onclick = (e) => {
    e.preventDefault();
    changeInputField(parkTypeOrLocation);
    localStorage.setItem("state", parkTypeOrLocation);
    window.location.href = "nationalParkPage.html";
    };
    
    addDropdown.appendChild(a);
};

// change input value once user clicks on anchor tag inside searchBar
const changeInputField = (parkTypeOrLocation) => {
    input.value = parkTypeOrLocation;
    addDropdown.style.display = "none";

};

// adjust dropdown for searchBar whenever user types in inputfield
const filterFunction = () => {
    addDropdown.style.display = "block";

    const a = addDropdown.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent;
    if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
        a[i].style.display = "";
    } else {
        a[i].style.display = "none";
    }
    }
};
