import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

const myInput = document.querySelector('#datetime-picker');
const inputButton = document.querySelector('[data-start]');
inputButton.setAttribute('disabled', 'true');

let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      window.alert('Please choose a date in the future');
      inputButton.setAttribute('disabled', 'true');
      return;
    }
    inputButton.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
    console.log(selectedDate);
  },
};

console.log(selectedDate);
const fp = flatpickr(myInput, options); // flatpickr
const timeToEndAction = Date.now() + selectedDate;

function getTimeToEndAction() {
  setInterval(() => {
    const time = Date.now();
    const currentTime = timeToEndAction - time;
    console.log(currentTime);
    const timer = convertMs(currentTime);
    console.log(timer);
  }, 1000);
}

// getTimeToEndAction();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
