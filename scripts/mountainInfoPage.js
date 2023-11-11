"use strict"

const dropdownMountain = document.getElementById("dropdownMountain")

window.onload = () =>{
    addMountainNameToDropdown();
}

//  display all mountain name inside Select Mountain dropdown 
const addMountainNameToDropdown = () =>{
    mountainsArray.forEach((mountain) =>{
        const li = document.createElement("li");
        li.classList = "dropdown-item selectedMountain";
        li.textContent = mountain.name;
        dropdownMountain.appendChild(li)

    })
}