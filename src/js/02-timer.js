import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.getElementById('datetime-picker'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.dateInput, options);

console.log(refs);
