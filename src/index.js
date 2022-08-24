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
document.getElementById('alarm-button').addEventListener('click', clearScreenAlarm);

function mainInner() {
    resetStopwatch();
    clearInterval(currentInterval);
    document.getElementById('chronometer-button').disabled = true;
    document.getElementById('timer-button').disabled = false;
    document.getElementsByClassName('hero--title')[0].innerHTML = 'Chronometer';

    const divButton = document.getElementsByClassName('hero--buttons')[0];

    removeChilds(divButton);

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

    removeChilds(divButton);

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

const removeChilds = (parent) => {
    while(parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

// Alarm
function clearScreenAlarm() {
    document.getElementsByClassName('hero--title')[0].innerHTML = 'Alarm';
    const divButton = document.getElementsByClassName('hero--buttons')[0];
    const time = document.getElementsByClassName('hero--time')[0];
    removeChilds(time);
    removeChilds(divButton);
    createContainerAlarm(divButton);

    // Make sure that it's updated before the first interval tick
    updateClockHandles();

    setInterval(updateClockHandles, 1000);
}

function createContainerAlarm(container) {
    const clock = document.createElement('div');
    clock.classList.add('clock');
    container.appendChild(clock);

    const outerClock = document.createElement('div');
    outerClock.classList.add('outer-clock-face');
    clock.appendChild(outerClock);

    const markingOne = document.createElement('div');
    markingOne.classList.add('marking', 'marking--one');
    outerClock.appendChild(markingOne);

    const makingTwo = document.createElement('div');
    makingTwo.classList.add('marking', 'marking-two');
    outerClock.appendChild(makingTwo);

    const markingThree = document.createElement('div');
    markingThree.classList.add('marking', 'marking-three');
    outerClock.appendChild(markingThree);

    const markingFour = document.createElement('div');
    markingFour.classList.add('marking', 'marking-four');
    outerClock.appendChild(markingFour);

    const innerClock = document.createElement('div');
    innerClock.classList.add('inner-clock');
    outerClock.appendChild(innerClock);

    const hourHand = document.createElement('div');
    hourHand.classList.add('hand', 'hour-hand');
    innerClock.appendChild(hourHand);

    const minuteHand = document.createElement('div');
    minuteHand.classList.add('hand', 'minute-hand');
    innerClock.appendChild(minuteHand);

    const secondsHand = document.createElement('div');
    secondsHand.classList.add('hand', 'second-hand');
    innerClock.appendChild(secondsHand);

}

function tranformHandles(seconds, minutes, hour) {
    const hourHand = document.getElementsByClassName('hour-hand')[0];
    const minHand = document.getElementsByClassName('minute-hand')[0];
    const secondHand = document.getElementsByClassName('second-hand')[0];

    secondHand.style.transform = `rotate(${getDegreesFromTime(seconds, 60)}deg)`;
    minHand.style.transform = `rotate(${getDegreesFromTime(minutes, 60)}deg)`;
    hourHand.style.transform = `rotate(${getDegreesFromTime(hour, 12)}deg)`;
}

function updateClockHandles() {
    const now = new Date();
    tranformHandles(now.getSeconds(), now.getMinutes(), now.getHours());
}

function getDegreesFromTime(value, range) {
    // Simple rule of three
    return (value / range) * 360 + 90;
}

