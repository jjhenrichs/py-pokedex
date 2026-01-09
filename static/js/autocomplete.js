document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-bar");

  input.addEventListener("input", () => {
    console.log(input.value);
  });
});
