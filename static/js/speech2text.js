const input = document.getElementById("search-bar");
const speakBtn = document.querySelector(".fa-microphone");

isRunning = false;
previous_input_value = input.value;

speakBtn.addEventListener("click", () => {
  if (!isRunning) {
    console.log("Starting speech recognition");
    speakBtn.classList.toggle("active");
    input.value = "Listening...";
    isRunning = true;
  } else {
    console.log("Stopping speech recognition");
    speakBtn.classList.remove("active");
    input.value = previous_input_value;
    isRunning = false;
  }
});
