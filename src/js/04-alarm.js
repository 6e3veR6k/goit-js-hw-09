import '../../node_modules/modern-normalize/modern-normalize.css';
import '../sass/main.scss';

const alarm = {
  secArrow: document.querySelector('.second-arrow'),
  minArrow: document.querySelector('.minute-arrow'),
  hourArrow: document.querySelector('.hour-arrow'),
};

console.log(alarm);

let now = Date.now();
let converted = convertMs(now);
let secRotate = '';
let minRotate = '';
let hourRotate = '';
const ms = 1000;
const delta = now % 1000;

const grad = {
  sec: converted.seconds * 6 + delta * (6 / ms),
  min: converted.minutes * 6 + converted.seconds * 0.1,
  hour: converted.hours * 30 + converted.minutes * 0.5,
};

const secondsInterval = setInterval(() => {
  secRotate = `translate(-50%, -50%) rotate(${grad.sec}deg)`;
  minRotate = `translate(-50%, -50%) rotate(${grad.min}deg)`;
  hourRotate = `translate(-50%, -50%) rotate(${grad.hour}deg)`;

  alarm.secArrow.style.transform = secRotate;
  alarm.minArrow.style.transform = minRotate;
  alarm.hourArrow.style.transform = hourRotate;

  grad.sec += (6 / ms) * 15;
  grad.min += (0.1 / ms) * 15;
  grad.hour += (0.1 / 12 / ms) * 15;
}, 15);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour) + 3;
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
