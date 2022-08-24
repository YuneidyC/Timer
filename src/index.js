let timerSeconds = document.getElementById('seconds');
let timerMinutes = document.getElementById('minutes');
const timerButton = document.getElementById('timer-button');
const hero = document.getElementById('principal');
let secondsValue = 0;
let minutesValue = 0;
let currentInterval;
let currentButton;
document.getElementById('timer-button').addEventListener('click', timer);
document.getElementById('chronometer-button').addEventListener('click', mainInner);

function mainInner() {
    resetStopwatch();
    clearInterval(currentInterval);
    document.getElementById('chronometer-button').disabled = true;
    document.getElementById('timer-button').disabled = false;
    document.getElementsByClassName('hero--title')[0].innerHTML = 'Chronometer';

    const divButton = document.getElementsByClassName('hero--buttons')[0];
    const form = document.getElementsByClassName('form--timer')[0];
    const div = document.getElementsByClassName('pomodoro--container')[0];

    const input = document.getElementsByClassName('input');
    removeChildren(input);

    form.remove();
    div.remove();

    const buttonStart = document.getElementsByClassName('hero--button');
    removeChildren(buttonStart);

    const start = createChild(divButton, 'button', 'button', 'Start', 'button', 'hero--button');
    start.addEventListener('click', startChronometer);

    const stop = createChild(divButton, 'button', 'button', 'Stop', 'button', 'hero--button');
    stop.addEventListener('click', stopChronometer);

    const reset = createChild(divButton, 'button', 'button', 'Reset', 'button', 'hero--button');
    reset.addEventListener('click', resetChronometer);
}

function resetStopwatch() {
    secondsValue = 0;
    minutesValue = 0;
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';
}

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

    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';

    currentButton.disabled = false;
}

//TIMER 
function startTimer() {
    event.preventDefault();
    currentButton = event.target;
    currentButton.disabled = true;
    let minutes = parseInt(document.getElementsByTagName('input')[0].value);;
    let seconds = parseInt(document.getElementsByTagName('input')[1].value);;

    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
    secondsValue = seconds;
    minutesValue = minutes;

    currentInterval = setInterval(() => {
        secondsValue -= 1;
        if(secondsValue === -1) {
            secondsValue = 59;
            minutesValue -= 1;
        }

        if(minutesValue === 0 && secondsValue === 0) {
            const container = document.getElementsByClassName('hero--time')[0];
            const title = document.createElement('h2');
            title.textContent = `Time's up!`;
            container.appendChild(title);
            clearInterval(currentInterval);
        }
        
        timerMinutes.textContent = formatValue(minutesValue);
        timerSeconds.textContent = formatValue(secondsValue);
    }, 1000);
}

function timer() {
    stopChronometer();
    resetStopwatch();
    document.getElementById('chronometer-button').disabled = false;
    document.getElementsByClassName('hero--title')[0].innerHTML = 'Timer';
    document.getElementById('timer-button').disabled = true;

    const divButton = document.getElementsByClassName('hero--buttons')[0];

    const button = document.getElementsByClassName('hero--button');
    removeChildren(button);

    const form = document.createElement('form');
    form.classList.add('form--timer');
    divButton.appendChild(form);
    form.onsubmit = function() {startTimer()};

    createChild(form, 'input', 'number', 'Insert minutes', 'inputMinutes');
    createChild(form, 'input', 'number', 'Insert seconds', 'inputSeconds');

    const start = createChild(form, 'button', 'button', 'Start', 'button', 'hero--button');
    start.addEventListener('click', startTimer);

    const stop = createChild(form, 'button', 'button', 'Stop', 'button', 'hero--button');
    stop.addEventListener('click', stopChronometer);

    const reset = createChild(form, 'button', 'button', 'Reset', 'button', 'hero--button');
    reset.addEventListener('click', resetChronometer);

    const div = document.createElement('div');
    div.classList.add('pomodoro--container');
    divButton.appendChild(div);

    const pomodoro = createChild(div, 'button', 'button', 'Pomodoro', 'button', 'pomodoro');
    pomodoro.addEventListener('click', () => {
        document.getElementsByClassName('inputMinutes')[0].value = 5;
        document.getElementsByClassName('inputSeconds')[0].value = 0;
    });

    timerMinutes = document.getElementById('minutes');
    timerSeconds = document.getElementById('seconds');
}

function removeChildren(params) {
    for (let i = params.length - 1; i >= 0; i--) {
        const element = params[i];
        element.parentNode.removeChild(element);
    }
}

function createChild(parent, elementType, type, title, className, className2 = null) {
    const element = document.createElement(elementType);
    parent.appendChild(element);
    element.type = type;
    addClassName(element, className, className2);
    if(type === 'button') {
        addTextContent(element, title);
        return element;
    } else {
        addPlaceholder(element, title);
    }
}

function addClassName(element, className, className2) {
    element.classList.add(className);
    if(className2 != null) {
        element.classList.add(className2);
    }
}

function addTextContent(element, textContent) {
    element.textContent = textContent;
}

function addPlaceholder(element, placeholder) {
    element.placeholder = placeholder;
}


