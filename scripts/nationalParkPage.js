"use strict"

const selectType = document.getElementById("selectType");
const addDropdown = document.getElementById("addDropdown");
const input = document.getElementById("input");
const mainTitle = document.getElementById("main-title");

const searchSelectAll = document.getElementById("searchSelectAll");
const searchPark = document.getElementById("searchPark");
const searchLocation = document.getElementById("searchLocation");
const dropdownOptions = document.querySelectorAll("dropdownOption")




window.onload = () =>{
  // find out if user wrote inside the search bar in the index page by checking "state" in localStorage
  if(localStorage.hasOwnProperty("state")){
    let stateValue = localStorage.getItem("state");
    let capitalizeFirstLetterValue = stateValue[0].toUpperCase() + stateValue.slice(1)
    displayCards(stateValue);
    mainTitle.textContent = capitalizeFirstLetterValue
  }

  // add an onclick method to the Select Type buttons 
  activateBtns()

  // filter the dropdown when user types in the inputfield
  input.onkeyup = (e) =>{
    if(e.key === "Enter"){
      const capitalizedInput =  capitalizeEveryWord(input.value);
      mainTitle.textContent = capitalizedInput
      displayCards(capitalizedInput)
      addDropdown.style.display = "none";
      input.value = "";
      
    } else{
      filterFunction();
    }
  }
}

////////////////////////////////////////////////////////////////////////////

// Search Type Buttons

////////////////////////////////////////////////////////////////////////////


const parkContainer = document.getElementById("parkContainer");
const locationContainer = document.getElementById("locationContainer");

// add an onclick function to the search type buttons 
const activateBtns = () =>{

  // Select All button
  searchSelectAll.onclick =() =>{
    displayCards("Select All");
    parkContainer.style.display = "none";
    locationContainer.style.display = "none";
    input.placeholder = "Search anything";
    input.value = "";
    displayDropdownSearchBar(locationsArray.concat(parkTypesArray, "Select All"));
    mainTitle.textContent = "List of National Parks";
  } 
  // Park Type button
  searchPark.onclick = () =>{
    parkContainer.style.display = "block";
    locationContainer.style.display = "none";
    addDropdown.style.display = "none";
    input.value = "";
    input.placeholder = "Search Parks";
    displayDropdownSearchBar(parkTypesArray);
    fillDropdownParkType();
  } 

  // Location button
  searchLocation.onclick = () =>{
    locationContainer.style.display = "block";
    parkContainer.style.display = "none";
    addDropdown.style.display = "none";
    input.placeholder = "Search Any State";
    input.value = "";
    displayDropdownSearchBar(locationsArray);
    fillDropdownLocation();
  } 
}

// fill dropdown for Location type button
const fillDropdownLocation = () =>{
  const dropdownLocation = document.getElementById("dropdownLocation")
  locationsArray.forEach((option) =>{
    const a = document.createElement("a");
    a.className = "dropdown-item selectedType";
    a.textContent = option;
    a.onclick = (e) => {
      e.preventDefault();
      changeInputField(option);
    }

    dropdownLocation.appendChild(a);
  })
} 

// fill dropdown for Park Type button
const fillDropdownParkType = () =>{
  const dropdownParkType = document.getElementById("dropdownParkType")
  parkTypesArray.forEach((option) =>{
    const a = document.createElement("a");
    a.className = "dropdown-item selectedType";
    a.textContent = option;
    a.onclick = (e) => {
      e.preventDefault();
      changeInputField(option);
    }

    dropdownParkType.appendChild(a);
  })
} 






///////////////////////////////////////////////////////////////////////////////

// SEARCH BAR FUNCTIONS

//////////////////////////////////////////////////////////////////////////////



// remove old anchor tags and create a dropdown for the searchBar
const displayDropdownSearchBar = (selectedTypeOption) =>{
    removeAnchorTags();
    createAllAnchorTags(selectedTypeOption);

}


// remove all anchor tags from addDropdown div
const removeAnchorTags = () =>{
  const anchorsToRemove = addDropdown.querySelectorAll("a.selectedType");
  
  anchorsToRemove.forEach((anchor) => {
      anchor.remove();
  });

}


