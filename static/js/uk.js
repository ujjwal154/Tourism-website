
  const locCards = document.getElementById("loc-cards");
  const nextBtn = document.getElementById("nextbtn");
  const prevBtn = document.getElementById("prevbtn");

  let currentIndex = 0; // starting at first slide
  const totalSlides = document.querySelectorAll('.slide').length;

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      slideTo(currentIndex);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      slideTo(currentIndex);
    }
  });

  function slideTo(index) {
    locCards.style.transform = `translateX(-${index * 100}%)`;
  }

