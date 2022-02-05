import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget;
  const delayValue = Number(delay.value);
  let totalDelay = 0;

  for (let i = 1; i <= amount.value; i += 1) {
    totalDelay = delayValue + Number(step.value) * i;

    createPromise(i, totalDelay)
      .then(resolve => Notify.success(resolve))
      .catch(reject => Notify.failure(reject));
  }
}
