const cards = document.querySelectorAll(".fest-event");
const cardsPerPage = 6; // change to 4 if needed
let currentPage = 0;

function showPage(page) {
  cards.forEach((card, index) => {
    card.classList.remove("show");
    card.style.display = "none";

    const start = page * cardsPerPage;
    const end = start + cardsPerPage;
    if (index >= start && index < end) {
      card.style.display = "block";
      setTimeout(() => card.classList.add("show"), 50); // animation trigger
    }
  });
}

function nextPage() {
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

// On load
showPage(currentPage);

const slider = document.getElementById("package-slider");
const btnLeft = document.getElementById("slide-left");
const btnRight = document.getElementById("slide-right");

const scrollAmount =
  document.querySelector(".hp-package-card").offsetWidth + 20;

btnRight.addEventListener("click", () => {
  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

btnLeft.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

// bokking form
var div = document.getElementById('bookingForm')
var display = 0;

function hideShow(){
  if(display == 1){
    div.style.display = 'block';
    display = 0;
  }
  else{
    div.style.display = 'none';
    display =1;
  }
}