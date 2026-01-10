const searchBar = document.getElementById("search-bar");
const ac_list = document.getElementById("autocomplete-list");

searchBar.addEventListener("input", async () => {
  try {
    const response = await fetch(`/api/pokemon?q=${searchBar.value}`);
    const data = await response.json();

    for (let name of data) {
      const li = document.createElement("li");
      li.className = "autocomplete-item";
      li.textContent = name;
      ac_list.appendChild(li);
    }
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
  }
});
