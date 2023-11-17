# ParkExplorer

Discover the wonders of US national parks and conquer 48 iconic mountains with Park Explorer. This website provides in-depth details on each park and peak, seamlessly integrating Google Maps API for an immersive experience. Plan your adventures effortlessly, exploring America's stunning landscapes and conquering challenging summits

***
# Website Images

### Home Page
![Home Page](/images/githubImage1.png)

![Home Page](/images/githubImage2.png)

***
### National Park Page
![National Park Page](/images/githubImage3.png)
***
### Moutain Info Page
![Moutain Info Page](/images/githubImage4.png)
***

# Interesting Piece of Code

The filterFunction displays a dropdown by setting its style to "block" and dynamically filters options based on user input. It iterates through anchor elements, comparing their text content with the input. Matching options are displayed, while non-matching ones are hidden, creating a responsive search experience in the dropdown.

const filterFunction = () => {
    addDropdown.style.display = "block";

    const anchorTags = addDropdown.getElementsByTagName("a");
    for (let i in anchorTags) {
    let txtValue = a[i].textContent;
    if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
        a[i].style.display = "";
    } else {
        a[i].style.display = "none";
    }
    }
};
