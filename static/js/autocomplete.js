const searchBar = document.getElementById("search-bar");
const ac_list = document.getElementById("autocomplete-list");

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
        ac_list.innerHTML = ""; // hide suggestions after clicking
      });

      ac_list.appendChild(li);
    }
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  }
});
