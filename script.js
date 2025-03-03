const minuteSpan = document.querySelector(".minute");
const secondsSpan = document.querySelector(".seconds");
const startBtn = document.querySelector(".Start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const sessionStatus = document.getElementById("session-status");

let timeLeft = 1 * 60;
let timer;
let isRunning = false;
let sessionCount = 0;
let isBreak = false;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  minuteSpan.textContent = String(minutes).padStart(2, "0");
  secondsSpan.textContent = String(seconds).padStart(2, "0");

  sessionStatus.textContent = isBreak ? "Break" : "Focus Session";
}

updateDisplay();

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        handleSessionEnd();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
}

function handleSessionEnd() {
  if (!isBreak) {
    sessionCount++;
    isBreak = true;
    if (sessionCount % 4 === 0) {
      timeLeft = 15 * 60;
      alert("Time for a long break! 15 minutes");
    } else {
      timeLeft = 5 * 60;
      alert("Time for a short break! 5 minutes");
    }
  } else {
    isBreak = false;
    timeLeft = 25 * 60;
    alert("Break over! Time to focus");
  }
  updateDisplay();
  startTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
