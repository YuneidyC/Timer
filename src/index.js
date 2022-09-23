let timerSeconds = document.getElementById('seconds');
let timerMinutes = document.getElementById('minutes');
const timerButton = document.getElementById('timer-button');
const hero = document.getElementById('principal');

let secondsValue = 0;
let minutesValue = 0;
let currentInterval;
let currentButton;
document.getElementById('timer-button').addEventListener('click', createTimer);
document.getElementById('chronometer-button').addEventListener('click', mainInner);
document.getElementById('alarm-button').addEventListener('click', clearScreenAlarm);

function mainInner() {
    resetStopwatch();
    clearInterval(currentInterval);

    document.getElementsByClassName('hero--title')[0].innerHTML = 'Chronometer';

    changeDisable('Chronometer');

    if (document.getElementsByClassName('clock')[0]) {
        removeClock();
        removeInputsClock();
    }

    if (document.getElementsByClassName('hero--buttons')[0]) {
        const divButton = document.getElementsByClassName('hero--buttons')[0];
        removeChilds(divButton);
    }

    createContainerChronometerTimer(document.getElementsByClassName('hero--title')[0].innerHTML);
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
        if (secondsValue === 60) {
            secondsValue = 0;
            minutesValue += 1;
            timerMinutes.textContent = formatValue(minutesValue);
        }
        timerSeconds.textContent = formatValue(secondsValue);
    }, 10);
}

function formatValue(value) {
    return ('0' + value).slice(-2);
}

