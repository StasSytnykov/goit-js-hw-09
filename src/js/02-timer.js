import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const myInput = document.querySelector('#datetime-picker');
const inputButton = document.querySelector('[data-start]');
const daysToEndAction = document.querySelector('[data-days]');
const hoursToEndAction = document.querySelector('[data-hours]');
const minutesToEndAction = document.querySelector('[data-minutes]');
const secondsToEndAction = document.querySelector('[data-seconds]');
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      inputButton.setAttribute('disabled', 'true');
      return;
    }

    inputButton.removeAttribute('disabled');
    return (selectedDate = selectedDates[0].getTime());
  },
};

const fp = flatpickr(myInput, options);

class Timer {
  constructor({ onTick, onStart }) {
    this.timerId = null;
    this.isActive = false;

    this.onTick = onTick;
    this.onStart = onStart;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    let currentTime = Date.now();
    const startTime = selectedDate - currentTime;
    const convertTime = this.convertMs(startTime);

    this.onStart(convertTime);

    this.timerId = setInterval(() => {
      currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      const time = this.convertMs(deltaTime);

      this.onTick(time);

      this.stopTimer();
    }, 1000);
  }

  stopTimer() {
    if (
      (secondsToEndAction.textContent === '00') &
      (minutesToEndAction.textContent === '00') &
      (hoursToEndAction.textContent === '00') &
      (daysToEndAction.textContent === '00')
    ) {
      clearInterval(this.timerId);
    }
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: onShowTimeToEndAction,
  onStart: onShowTimeToEndAction,
});

function onShowTimeToEndAction({ days, hours, minutes, seconds }) {
  daysToEndAction.textContent = days;
  hoursToEndAction.textContent = hours;
  minutesToEndAction.textContent = minutes;
  secondsToEndAction.textContent = seconds;
}

inputButton.addEventListener('click', timer.startTimer.bind(timer));
inputButton.setAttribute('disabled', 'true');
