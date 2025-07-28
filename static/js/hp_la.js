let currentIndex = 0;

function slide(direction){
    const slider = document.getElementById('slider');
    const images = slider.querySelectorAll('img');
    const total = images.length;

    currentIndex += direction

    //wrap around
    if(currentIndex < 0) currentIndex = total - 1;
    if(currentIndex >= total) currentIndex = 0;

    slider.style.transform = `translate(-${currentIndex * 100}%)`;
}


// treking slider
function trslide(direction){
    const slider = document.getElementById('tr-slider');
    const images = slider.querySelectorAll('img');
    const total = images.length;

    currentIndex += direction

    //wrap around
    if(currentIndex < 0) currentIndex = total - 1;
    if(currentIndex >= total) currentIndex = 0;

    slider.style.transform = `translate(-${currentIndex * 100}%)`;
}

//capping slider
function cpslide(direction){
    const slider = document.getElementById('cp-slider');
    const images = slider.querySelectorAll('img');
    const total = images.length;

    currentIndex += direction

    //wrap around
    if(currentIndex < 0) currentIndex = total - 1;
    if(currentIndex >= total) currentIndex = 0;

    slider.style.transform = `translate(-${currentIndex * 100}%)`;
}


//package slider
const track = document.getElementById("package-slide");
const cards = document.querySelectorAll(".package-card");
const cardWidth = cards[0].offsetWidth + 20; // card + left/right margin (20px each side)

function pkslide(direction) {
    const totalCards = cards.length;

    currentIndex += direction;

    // Clamp so we don't overflow
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalCards - 1) currentIndex = totalCards - 1;

    const moveX = currentIndex * cardWidth;
    track.style.transform = `translateX(-${moveX}px)`;
}


