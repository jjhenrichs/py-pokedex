const searchBar = document.getElementById("search-bar");
const ac_list = document.getElementById("autocomplete-list");
let url = new URL(window.location.href);

searchBar.addEventListener("input", async () => {
  try {
    ac_list.innerHTML = ""; // Clear previous suggestions, if any
    const response = await fetch(`/api/pokemon?q=${searchBar.value}`);
    const data = await response.json();

    for (let name of data) {
      const li = document.createElement("li");
      li.className = "autocomplete-item";
      li.textContent = name;

      li.addEventListener("click", () => {
        searchBar.value = name;

        url.searchParams.set("pokemon_name", name);
        let searchUrl = "/search" + url.search;

        console.log(`Selected Pokémon: ${searchUrl}`);
        ac_list.innerHTML = ""; // hide suggestions after clicking
        window.location.replace(searchUrl); // Redirect to the search results page
      });

      ac_list.appendChild(li);
    }
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  }
});
