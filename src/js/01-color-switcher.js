import '../../node_modules/modern-normalize/modern-normalize.css';
import '../sass/main.scss';

const refs = {
  body: document.body,
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

onPageLoad();

let intervalId = null;

refs.startButton.addEventListener('click', onStartClick);
refs.stopButton.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartClick(e) {
  switchButtons();

  if (e.target.hasAttribute('data-start')) {
    intervalId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
}

function onStopClick(e) {
  switchButtons();
  clearInterval(intervalId);
}

function onPageLoad() {
  refs.stopButton.disabled = true;
}

function switchButtons() {
  refs.stopButton.disabled = !refs.stopButton.disabled;
  refs.startButton.disabled = !refs.startButton.disabled;
}