//  loop through array and create anchor tags 
const createAllAnchorTags = (selectedTypeOption) =>{
  selectedTypeOption.forEach((parkTypeOrLocation) =>{
      createSingleAnchorTag(parkTypeOrLocation)
  });
}


// create a single anchor tag with click event listener
const createSingleAnchorTag = (parkTypeOrLocation) =>{
    const a = document.createElement("a");
    a.className = "dropdown-item selectedType";
    a.textContent = parkTypeOrLocation;
    a.onclick = (e) => {
      e.preventDefault();
      changeInputField(parkTypeOrLocation);
    }

    addDropdown.appendChild(a);
}


// change input value once user clicks on anchor tag inside searchBar
const changeInputField = (parkTypeOrLocation) =>{
    input.value = parkTypeOrLocation
    addDropdown.style.display = "none";
    displayCards(parkTypeOrLocation)
    input.value = "";
    mainTitle.textContent = parkTypeOrLocation
}


// adjust dropdown for searchBar whenever user types in inputfield
const  filterFunction = () => {
  addDropdown.style.display = "block";
  
  const a = addDropdown.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent ;
    if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}




////////////////////////////////////////////////////////////////////


// PARK CARDS


////////////////////////////////////////////////////////////////////





const cardContainer = document.getElementById("cardContainer");

// figure out first if its a park type or location and loop through nationalPark Array to create cards
const displayCards = (parkTypeOrLocation) =>{
    
  // remove old anchor tags 
      removeDiv()
    

  // if parameter is inside the park type array
  let modifyParkTypeOrLocation = capitalizeEveryWord(parkTypeOrLocation);
    if( parkTypesArray.includes(parkTypeOrLocation)){
      nationalParksArray.forEach((element) =>{
        if(element.LocationName.includes(modifyParkTypeOrLocation)){
          createCard(element)
        }
      })
    } 

    // if parameter is inside location array 
    else if(locationsArray.includes(modifyParkTypeOrLocation)){
      nationalParksArray.forEach((element) =>{
        if(element.State === modifyParkTypeOrLocation){
          createCard(element)
        }
      })
    }

    // if parameter is Select All or word not inside both arrays  
    else{
      mainTitle.textContent = "List of National Parks";
      nationalParksArray.forEach((element) =>{
        createCard(element)
      })
    }


  }


  // modify first letter of every word
  function capitalizeEveryWord(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  


// create a single anchor tag
const createCard = (locationObject) =>{

    const container = document.createElement("div");
    container.classList = "card container mb-3 p-0 singleCard";
    container.onclick = () =>{
      localStorage.setItem("longitude", locationObject.Longitude);
      localStorage.setItem("latitude", locationObject.Latitude);
      window.location.href = "index.html";
    }

    const cardHeader = document.createElement("div");
    cardHeader.classList = "card-header";
    cardHeader.innerText = locationObject.LocationID.toUpperCase();
    container.appendChild(cardHeader)


    const cardBody = document.createElement("div");
    cardBody.classList = "card-body row";


    const cardTitle = document.createElement("h5");
    cardTitle.innerText = locationObject.LocationName;
    cardBody.appendChild(cardTitle);


    const cardText = document.createElement("card-text");
    cardText.innerText = `${locationObject.Address}, ${locationObject.City}, ${locationObject.State}`;
    cardBody.appendChild(cardText);

    // if object has a website 
    if("Visit" in locationObject){
      const anchorBtn = document.createElement("a");
      anchorBtn.classList = "btn btn-secondary col-3";
      anchorBtn.textContent = "Visit";
      anchorBtn.href = locationObject.Visit;
      anchorBtn.target = "_blank";
      cardBody.appendChild(anchorBtn);
    }

    container.appendChild(cardBody);
    cardContainer.appendChild(container);
}


// remove all anchor tags
const removeDiv = () => {
  let numberOfCards = cardContainer.childElementCount;
  if(numberOfCards > 0){
    const anchorsToRemove = cardContainer.querySelectorAll(".singleCard")
    anchorsToRemove.forEach((anchor) => {
      anchor.remove();
  });
}
}