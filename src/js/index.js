// The following code starts Mock Service Worker tool which allows you to simulate a backend (an API) for building your apps that talk to a remote service. You can visit https://mswjs.io for details on this utility and check src/api/routes.js for a sample API route that you can edit/create as needed to simulate a real world API. This simulated backend will not be part of the completed application (built edition) and you must use a real world backend built using Node.js + Express or Java + Spring Boot to provide such a service.

// If you do not require a simulated backend, you can remove the code shown below.

// const apiStatus = document.querySelector("#api-status");

// if (import.meta.env.DEV) {
//   import("../api/browser")
//     .then(({ worker }) => worker.start())
//     .then(() => fetch("/"))
//     .then((res) => res.json())
//     .then((res) => (apiStatus.innerText = res.message));
// }

const API_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = "9eUvuW14SeKzJLwV5qB7LLIOg50rsc5cZaeIcX7ZGf8";

// Function to render data in cards

const renderData = (images) => {
  const grid = document.querySelector(".grid");

  images.forEach((image) => {
    const container = document.createElement("div");
    const imageElement = document.createElement("img");

    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = image.title;

    const body = document.createElement("p");
    body.textContent = image.body;

    imageElement.src = image?.urls?.regular;
    // imageElement.alt = image.alt_description || "";
    // imageElement.description = image.description || "";

    container.append(imageElement);
    grid.append(container);

    card.appendChild(title);
    card.appendChild(body);
    container.appendChild(card);
  });
};

//fetch data
const fetchData = async () => {
  const res = await fetch(
    `${API_URL}/photos/?client_id=${UNSPLASH_ACCESS_KEY}&per_page=30`
  );
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  console.log(data);

  const images = data.map((image) => image?.urls?.regular);
  console.log(images);
  renderData(images);
};
fetchData();

document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("home");
  const modernArtLink = document.getElementById("modern-art");
  const classicsLink = document.getElementById("classics");
  const sculpturesLink = document.getElementById("sculptures");
  const cubismLink = document.getElementById("cubism");
  const abstractArtLink = document.getElementById("abstract-art");
  const favouritesLink = document.getElementById("favourites");

  homeLink.addEventListener("click", showHome);
  modernArtLink.addEventListener("click", showModernArt);
  classicsLink.addEventListener("click", showClassics);
  sculpturesLink.addEventListener("click", showSculptures);
  cubismLink.addEventListener("click", showCubism);
  abstractArtLink.addEventListener("click", showAbstractArt);
  favouritesLink.addEventListener("click", showFavourites);

  function showHome(e) {
    e.preventDefault();
    grid.innerHTML =
      "<h2>Welcome to Artify!</h2><p>Explore our collection of art.</p>";
  }

  function showModernArt(e) {
    e.preventDefault();
    fetchArtworks("modern-art").then((artworks) => displayArtworks(artworks));
  }

  function showClassics(e) {
    e.preventDefault();
    fetchArtworks("classics").then((artworks) => displayArtworks(artworks));
  }

  function showSculptures(e) {
    e.preventDefault();
    fetchArtworks("sculptures").then((artworks) => displayArtworks(artworks));
  }

  function showCubism(e) {
    e.preventDefault();
    fetchArtworks("cubism").then((artworks) => displayArtworks(artworks));
  }

  function showAbstractArt(e) {
    e.preventDefault();
    fetchArtworks("abstract-art").then((artworks) => displayArtworks(artworks));
  }

  async function showFavourites(e) {
    e.preventDefault();
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (favourites.length === 0) {
      grid.innerHTML = "<h2>No favourites yet.</h2>";
    } else {
      const favArtworks = favourites.map((id) => getArtworkById(id));
      displayArtworks(await Promise.all(favArtworks));
    }
  }

  function fetchArtworks(category) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const artworks = [
          { title: "Painting 1", artist: "Artist 1", imageUrl: "image1.jpg" },
          { title: "Painting 2", artist: "Artist 2", imageUrl: "image2.jpg" },
          // Add more artworks here
        ];
        resolve(artworks);
      }, 1000);
    });
  }

  function displayArtworks(artworks) {
    let html = "";
    artworks.forEach((artwork) => {
      html += `<div class="artwork">
                        <img src="${artwork.imageUrl}" alt="${artwork.title}">
                        <p>${artwork.title} by ${artwork.artist}</p>
                    </div>`;
    });
    grid.innerHTML = html;
  }
});
