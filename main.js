import './style.css';
import './variables.css';

const year = [
  { name: 'January', length: 31, id: 1 },
  { name: 'February', length: 28, id: 2 },
  { name: 'March', length: 31, id: 3 },
  { name: 'April', length: 30, id: 4 },
  { name: 'May', length: 31, id: 5 },
  { name: 'June', length: 30, id: 6 },
  { name: 'July', length: 31, id: 7 },
  { name: 'August', length: 31, id: 8 },
  { name: 'September', length: 30, id: 9 },
  { name: 'October', length: 31, id: 10 },
  { name: 'November', length: 30, id: 11 },
  { name: 'December', length: 31, id: 12 },
];

const container = document.getElementById('container');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');

rightButton.addEventListener('click', () => handleButtonClick('right'));
leftButton.addEventListener('click', () => handleButtonClick('left'));

const createMonth = length => {
  const array = Array.from({ length }).map((item, index) => {
    return { id: index + 1 };
  });
  return array;
};

const renderMonth = ({ name: monthName, length, id: monthId }) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.setAttribute('data-month-id', monthId);
  const currentMonthName = document.getElementById('month-name');
  currentMonthName.innerText = monthName;
  const month = createMonth(length);
  month.map(({ id }) => {
    const days = document.createElement('div');
    days.innerText = id;
    days.classList.add('day');
    container.appendChild(days);
  });
};

const handleButtonClick = side => {
  const id = container.getAttribute('data-month-id');
  if (side === 'right') {
    if (parseInt(id) <= 11) {
      renderMonth(year[Number(id)]);
    } else {
      renderMonth(year[0]);
    }
  } else {
    if (parseInt(id) === 1) {
      renderMonth(year[11]);
    } else {
      renderMonth(year[Number(id) - 2]);
    }
  }
};

renderMonth(year[0]);