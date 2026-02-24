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
    console.log("Listening...");
    speakBtn.classList.toggle("active");
    input.value = "Listening...";
    recognition.start();
    isRunning = true;
  } else {
    console.log("Idle");
    speakBtn.classList.remove("active");
    input.value = previous_input_value;
    recognition.stop();
    isRunning = false;
  }
});

recognition.addEventListener("result", (event) => {
  const transcript = event.results[0][0].transcript;
  console.log("Transcript:", transcript);
  input.value = transcript;
  // previous_input_value = transcript;
});
