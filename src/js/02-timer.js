import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

const myInput = document.querySelector('#datetime-picker');
const inputButton = document.querySelector('[data-start]');
inputButton.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future');
      return;
    }
    inputButton.removeAttribute('disabled');
  },
};
const fp = flatpickr(myInput, options); // flatpickr
