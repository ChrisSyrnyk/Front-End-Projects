function createPixel(){
    let i=0;
    while(i<500){
        //create new div
        const newPixel = document.createElement("div");
        //give pixel i = i;
        //create new content
        const newContent = document.createTextNode("-");
        //add content to new div
        newPixel.appendChild(newContent);
        newPixel.setAttribute('id',i);
        //add class type pixel
        newPixel.classList.add("pixel");
        //set opacity to zero
        newPixel.style.opacity = '0';
        newPixel.addEventListener("mouseover", () => {sketch(newPixel)});
        //add new element to DOM
        const currentDiv = document.getElementById("sketchBody");
        currentDiv.appendChild(newPixel);
        //increment counter
        i++;
    }
    
}

function sketch(pixelClicked){
    pixelID = pixelClicked.id;
    pixelOpacity = pixelClicked.style.opacity;
    pixelOpacity = parseFloat(pixelOpacity);
    if (pixelOpacity <1){pixelOpacity += 0.1;}
    pixelClicked.style.opacity = pixelOpacity;
    //pixelClicked.style.backgroundColor = 'red';
    
    console.log(pixelOpacity);
}

function toggleStart(){
    startDiv = document.getElementById('startScreen');
    startDiv.style.display = "none";
}

function clearScreen(){
    let i = 0;
    while (i<500){
        pixel = document.getElementById(i);
        pixel.style.opacity = 0;
        i ++;
    }
}