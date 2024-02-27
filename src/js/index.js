import { createApi } from "unsplash-js";

const main = document.querySelector("#main");
const unsplash = createApi({
  accessKey: "nzFQzuv0f9jWK6bWKrRoWdwwy-YQM2bG_MNubhH_l_U",
});

const createGalleryFromFavorites = (favourites) => {
  // favourites is an array containing the favorite photos
  const getUrls = favourites.map((i) => {
    return `<div class="gallery-item" data-title="${i.title}"><img src="${i.urls.small}"/><p class="heart">&#10084;</p></div>`;
  });
  main.innerHTML = getUrls.join("");

  // Add event listeners to the hearts in the gallery items for favorites
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    const heart = item.querySelector(".heart");
    heart.addEventListener("click", (e) => {
      e.preventDefault();
      addToFavourites(favourites, index); // Pass all the image details to the favorites section
    });
  });
};

const addToFavourites = (photo) => {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites.push(photo);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  // console.log(favourites);
  // console.log("added to favourites");
  // console.log(photo);
};

const createGallery = (filterValue) => {
  console.log(filterValue);
  if (filterValue == "Favourites") {
    // Create gallery using the favourites array
    createGalleryFromFavorites(JSON.parse(localStorage.getItem("favourites")));
  } else {
    unsplash.search
      .getPhotos({
        query: filterValue,
        page: 2,
        perPage: 16,
        orientation: "portrait",
      })
      .then((result) => {
        if (result.type === "success") {
          const photos = result.response.results;
          console.log(photos);
          const getUrls = photos.map((i) => {
            return `<div class="gallery-item" data-title="${i.description}" data-description="${i.alt_description}" data-author="${i.user.username}"><img src="${i.urls.small}"/></><p class="heart">&#10084;</p></div>`;
          });
          main.innerHTML = getUrls.join("");

          // Add event listeners to the heart
          const hearts = document.querySelectorAll(".heart");
          hearts.forEach((heart, index) => {
            heart.addEventListener("click", (e) => {
              e.preventDefault();
              addToFavourites(photos[index]);
            });
          });

          // Add event listeners to the gallery items
          const galleryItems = document.querySelectorAll(".gallery-item");
          galleryItems.forEach((item) => {
            item.addEventListener("click", (e) => {
              e.preventDefault();
              let title = item.getAttribute("data-title");
              if (title == "null") {
                title = "No title Available";
              }
              const description = item.getAttribute("data-description");
              const author = item.getAttribute("data-author");

              console.log("clicked");
              const imageDetails = document.querySelector(".imageDetails");
              imageDetails.style.display = "flex";
              imageDetails.innerHTML = `
            <img src="${e.target.src}" alt="" />
            <p class="imageHeart">&#10084;</p>
            <p class="title">${title}</p>
            <p class="description">${description}</p>
            <p class="category">${filterValue}</p>
            <p class="author">${author}</p>
            <p class="close">X</p>
          `;

              const close = document.querySelector(".close");
              close.addEventListener("click", (e) => {
                imageDetails.style.display = "none";

                console.log("clicked");
              });
            });
          });
        }
      });
  }
};

createGallery("Featured");

let filter = document.getElementsByClassName("filter");
Array.from(filter).forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    let filterValue = e.target.innerText;
    createGallery(filterValue);
  });
});