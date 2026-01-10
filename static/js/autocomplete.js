const searchBar = document.getElementById("search-bar");
const container = document.getElementById("autocomplete-container");

searchBar.addEventListener("input", () => {
  console.log(searchBar.value);
});
