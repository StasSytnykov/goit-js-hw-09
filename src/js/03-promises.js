function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    const isSuccess = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          resolve('Success! Value passed to resolve function');
        } else {
          reject('Error! Error passed to reject function');
        }
      }, delay);
    });
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

createPromise(2, 1500)
  .then((position, delay) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;

  console.log(delay.value);
  console.log(step.value);
  console.log(amount.value);

  for (let i = 0; i < amount.value; i += 1) {}
}
