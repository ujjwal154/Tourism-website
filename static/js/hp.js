const bgImages = [
  "static/images/hp_img/bg-1.jpg",
  "static/images/hp_img/bg-2.jpg",
  "static/images/hp_img/bg-3.jpg",
  "static/images/hp_img/bg-4.jpg",
];

let currentIndex = 0;
const mainP = document.getElementById("top");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");

function updateBackground() {
  // Fade out
  mainP.style.opacity = 0;

  // After fade-out, change image and fade back in
  setTimeout(() => {
    mainP.style.backgroundImage = `url('${bgImages[currentIndex]}')`;
    mainP.style.opacity = 1;
  }, 1000); // delay should match half of transition duration
}

// Next / Back controls
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % bgImages.length;
  updateBackground();
});

backBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + bgImages.length) % bgImages.length;
  updateBackground();
});

// Auto-change every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % bgImages.length;
  updateBackground();
}, 5000);

// Set initial image
updateBackground();


// const bottomContent = document.getElementById("bottom-content");
// const nextBttn = document.getElementById("nextBttn");
// const prevBttn = document.getElementById("prevBttn");

// const slides = document.querySelectorAll(".slide");
// let currentSlide = 0;
// const totalSlides = slides.length;

// // Optional: Set bottom-content width dynamicallyz
// bottomContent.style.width = `${totalSlides * 100}%`;

// function updateSlide(index) {
//   bottomContent.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
// }

// nextBttn.addEventListener("click", () => {
//   currentSlide = (currentSlide + 1) % totalSlides;
//   updateSlide(currentSlide);
// });

// prevBttn.addEventListener("click", () => {
//   currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//   updateSlide(currentSlide);
// });

// setInterval(() => {
//   currentSlide = (currentSlide + 1) % totalSlides;
//   updateSlide(currentSlide);
// }, 5000);