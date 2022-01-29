function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timerId = null;
let isActive = false;

buttonStart.addEventListener('click', onGetRandomBackgroundColor);
buttonStop.addEventListener('click', onStopChangeBackgroundColor);

function onGetRandomBackgroundColor() {
  if (isActive) {
    return;
  }
  isActive = true;
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopChangeBackgroundColor() {
  clearInterval(timerId);
}
