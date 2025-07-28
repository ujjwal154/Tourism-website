for (let i = 0; i < 200; i++) {
  let drop = document.createElement("div");
  drop.classList.add("raindrop");

  // Set horizontal position
  drop.style.left = Math.random() * window.innerWidth + "px";

  // Add animation delay for randomness
  drop.style.animationDelay = Math.random() * 2 + "s";

  // Optional: vary raindrop height
  drop.style.height = 20 + Math.random() * 20 + "px";

  // Append to #main instead of body so it's inside layout
  document.getElementById("main").appendChild(drop);
}


