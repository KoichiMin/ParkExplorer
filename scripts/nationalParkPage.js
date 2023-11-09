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
  
}

// adjust text inside the select type button
const changeBtnText = () =>{
  const dropdownItems = document.querySelectorAll(".selectedType");
  dropdownItems.forEach(function(item) {
    item.addEventListener("click", function() {
        selectType.textContent = item.textContent;
        if(item.textContent === "Location"){
          
          addDropdown.style.display = "none";
          selectedTypeOption = locationsArray;
          displayDropdownSearchBar(locationsArray)
        } else{
          addDropdown.style.display = "none";
          selectedTypeOption = parkTypesArray;
          displayDropdownSearchBar(parkTypesArray)
        }
      });
    });
    
  }
  
  // create a dropdown for the searchBar
  const displayDropdownSearchBar = (selectedTypeOption) =>{
    
    const anchorsToRemove = addDropdown.querySelectorAll("a.selectedType");

    // remove all a tags from addDropdown div
    anchorsToRemove.forEach((anchor) => {
        anchor.remove();
    });

    selectedTypeOption.forEach((parkType) =>{
      const a = document.createElement("a");
      a.className = "dropdown-item selectedType";
      a.textContent = parkType;
      a.onclick = (e) => {
        e.preventDefault();
        changeInputField(parkType);
      }
      // a.style.display = "none"
      addDropdown.appendChild(a);
    });
    
    console.log(selectedTypeOption)
    // addDropdown.appendChild(ul);

}

// change input value once user clicks on anchor tag inside searchBar
const changeInputField = (parkType) =>{
    input.value = parkType
    addDropdown.style.display = "none";
}



// adjust dropdown for searchBar whenever user types in inputfield
const  filterFunction = (e) => {
  // console.log(e)
  addDropdown.style.display = "block";
  
  const filter = input.value.toUpperCase();
  const div = document.getElementById("addDropdown");
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent ;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
  // if(e.key === "Enter"){
  //   addDropdown.style.display = "none";
  // }
}

