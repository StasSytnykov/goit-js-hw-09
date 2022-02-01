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

inputButton.addEventListener('click', onGetTimeToEndAction);
inputButton.setAttribute('disabled', 'true');

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
    selectedDate = selectedDates[0].getTime();
    console.log(selectedDate);
  },
};

const fp = flatpickr(myInput, options); // flatpickr

function onGetTimeToEndAction() {
  setInterval(() => {
    const time = Date.now();
    const currentTime = selectedDate - time;
    console.log(currentTime);
    const { days, hours, minutes, seconds } = convertMs(currentTime);
    console.log({ days, hours, minutes, seconds });
    onShowTimeToEndAction({ days, hours, minutes, seconds });
  }, 1000);
}

function onShowTimeToEndAction({ days, hours, minutes, seconds }) {
  daysToEndAction.textContent = days;
  hoursToEndAction.textContent = hours;
  minutesToEndAction.textContent = minutes;
  secondsToEndAction.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
