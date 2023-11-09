"use strict"

const selectType = document.getElementById("selectType");
const addDropdown = document.getElementById("addDropdown");
const input = document.getElementById("input");
// find out what user selected between Park or Location
let selectedTypeOption = [];

window.onload = () =>{
  selectType.onclick = (e) =>{
    e.preventDefault();
    selectedTypeOption = [];
    changeBtnText();

  }

  input.onkeyup = filterFunction;
  
}

///////////////////////////////////////////////////////////////////////////////

// SEARCH BAR FUNCTIONS

//////////////////////////////////////////////////////////////////////////////

// adjust text inside the select type button
const changeBtnText = () =>{
  const dropdownType = document.querySelectorAll(".selectedType");
  dropdownType.forEach(function(item) {
    item.addEventListener("click", () => {
        selectType.textContent = item.textContent;
        if(item.textContent === "Location"){
          // user selected Location as type
          addDropdown.style.display = "none";
          selectedTypeOption = locationsArray;
          displayDropdownSearchBar(locationsArray);
        } else{
          // user selected Park as type
          addDropdown.style.display = "none";
          selectedTypeOption = parkTypesArray;
          displayDropdownSearchBar(parkTypesArray);
        }
      });
    });
    
  }
  
  // remove old anchor tags and create a dropdown for the searchBar
  const displayDropdownSearchBar = (selectedTypeOption) =>{
    
    removeAnchorTags();
    createAllAnchorTags(selectedTypeOption);

    console.log(selectedTypeOption)

}

// remove all a tags from addDropdown div
const removeAnchorTags = () =>{
  const anchorsToRemove = addDropdown.querySelectorAll("a.selectedType");
  anchorsToRemove.forEach((anchor) => {
      anchor.remove();
  });

}

//  creates all the anchor tags --> anchor click event listener 
const createAllAnchorTags = (selectedTypeOption) =>{
  selectedTypeOption.forEach((parkTypeOrLocation) =>{
    const a = document.createElement("a");
    a.className = "dropdown-item selectedType";
    a.textContent = parkTypeOrLocation;
    a.onclick = (e) => {
      e.preventDefault();
      changeInputField(parkTypeOrLocation);
    }
    addDropdown.appendChild(a);
  });
}

// change input value once user clicks on anchor tag inside searchBar
const changeInputField = (parkTypeOrLocation) =>{
    input.value = parkTypeOrLocation
    addDropdown.style.display = "none";
    displayCards(parkTypeOrLocation)
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





// figure out first if its a park type or location and loop through nationalPark Array to create cards
const displayCards = (parkTypeOrLocation) =>{
    console.log("it went here")
    const cardContainer = document.getElementById("cardContainer");
    const numberOfCards = cardContainer.childElementCount;
    console.log(numberOfCards)
    if(numberOfCards > 0){
      console.log("went to delete")
      removeDiv()
    }
  
    if( parkTypesArray.includes(parkTypeOrLocation)){
      console.log("it went inside if statement")
      nationalParksArray.forEach((element) =>{
        if(element.LocationName.includes(parkTypeOrLocation)){
          console.log("it went in forEach")
          createCard(element)
        }
      })
    } else{
      console.log("it went inside if statement")
      nationalParksArray.forEach((element) =>{
        if(element.State === parkTypeOrLocation){
          console.log("it went in forEach")
          createCard(element)
        }
      })
    }
}


const cardContainer = document.getElementById("cardContainer");
const createCard = (locationObject) =>{
    const container = document.createElement("div");
    container.classList = "card container p-0 singleCard";

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

    if("Visit" in locationObject){
      const anchorBtn = document.createElement("a");
      anchorBtn.classList = "btn btn-primary col-2";
      anchorBtn.textContent = "Visit";
      anchorBtn.href = locationObject.Visit;
      cardBody.appendChild(anchorBtn);
    }

    container.appendChild(cardBody);
    cardContainer.appendChild(container);
}


const removeDiv = () => {
    const anchorsToRemove = cardContainer.querySelectorAll(".singleCard")
    console.log(anchorsToRemove)
    anchorsToRemove.forEach((anchor) => {
      anchor.remove();
  });

}