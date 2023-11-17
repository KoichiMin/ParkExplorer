"use strict";

window.onload = () => {
    initMap();
    displayDropdownSearchBar(locationsArray);
    const navBarNationalPark = document.getElementById("navBarNationalPark");
    input.onkeyup = (e) =>{
        if(e.key === "Enter"){
            changeInputField(input.value);
            localStorage.setItem("state", input.value);
            window.location.href = "nationalParkPage.html";
        } else{
            filterFunction();
        }
    }

    navBarNationalPark.onclick = localStorage.removeItem("state");

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
    for (let i in a) {
    let txtValue = a[i].textContent;
    if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
        a[i].style.display = "";
    } else {
        a[i].style.display = "none";
    }
    }
};


// Initialize and add the map
let map;

async function initMap() {
  // The location that user selects in NationalPark page
    const position = { lat: Number(localStorage.getItem("latitude")), lng: Number(localStorage.getItem("longitude")) };
    
  // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at selected Park
    map = new Map(document.getElementById("map"), {
        zoom: 8,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

  // The marker, positioned at selected Park
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Uluru",
    });
}



