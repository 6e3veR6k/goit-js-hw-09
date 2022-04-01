import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';
import { load, save } from './localstorage.service';

import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  dateInput: document.getElementById('datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  fieldDays: document.querySelector('.value[data-days]'),
  fieldHours: document.querySelector('.value[data-hours]'),
  fieldMinutes: document.querySelector('.value[data-minutes]'),
  fieldSeconds: document.querySelector('.value[data-seconds]'),
};

refs.startButton.addEventListener('click', onStartButtonClick);
const SELECTED_DATE_KEY = 'UserDate';
const today = new Date();
let msDiff = 0;
let intervalId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const diff = selectedDates[0] - today;

    if (!isDateValid(diff)) {
      Notify.failure('Please choose date in the future!');
      refs.startButton.disabled = true;
      msDiff = 0;
      updateView(msDiff);
      clearInterval(intervalId);
      return;
    }

    msDiff = diff;
    refs.startButton.disabled = false;
    save(SELECTED_DATE_KEY, selectedDates[0]);
  },
};

onPageLoad();

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

function isDateValid(diff) {
  return diff > 0;
}

function onPageLoad() {
  refs.startButton.disabled = true;

  const selectedDateString = load(SELECTED_DATE_KEY);

  if (selectedDateString) {
    const selectedDate = new Date(selectedDateString);
    msDiff = selectedDate - today;
  }

  if (isDateValid(msDiff)) {
    updateView(msDiff);
    intervalId = setInterval(() => {
      const second = 1000;
      msDiff -= second;
      updateView(msDiff);
    }, 1000);

    options.defaultDate = new Date(selectedDateString);
  }

  flatpickr(refs.dateInput, options);
}

function updateView(ms) {
  const convertedValue = convertMs(ms);

  refs.fieldDays.textContent = convertedValue.days.toFixed().padStart(2, '00');
  refs.fieldHours.textContent = convertedValue.hours.toFixed().padStart(2, '00');
  refs.fieldMinutes.textContent = convertedValue.minutes.toFixed().padStart(2, '00');
  refs.fieldSeconds.textContent = convertedValue.seconds.toFixed().padStart(2, '00');
}

function onStartButtonClick(e) {
  updateView(msDiff);
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const second = 1000;
    msDiff -= second;
    updateView(msDiff);
  }, 1000);
}
