const input = document.getElementById("search-bar");
const speakBtn = document.querySelector(".speaker");

isRunning = false;

speakBtn.addEventListener("click", () => {
  if (!isRunning) {
    console.log("Starting speech recognition");
    isRunning = true;
  } else {
    console.log("Stopping speech recognition");
    isRunning = false;
  }
});
