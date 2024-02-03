const API_URL =
  "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e1b95e98188d5482a8ea3a04d67e3b84&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=e1b95e98188d5482a8ea3a04d67e3b84&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = search.value;

  if (query && query !== "") {
    getMovies(SEARCH_API + query);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const card = document.createElement("div");

    card.classList.add("movie");

    card.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

    main.appendChild(card);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const darkModeIcon = document.getElementById("dark-mode");
  const lightModeIcon = document.getElementById("light-mode");
  const body = document.body;

  darkModeIcon.addEventListener("click", () => {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  });

  lightModeIcon.addEventListener("click", () => {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  });
});
