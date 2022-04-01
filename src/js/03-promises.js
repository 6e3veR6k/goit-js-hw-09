import '../../node_modules/modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onFormSubmit);

// console.log(getInputValues(refs.form.elements));

function onFormSubmit(e) {
  e.preventDefault();
  processTask(getInputValues(refs.form.elements));
}

function getInputValues({ delay, step, amount }) {
  return { delay: Number(delay.value), step: Number(step.value), amount: Number(amount.value) };
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function processTask({ delay, step, amount }) {
  for (let i = 0; i < amount; i++) {
    console.log(i + 1, delay + step * i);
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
