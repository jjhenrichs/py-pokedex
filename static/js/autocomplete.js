const searchBar = document.getElementById("search-bar");
const ac_list = document.getElementById("autocomplete-list");

searchBar.addEventListener("input", async () => {
  console.log(searchBar.value);

  try {
    const response = await fetch(`/api/pokemon?q=${searchBar.value}`);
    const data = await response.json();

    console.log(data, "<---------");

    for (let name of data) {
      console.log(name);
    }
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  }
});
