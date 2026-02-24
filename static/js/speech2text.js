const input = document.getElementById("search-bar");
const speakBtn = document.querySelector(".fa-microphone");

isRunning = false;
previous_input_value = input.value;

const recognition = new (SpeechRecognition || webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

if (!recognition) {
  console.error("Speech Recognition API is not supported in this browser.");
  speakBtn.disabled = true;
}

speakBtn.addEventListener("click", () => {
  if (!isRunning) {
    speakBtn.classList.toggle("active");
    input.value = "Listening...";
    recognition.start();
    isRunning = true;
  } else {
    // when user clicks on microphone button while it's already listening.
    recognition.stop();
    input.value = previous_input_value;
    speakBtn.classList.toggle("active");
    isRunning = false;
  }
});

// Stop listening when the user stops speaking
recognition.addEventListener("speechend", () => {
  recognition.stop();
  isRunning = false;
});

recognition.addEventListener("result", (event) => {
  let url = new URL(window.location.href);
  const pokemon_name = event.results[0][0].transcript;
  url.searchParams.set("pokemon_name", pokemon_name);
  new_url = "/search" + url.search;
  window.location.replace(new_url); // Redirect to the search results page
});
