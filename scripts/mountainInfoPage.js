"use strict"

const dropdownMountain = document.getElementById("dropdownMountain")

window.onload = () =>{
    addMountainNameToDropdown();
    displayRandomMountain();
}

//  display all mountain name inside Select Mountain dropdown 
const addMountainNameToDropdown = () =>{
    mountainsArray.forEach((mountain) =>{
        const a = document.createElement("a");
        a.className = "dropdown-item selectedMountain";
        a.textContent = mountain.name;
        a.onclick = (e) =>{
            selectedMountain(mountain);
        } 
        dropdownMountain.appendChild(a)

    })
}


// display random mountain when page loads
const displayRandomMountain = () =>{
    const randomMountain = mountainsArray[Math.round(Math.random() * (48 - 1) + 1)];
    selectedMountain(randomMountain);
}

//  fetch sunrise and sunset info 
const getSunsetForMountain = async (lat, lng) =>{
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
    
}

// update the mountain info container to the selected mountain 
const selectedMountain = async (mountain) =>{
    const mountainName = document.getElementById("mountainName");
    const mountainImage = document.getElementById("mountainImage");
    const mountainDescription = document.getElementById("mountainDescription");
    const mountainElevation = document.getElementById("mountainElevation");
    const mountainEffort = document.getElementById("mountainEffort");
    const sunrise = document.getElementById("sunriseTime");
    const sunset = document.getElementById("sunsetTime");


    mountainName.innerText = mountain.name;
    mountainImage.src = "images/" + mountain.img;
    mountainDescription.textContent = mountain.desc;
    mountainElevation.textContent = mountain.elevation;
    mountainEffort.textContent = mountain.effort
    await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then((data) =>{
        // console.log(data.results.sunrise)
        sunrise.innerText = data.results.sunrise;
        sunset.innerText = data.results.sunset;

    })
}


