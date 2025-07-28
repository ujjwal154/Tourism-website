
const destinations = [
    "Manali", "Shimla", "Dalhousie", "Dharamshala", "Kullu",
    "Nainital", "Mussoorie", "Rishikesh", "Haridwar",
    "Kedarnath", "Badrinath", "Auli"
];

const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultsList = document.getElementById("search-results");

// Show input and button on icon click
searchIcon.addEventListener("click", () => {
    searchInput.style.display = "block";
    searchBtn.style.display = "block";
    searchInput.focus();
});

// Auto-suggestions
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    resultsList.innerHTML = "";
    if (!query) {
        resultsList.style.display = "none";
        return;
    }

    const filtered = destinations.filter(dest =>
        dest.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
        resultsList.style.display = "block";
        filtered.forEach(dest => {
            const li = document.createElement("li");
            li.textContent = dest;
            li.addEventListener("click", () => {
                searchInput.value = dest;
                resultsList.style.display = "none";
            });
            resultsList.appendChild(li);
        });
    } else {
        resultsList.style.display = "block";
        resultsList.innerHTML = "<li>No destination found</li>";
    }
});


// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-container").contains(e.target)) {
        resultsList.style.display = "none";
    }
});



const menuBars = document.getElementById('menu-bars');
const navList = document.getElementById('nav-links');

menuBars.addEventListener('click', () => {
    navList.classList.toggle('active');
});