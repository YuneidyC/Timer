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

    document.getElementsByClassName('hero__title')[0].innerHTML = 'Chronometer';

    updateDisabledPropNavButtons('chronometer-button');

    if (document.getElementsByClassName('clock')[0]) {
        removeClock();
        removeInputsClock();
    }

    if (document.getElementsByClassName('hero__buttons')[0]) {
        const divButton = document.getElementsByClassName('hero__buttons')[0];
        removeChilds(divButton);
    }

    createContainerChronometerTimer(document.getElementsByClassName('hero__title')[0].innerHTML);
}

function resetStopwatch() {
    secondsValue = 0;
    minutesValue = 0;

    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';

    removeTimesUp(document.getElementsByClassName('time-up')[0]);
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

    removeTimesUp(document.getElementsByClassName('time-up')[0]);
    clearInterval(currentInterval);
}

function resetChronometer() {
    if (document.getElementsByClassName('hero__title')[0].innerHTML === 'Timer' &&
        document.getElementsByClassName('input')[0].value !== '' &&
        document.getElementsByClassName('input')[1].value !== '') {
        minutesValue = document.getElementsByClassName('input')[0].value;
        secondsValue = document.getElementsByClassName('input')[1].value;

        timerMinutes.textContent = `${formatValue(minutesValue)}`;
        timerSeconds.textContent = `${formatValue(secondsValue)}`;
    } else {
        minutesValue = 0;
        secondsValue = 0;

        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';

        currentButton.disabled = false;
    }

    removeTimesUp(document.getElementsByClassName('time-up')[0]);
}

function removeTimesUp(timesUp) {
    if (timesUp) {
        timesUp.remove();
    }
}

