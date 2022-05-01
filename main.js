import './style.css';
import './variables.css';

const container = document.getElementById('container');

const year = [
  { name: 'January', length: 31 },
  { name: 'February', length: 28 },
  { name: 'March', length: 31 },
  { name: 'April', length: 30 },
  { name: 'May', length: 31 },
  { name: 'June', length: 30 },
  { name: 'July', length: 31 },
  { name: 'August', length: 31 },
  { name: 'September', length: 30 },
  { name: 'October', length: 31 },
  { name: 'November', length: 30 },
  { name: 'December', length: 31 },
];

const date = year.map(({ name, length }) => {
  const array = Array.from({ length });
  const month = array.map((item, index) => {
    return { id: index + 1 };
  });
  return { name, month };
});

const getMonth = month => {
  const currentMonth = date.filter(({ name }) => month === name);
  currentMonth[0].month.map(({ id }) => {
    const days = document.createElement('div');
    days.innerText = id;
    days.classList.add('days');
    container.appendChild(days);
  });
};

getMonth('January');