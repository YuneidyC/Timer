let timerSeconds = document.getElementById('seconds');
let timerMinutes = document.getElementById('minutes');
const timerButton = document.getElementById('timer-button');
const hero = document.getElementById('principal');
let secondsValue = 0;
let minutesValue = 0;
let currentInterval;
let currentButton;
document.getElementById('timer-button').addEventListener("click", startTimer);

function startChronometer() {
    currentButton = event.target;
    currentButton.disabled = true;
    currentInterval = setInterval(() => {
        secondsValue += 1;
        if(secondsValue === 60) {
            secondsValue = 0;
            minutesValue += 1;
            timerMinutes.textContent = formatValue(minutesValue);
        }
        timerSeconds.textContent = formatValue(secondsValue);
    }, 10);
}

function formatValue(value) {
    return ("0" + value).slice(-2);
}

function stopChronometer() {
    if(currentButton) {
        currentButton.disabled = false;
    }
    clearInterval(currentInterval);
}

function resetChronometer() {
    minutesValue = 0;
    secondsValue = 0;

    timerMinutes.textContent = "00";
    timerSeconds.textContent = "00";

    currentButton.disabled = false;
}