const startTimer = function startTimer(event) {
    event.preventDefault();
    currentButton = event.target;
    currentButton.disabled = true;

    removeTimesUp(document.getElementsByClassName('time-up')[0])

    if ((minutesValue && secondsValue) === 00) {
        let minutes = parseInt(document.getElementsByTagName('input')[0].value);
        let seconds = parseInt(document.getElementsByTagName('input')[1].value);

        let minutesOrSeconds = checkMinutesAndSeconds(minutes, seconds, 'Correct format minutes >= 0 and seconds 0 to 59');

        if (!minutesOrSeconds) {
            resetChronometer();
            return;
        } else {
            timerMinutes.textContent = minutesOrSeconds[0];
            timerSeconds.textContent = minutesOrSeconds[1];
        };

        secondsValue = seconds;
        minutesValue = minutes;
    }

    currentInterval = setInterval(() => {
        secondsValue -= 1;
        if (secondsValue === -1) {
            secondsValue = 59;
            if (minutesValue > 0) {
                minutesValue -= 1;
            }
        }

        if (parseInt(minutesValue) === 0 && parseInt(secondsValue) === 0) {
            executeAlarm();

            currentButton.disabled = false;
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

    document.getElementsByClassName('hero__title')[0].innerHTML = 'Timer';

    updateDisabledPropNavButtons('timer-button');

    createContainerChronometerTimer(document.getElementsByClassName('hero__title')[0].innerHTML);

    createPomodoroButton(document.getElementsByClassName('hero__container')[0]);
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

function clearScreenAlarm() {
    document.getElementsByClassName('hero__title')[0].innerHTML = 'Alarm';

    updateDisabledPropNavButtons('alarm-button');

    if (document.getElementsByClassName('hero__input')[0]) {
        removeChilds(document.getElementsByClassName('hero__input')[0]);
        document.getElementsByClassName('hero__input')[0].remove();
    }

    if (document.getElementsByClassName('pomodoro__container')[0]) {
        removeChilds(document.getElementsByClassName('pomodoro__container')[0]);
        document.getElementsByClassName('pomodoro__container')[0].remove();
    }

    if (document.getElementsByClassName('hero__buttons')[0]) {
        removeChilds(document.getElementsByClassName('hero__buttons')[0]);
        document.getElementsByClassName('hero__buttons')[0].remove();
    }

    if (document.getElementsByClassName('hero__time')[0]) {
        removeChilds(document.getElementsByClassName('hero__time')[0]);
        document.getElementsByClassName('hero__time')[0].remove();
    }

    createContainerAlarm(document.getElementsByClassName('hero__container')[0]);

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

    createChild(innerClock, 'div', 'hand', 'hour__hand');
    createChild(innerClock, 'div', 'hand', 'minute__hand');
    createChild(innerClock, 'div', 'hand', 'second__hand');
    createChild(innerClock, 'div', 'hand', 'alarm__hand');
    createChild(innerClock, 'div', 'hand', 'middle');

    const alarmHand = document.getElementsByClassName('alarm__hand')[0];

    {
        const numbersName = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

        let i = 0;

        // Create clock numbers
        while (i <= numbersName.length - 1) {
            createChild(innerClock, 'div', 'hours', numbersName[i], null, i + 1);
            i++;
        }
    }

    createChild(container, 'div', 'input__container');
    const inputContainer = document.getElementsByClassName('input__container')[0];

    createInput(inputContainer, 'input', 'input', 'input__hour', 'number', 'Insert hour');
    document.getElementsByClassName('input__hour')[0].min = 0;
    document.getElementsByClassName('input__hour')[0].max = 23;

    createChild(document.getElementsByClassName('input__container')[0], 'div', 'message', 'message__hour');

    createInput(inputContainer, 'input', 'input', 'input__minutes', 'number', 'Insert minutes');
    document.getElementsByClassName('input__minutes')[0].min = 0;
    document.getElementsByClassName('input__minutes')[0].max = 59;

    createChild(document.getElementsByClassName('input__container')[0], 'div', 'message', 'message__minutes');

    const bar = document.createElement('div');
    bar.id = 'mbar';
    inputContainer.appendChild(bar);

    const saveButton = createChild(inputContainer, 'button', 'button', 'alarm-button', 'button', 'Save');
    saveButton.addEventListener('click', function () {
        scheduleAlarm(getAlarmTime(alarmHand, inputContainer));
    });
}

function scheduleAlarm(hourMinutes) {

    if (!hourMinutes) {
        return;
    }

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
    const music = new Audio('../alarm.wav');
    music.loop = false;
    music.volume = 0.04;
    music.play();
    alert(`Time's up`);
}

function getAlarmTime(alarmHand, inputContainer) {
    let hour = parseInt(document.getElementsByTagName('input')[0].value);
    let minutes = parseInt(document.getElementsByTagName('input')[1].value);

    createInput(inputContainer, 'div', 'message__error');

    const hourAndMinutes = checkMinutesAndSeconds(hour, minutes, 'Correct format hour 0 to 23 and minutes 0 to 59');

    if (!hourAndMinutes) {
        return;
    } else {
        const alarm = getDegreesFromTime(minutes + hour * 60, 60, 30);

        alarmHand.style.transform = `rotate(${alarm}deg)`;
    }

    return [hour, minutes];
}

function tranformHandles(seconds, minutes, hour) {
    const hourHand = document.querySelector('.hour__hand');
    const minHand = document.querySelector('.minute__hand');
    const secondHand = document.querySelector('.second__hand');

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

    if (!document.getElementsByClassName('hero__time')[0]) {
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
    div.classList.add('pomodoro__container');
    parent.appendChild(div);

    const pomodoro = createChild(div, 'button', 'button', 'pomodoro', 'button', 'Pomodoro');
    pomodoro.addEventListener('click', () => {
        document.getElementsByClassName('input__minutes')[0].value = 5;
        document.getElementsByClassName('input__seconds')[0].value = 0;
    });

    timerMinutes = document.getElementById('minutes');
    timerSeconds = document.getElementById('seconds');
}

function createChronometerContainer() {
    removeButtonsContainer();

    if (document.getElementsByClassName('hero__input')[0]) {
        removeChilds(document.getElementsByClassName('hero__input')[0]);
        document.getElementsByClassName('hero__input')[0].remove();
    }

    if (document.getElementsByClassName('pomodoro__container')[0]) {
        removeChilds(document.getElementsByClassName('pomodoro__container')[0]);
        document.getElementsByClassName('pomodoro__container')[0].remove();
    }

    createButtonsContainer(startChronometer);
}

function createTimerContainer() {
    removeButtonsContainer();

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('hero__input');
    document.getElementsByClassName('hero__container')[0].appendChild(inputContainer);

    createInput(inputContainer, 'input', 'input', 'input__minutes', 'number', 'Insert minutes');
    document.getElementsByClassName('input__minutes')[0].required;
    document.getElementsByClassName('input__minutes')[0].title = 'Correct format minutes >= 0';
    document.getElementsByClassName('input__minutes')[0].min = 0;

    createInput(inputContainer, 'input', 'input', 'input__seconds', 'number', 'Insert seconds');
    document.getElementsByClassName('input__seconds')[0].required;
    document.getElementsByClassName('input__seconds')[0].title = 'Correct format seconds 0-59';
    document.getElementsByClassName('input__seconds')[0].min = 0;
    document.getElementsByClassName('input__seconds')[0].max = 59;

    const bar = document.createElement('div');
    bar.id = 'mbar';
    inputContainer.appendChild(bar);

    createInput(inputContainer, 'div', 'message__error');

    createButtonsContainer(startTimer);

    const form = document.createElement('form');
    form.classList.add('form--timer');
    document.getElementsByClassName('hero__buttons')[0].appendChild(form);
    form.onsubmit = function () {
        startTimer(e);
    };
}

function removeButtonsContainer() {
    if (document.getElementsByClassName('hero__buttons')[0]) {
        removeChilds(document.getElementsByClassName('hero__buttons')[0]);
        document.getElementsByClassName('hero__buttons')[0].remove();
    }
}

function createButtonsContainer(start) {
    const heroButtons = document.createElement('div');
    heroButtons.classList.add('hero__buttons');
    document.getElementsByClassName('hero__container')[0].appendChild(heroButtons);

    createButton(heroButtons, 'button', 'button', 'hero__button', 'button', 'Start', start);
    createButton(heroButtons, 'button', 'button', 'hero__button', 'button', 'Stop', stopChronometer);
    createButton(heroButtons, 'button', 'button', 'hero__button', 'button', 'Reset', resetChronometer);
}

function removeClock() {
    const clock = document.getElementsByClassName('clock')[0];
    const minHand = document.querySelector('.minute__hand');
    const secHand = document.querySelector('.second__hand');
    const hourHand = document.querySelector('.hour__hand');

    if (minHand && secHand && hourHand) {
        minHand.style.transform = 'none';
        secHand.style.transform = 'none';
        hourHand.style.transform = 'none';
    }

    removeChilds(clock);
    clock.remove();
}

function createHeroTime() {
    createChild(document.getElementsByClassName('hero__container')[0], 'div', 'hero__time', null, null, null);

    const divTime = document.getElementsByClassName('hero__time')[0];
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
    removeChilds(document.getElementsByClassName('input__container')[0]);
    document.getElementsByClassName('input__container')[0].remove();
}

function updateDisabledPropNavButtons(actButton) {
    const buttonsNav = ['chronometer-button', 'timer-button', 'alarm-button'];

    for (let i = 0; i < buttonsNav.length; i++) {
        if (actButton === buttonsNav[i]) {
            document.getElementById(actButton).disabled = true;
            document.getElementById(actButton).style.cursor = "default";
        } else {
            document.getElementById(buttonsNav[i]).disabled = false;
            document.getElementById(buttonsNav[i]).style.cursor = "pointer";
        }
    }
}

function checkMinutesAndSeconds(minutes, seconds, message) {
    if (document.getElementsByClassName('hero__title')[0].innerHTML === 'Alarm' && minutes > 23) {
        document.getElementsByClassName('message__error')[0].onclick = mbar(message);
        return false;
    }

    if (Number.isNaN(minutes) || minutes < 0 || Number.isNaN(seconds) || seconds < 0 || seconds > 59) {
        document.getElementsByClassName('message__error')[0].onclick = mbar(message);
        return false;
    }

    minutes = checkMinutesSecondsLength(minutes);
    seconds = checkMinutesSecondsLength(seconds);

    return [minutes, seconds];
}

function checkMinutesSecondsLength(minutesOrSeconds) {
    if ((minutesOrSeconds).toString().length < 2) {
        return formatValue(minutesOrSeconds);
    } else {
        return minutesOrSeconds.toString();
    }
}

function mbar(msg) {
    if (!document.getElementsByClassName('mbar')[0]) {
        let bar = document.createElement('div');
        bar.classList.add('mbar');
        document.getElementById("mbar").appendChild(bar);
        bar.innerHTML = msg + " " + '<img src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png">';

        let image = document.getElementsByClassName('mbar')[0].childNodes[1];
        image.classList.add('close');
        image.style.cursor = "pointer";
        image.onclick = () => { bar.remove(); };
    }
}
