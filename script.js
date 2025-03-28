// DOM Elements
const mainHeading = document.getElementById("main-heading");
const welcomeMessage = document.getElementById("welcome-message");
const sweetsContainer = document.getElementById("sweets-container");
const favoritesContainer = document.getElementById("favorites-container");
const addSweetBtn = document.getElementById("add-sweet-btn");
const changeThemeBtn = document.getElementById("change-theme-btn");
const changeHeadingBtn = document.getElementById("change-heading-btn");
const hidePricesBtn = document.getElementById("hide-prices-btn");
const footerText = document.getElementById("footer-text");

// Sample sweets data
const sweetsData = [
  {
    name: "Chocolate Covered Strawberries",
    price: "$3.25 each",
    image:
      "https://images.pexels.com/photos/21581343/pexels-photo-21581343/free-photo-of-box-of-chocolate-truffles.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Chocolate Covered Strawberries",
  },
  {
    name: "Hard Candy",
    price: "$1.99 each",
    image:
      "https://images.pexels.com/photos/4016512/pexels-photo-4016512.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Hard Candys",
  },
  {
    name: "Sours",
    price: "$4.50 each",
    image:
      "https://images.pexels.com/photos/4015264/pexels-photo-4015264.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Sours",
  },
  {
    name: "Chewing Gum",
    price: "$3.25 each",
    image:
      "https://i.pinimg.com/736x/d3/2d/1a/d32d1abbb31b0729b85d5c993fec2511.jpg",
    alt: "Chewing Gum",
  },
  {
    name: "Cotton Candy",
    price: "$3.25 each",
    image:
      "https://i.pinimg.com/736x/bc/35/d7/bc35d7c1679161090c38056f1412f797.jpg",
    alt: "Cotton Candy",
  },
  {
    name: "Candy Sticks",
    price: "$3.25 each",
    image:
      "https://images.pexels.com/photos/23024261/pexels-photo-23024261/free-photo-of-red-decoration-on-sticks.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Candy Sticks",
  },
  {
    name: "Marshmallows",
    price: "$3.25 each",
    image:
      "https://images.pexels.com/photos/1114429/pexels-photo-1114429.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Marshmallows",
  },
];

// Change theme function
changeThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  changeThemeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Toggle Light Mode"
    : "Toggle Dark Mode";
});

// Change heading function
changeHeadingBtn.addEventListener("click", () => {
  const newHeading = prompt(
    "Enter a new heading for the page:",
    mainHeading.textContent
  );
  if (newHeading) {
    mainHeading.textContent = newHeading;
  }
});

// Toggle prices function
hidePricesBtn.addEventListener("click", () => {
  const prices = document.querySelectorAll(".price");
  prices.forEach((price) => {
    price.style.display = price.style.display === "none" ? "block" : "none";
  });
  hidePricesBtn.textContent = hidePricesBtn.textContent.includes("Show")
    ? "Hide Prices"
    : "Show Prices";
});

// Add sweet to favorites
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("favorite-btn")) {
    const sweetItem = e.target.closest(".sweet-item");
    const sweetName = sweetItem.querySelector("h3").textContent;
    const sweetPrice = sweetItem.querySelector(".price").textContent;
    const sweetImage = sweetItem.querySelector("img").src;
    const sweetAlt = sweetItem.querySelector("img").alt;

    // Check if already in favorites
    const existingFav = Array.from(favoritesContainer.children).find(
      (item) => item.querySelector("h3").textContent === sweetName
    );

    if (!existingFav) {
      addToFavorites(sweetName, sweetPrice, sweetImage, sweetAlt);
      e.target.textContent = "Added to Favorites!";
      setTimeout(() => {
        e.target.textContent = "Add to Favorites";
      }, 2000);
    } else {
      e.target.textContent = "Already in Favorites!";
      setTimeout(() => {
        e.target.textContent = "Add to Favorites";
      }, 2000);
    }
  }

  // Remove from favorites
  if (e.target.classList.contains("remove-fav-btn")) {
    e.target.closest(".sweet-item").remove();
    updateFooterMessage();
  }
});

let sweetIndex = 0;

// Add new sweet f
addSweetBtn.addEventListener("click", () => {
  const sortedSweets = [...sweetsData].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));
    return priceA - priceB; 
  });

  if (sweetIndex < sortedSweets.length) {
    const sweet = sortedSweets[sweetIndex];

    const sweetItem = document.createElement("div");
    sweetItem.className = "sweet-item";
    sweetItem.innerHTML = `
      <img src="${sweet.image}" alt="${sweet.alt}">
      <h3>${sweet.name}</h3>
      <p class="price">${sweet.price}</p>
      <button class="favorite-btn">Add to Favorites</button>
    `;

    sweetsContainer.appendChild(sweetItem);

    sweetIndex++;
  } else {
    alert("All sweets have been added!");
  }
});


// Add to favorites helper function
function addToFavorites(name, price, image, alt) {
  const favItem = document.createElement("div");
  favItem.className = "sweet-item";
  favItem.innerHTML = `
        <img src="${image}" alt="${alt}">
        <h3>${name}</h3>
        <p class="price">${price}</p>
        <button class="remove-fav-btn">Remove from Favorites</button>
    `;
  favoritesContainer.appendChild(favItem);
  updateFooterMessage();
}

// Update footer message based on favorites count
function updateFooterMessage() {
  const favCount = favoritesContainer.children.length;
  footerText.textContent =
    favCount > 0
      ? `© 2025 Bubblegum Bliss - You have ${favCount} favorite item${
          favCount !== 1 ? "s" : ""
        }!`
      : "© 2025 Bubblegum Bliss Candy Shop";
}

// Initialize the page
welcomeMessage.textContent =
  "Welcome to our candy shop! Browse our delicious treats below.";