function stopChronometer() {
    if (currentButton) {
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
const startTimer = function startTimer() {
    event.preventDefault();
    currentButton = event.target;
    currentButton.disabled = true;
    let minutes = parseInt(document.getElementsByTagName('input')[0].value);

    // HERE
    if (minutes.length === "") {
        minutes.getElementsByClassName('input-minutes').innerHTML = "* 60m";
    }

    let seconds = parseInt(document.getElementsByTagName('input')[1].value);

    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
    secondsValue = seconds;
    minutesValue = minutes;

    currentInterval = setInterval(() => {
        secondsValue -= 1;
        if (secondsValue === -1) {
            secondsValue = 59;
            minutesValue -= 1;
        }

        if (minutesValue === 0 && secondsValue === 0) {
            const container = document.getElementsByClassName('hero--time')[0];
            const title = document.createElement('h2');
            title.textContent = `Time's up!`;
            container.appendChild(title);
            clearInterval(currentInterval);
        }

        timerMinutes.textContent = formatValue(minutesValue);
        timerSeconds.textContent = formatValue(secondsValue);
    }, 1000);
};

function createTimer() {
    stopChronometer();
    resetStopwatch();
    clearInterval();

    document.getElementsByClassName('hero--title')[0].innerHTML = 'Timer';

    changeDisable('Timer');

    createContainerChronometerTimer(document.getElementsByClassName('hero--title')[0].innerHTML);

    createPomodoroButton(document.getElementsByClassName('hero--container')[0]);
}

function createButton(parent, elementType, className, className2, type, title, chronometerOrTimer = null) {
    const button = createChild(parent, elementType, className, className2, type, title);
    button.addEventListener('click', chronometerOrTimer);
}

function createChild(parent, elementType, className, className2 = null, type = null, title = null) {
    const element = document.createElement(elementType);
    parent.appendChild(element);
    addClassName(element, className, className2);

    if (title === null) {
        return element;
    }

    if (elementType === 'div') {
        addInnerHTML(element, title);
    }

    if (elementType === 'button') {
        element.type = type;
        addTextContent(element, title);
        return element;
    }

    if (elementType === 'input') {
        element.type = type;
        addPlaceholder(element, title);
    }
}

function addClassName(element, className, className2) {
    element.classList.add(className);
    if (className2 != null) {
        element.classList.add(className2);
    }
}

function addTextContent(element, textContent) {
    element.textContent = textContent;
}

function addPlaceholder(element, placeholder) {
    element.placeholder = placeholder;
}

function addInnerHTML(element, inner) {
    element.innerHTML = inner;
}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

// Alarm
function clearScreenAlarm() {

    document.getElementsByClassName('hero--title')[0].innerHTML = 'Alarm';

    changeDisable('Alarm');

    if (document.getElementsByClassName('hero--input')[0]) {
        removeChilds(document.getElementsByClassName('hero--input')[0]);
        document.getElementsByClassName('hero--input')[0].remove();
    }

    if (document.getElementsByClassName('pomodoro--container')[0]) {
        removeChilds(document.getElementsByClassName('pomodoro--container')[0]);
        document.getElementsByClassName('pomodoro--container')[0].remove();
    }

    if (document.getElementsByClassName('hero--buttons')[0]) {
        removeChilds(document.getElementsByClassName('hero--buttons')[0]);
        document.getElementsByClassName('hero--buttons')[0].remove();
    }

    if (document.getElementsByClassName('hero--time')[0]) {
        removeChilds(document.getElementsByClassName('hero--time')[0]);
        document.getElementsByClassName('hero--time')[0].remove();
    }

    createContainerAlarm(document.getElementsByClassName('hero--container')[0]);

    // Make sure that it's updated before the first interval tick
    updateClockHandles();

    setInterval(updateClockHandles, 1000);
}

function createInput(parent, elementType, className, className2, type, title) {
    return createChild(parent, elementType, className, className2, type, title);
}

function createContainerAlarm(container) {

    const clock = document.createElement('div');
    clock.classList.add('clock');
    container.appendChild(clock);

    const outerClock = createChild(clock, 'div', 'outer-clock-face');
    const innerClock = createChild(outerClock, 'div', 'inner-clock');

    createChild(innerClock, 'div', 'hand', 'hour-hand');
    createChild(innerClock, 'div', 'hand', 'minute-hand');
    createChild(innerClock, 'div', 'hand', 'second-hand');
    createChild(innerClock, 'div', 'hand', 'alarm-hand');
    createChild(innerClock, 'div', 'hand', 'middle');

    const alarmHand = document.getElementsByClassName('alarm-hand')[0];

    {
        const numbersName = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

        let i = 0;

        // Create clock numbers
        while (i <= numbersName.length - 1) {
            createChild(innerClock, 'div', 'hours', numbersName[i], null, i + 1);
            i++;
        }
    }

    createChild(container, 'div', 'input-container');
    const inputContainer = document.getElementsByClassName('input-container')[0];

    createInput(inputContainer, 'input', 'input', 'input-hour', 'number', 'Insert hour');
    document.getElementsByClassName('input-hour')[0].min = 1;
    document.getElementsByClassName('input-hour')[0].max = 24;

    createChild(document.getElementsByClassName('input-container')[0], 'div', 'message', 'message-hour');

    createInput(inputContainer, 'input', 'input', 'input-minutes', 'number', 'Insert minutes');
    document.getElementsByClassName('input-minutes')[0].min = 1;
    document.getElementsByClassName('input-minutes')[0].max = 60;

    createChild(document.getElementsByClassName('input-container')[0], 'div', 'message', 'message-minutes');

    const saveButton = createChild(inputContainer, 'button', 'button', 'alarm-button', 'button', 'Save');
    saveButton.addEventListener('click', function () {
        scheduleAlarm(getAlarmTime(alarmHand));
    });
}

function scheduleAlarm(hourMinutes) {
    const alarmDate = new Date();
    alarmDate.setHours(hourMinutes[0]);
    alarmDate.setMinutes(hourMinutes[1]);
    alarmDate.setSeconds(00);

    const dateNow = Date.now();

    let alarm = alarmDate.getTime() - dateNow;

    if (alarm < 0) {
        // If the alarm time is in the past today, schedule it for tomorrow
        alarm += 86400000;
    }

    setTimeout(executeAlarm, alarm);
}

function executeAlarm() {
    const music = new Audio('../alarm.wav')
    music.loop = false;
    music.volume = 0.04;
    music.play();
    alert(`Time's up`);
}

function getAlarmTime(alarmHand) {
    let hour = parseInt(document.getElementsByTagName('input')[0].value);
    let minutes = parseInt(document.getElementsByTagName('input')[1].value);

    const alarm = getDegreesFromTime(minutes + hour * 60, 60, 30);

    alarmHand.style.transform = `rotate(${alarm}deg)`;

    return [hour, minutes];
}

function tranformHandles(seconds, minutes, hour) {
    const hourHand = document.querySelector('.hour-hand');
    const minHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    if (secondHand && minHand && hourHand) {
        secondHand.style.transform = `rotate(${getDegreesFromTime(seconds, 60)}deg)`;
        minHand.style.transform = `rotate(${getDegreesFromTime(minutes, 60)}deg)`;
        hourHand.style.transform = `rotate(${getDegreesFromTime(hour, 12)}deg)`;
    }
}

function updateClockHandles() {
    const now = new Date();
    tranformHandles(now.getSeconds(), now.getMinutes(), now.getHours());
}

function getDegreesFromTime(value, range, degrees = 360) {
    // Simple rule of three
    return (value / range) * degrees + 90;
}

function createContainerChronometerTimer(innerHtml) {
    if (document.getElementsByClassName('clock')[0]) {
        removeClock();
        removeInputsClock();
    }

    if (!document.getElementsByClassName('hero--time')[0]) {
        createHeroTime();
    }

    if (innerHtml === 'Timer') {
        createTimerContainer();
    }

    if (innerHtml === 'Chronometer') {
        createChronometerContainer();
    }

    timerMinutes = document.getElementById('minutes');
    timerSeconds = document.getElementById('seconds');
}

function createPomodoroButton(parent) {
    const div = document.createElement('div');
    div.classList.add('pomodoro--container');
    parent.appendChild(div);

    const pomodoro = createChild(div, 'button', 'button', 'pomodoro', 'button', 'Pomodoro');
    pomodoro.addEventListener('click', () => {
        document.getElementsByClassName('input-minutes')[0].value = 5;
        document.getElementsByClassName('input-seconds')[0].value = 0;
    });

    timerMinutes = document.getElementById('minutes');
    timerSeconds = document.getElementById('seconds');
}

function createChronometerContainer() {
    removeButtonsContainer();

    if (document.getElementsByClassName('hero--input')[0]) {
        removeChilds(document.getElementsByClassName('hero--input')[0]);
        document.getElementsByClassName('hero--input')[0].remove();
    }

    if (document.getElementsByClassName('pomodoro--container')[0]) {
        removeChilds(document.getElementsByClassName('pomodoro--container')[0]);
        document.getElementsByClassName('pomodoro--container')[0].remove();
    }

    createButtonsContainer(startChronometer);
}

function createTimerContainer() {
    removeButtonsContainer();

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('hero--input');
    document.getElementsByClassName('hero--container')[0].appendChild(inputContainer);

    createInput(inputContainer, 'input', 'input', 'input-minutes', 'number', 'Insert minutes');
    createInput(inputContainer, 'input', 'input', 'input-seconds', 'number', 'Insert seconds');
    document.getElementsByClassName('input-seconds')[0].min = 1;
    document.getElementsByClassName('input-seconds')[0].max = 60;

    createButtonsContainer(startTimer);

    const form = document.createElement('form');
    form.classList.add('form--timer');
    document.getElementsByClassName('hero--buttons')[0].appendChild(form);
    form.onsubmit = function () {
        startTimer();
    };
}

function removeButtonsContainer() {
    if (document.getElementsByClassName('hero--buttons')[0]) {
        removeChilds(document.getElementsByClassName('hero--buttons')[0]);
        document.getElementsByClassName('hero--buttons')[0].remove();
    }
}

function createButtonsContainer(start) {
    const heroButtons = document.createElement('div');
    heroButtons.classList.add('hero--buttons');
    document.getElementsByClassName('hero--container')[0].appendChild(heroButtons);

    createButton(heroButtons, 'button', 'button', 'hero--button', 'button', 'Start', start);
    createButton(heroButtons, 'button', 'button', 'hero--button', 'button', 'Stop', stopChronometer);
    createButton(heroButtons, 'button', 'button', 'hero--button', 'button', 'Reset', resetChronometer);
}

function removeClock() {
    const clock = document.getElementsByClassName('clock')[0];

    const minHand = document.querySelector('.minute-hand');
    const secHand = document.querySelector('.second-hand');
    const hourHand = document.querySelector('.hour-hand');

    if (minHand && secHand && hourHand) {
        minHand.style.transform = 'none';
        secHand.style.transform = 'none';
        hourHand.style.transform = 'none';
    }

    removeChilds(clock);
    clock.remove();
}

function createHeroTime() {
    createChild(document.getElementsByClassName('hero--container')[0], 'div', 'hero--time', null, null, null);

    const divTime = document.getElementsByClassName('hero--time')[0];
    createChild(divTime, 'p', 'time', null, null, null);

    const time = document.getElementsByClassName('time')[0];

    createChild(time, 'span', 'minutes', null, null, null);
    const minutesTime = document.querySelector('.minutes');
    minutesTime.id = 'minutes';
    minutesTime.innerHTML = '00';

    createChild(time, 'span', 'colon', null, null, null);
    const colon = document.querySelector('.colon');
    colon.innerHTML = ':';

    createChild(time, 'span', 'seconds', null, null, null);
    const secondTime = document.querySelector('.seconds');
    secondTime.id = 'seconds';
    secondTime.innerHTML = '00';

    removeButtonsContainer();
}

function removeInputsClock() {
    removeChilds(document.getElementsByClassName('input-container')[0]);
    document.getElementsByClassName('input-container')[0].remove();
}

function changeDisable(innerHtml) {

    if (innerHtml === 'Chronometer') {
        changeDisabledButtons('chronometer-button');
    }

    if (innerHtml === 'Timer') {
        changeDisabledButtons('timer-button');
    }

    if (innerHtml === 'Alarm') {
        changeDisabledButtons('alarm-button');
    }
}

function changeDisabledButtons(actButton) {
    const buttonsNav = ['chronometer-button', 'timer-button', 'alarm-button'];

    for (let i = 0; i < buttonsNav.length; i++) {
        if (actButton === buttonsNav[i]) {
            document.getElementById(actButton).disabled = true;
        } else {
            document.getElementById(buttonsNav[i]).disabled = false;
        }
    }
}
