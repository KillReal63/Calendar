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

const date = new Date();
const currentDay = date.getDay() + 1;
const currentMonth = date.getMonth() + 1;
const body = document.getElementById('body');
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

const closeModal = (modal, event) => {
  if (event.target.id === 'modal') {
    body.removeChild(modal);
  }
};

const onSubmit = (event, id) => {
  let events = [];
  event.preventDefault();
  console.log(event);
  const data = localStorage.getItem('items');
  const title = event.target[0].value;
  const description = event.target[1].value;
  const getMonthId = container.getAttribute('data-month-id');
  if (!data) {
    events.push({ id: 1, title, description, dayId: id, getMonthId });
    const array = JSON.stringify(events);
    localStorage.setItem('items', array);
  } else {
    const parseData = JSON.parse(data);
    console.log(parseData, 'test');
    parseData.push({ id: parseData.length + 1, title, description, dayId: id, getMonthId });
    const completeData = JSON.stringify(parseData);
    localStorage.setItem('items', completeData);
  }
  // const submitButton = document.getElementById('button');
  // submitButton.addEventListener('click', (e) => closeModal(modal, e))
};

const createForm = (modal, id) => {
  const getMonthName = container.getAttribute('data-month-name');
  const form = document.createElement('form');
  form.classList.add('form');
  form.onsubmit = event => onSubmit(event, id, modal);
  form.innerHTML = `
<div class="title">${id} ${getMonthName}</div>
<input type='text' placeholder='Title' class="input">
<input type='text' placeholder='Description' class="input">
<button type="submit" id="button" formtarget="_self">Add</button>
`;
  modal.appendChild(form);
};

const openModal = id => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.addEventListener('click', event => closeModal(modal, event));
  modal.setAttribute('id', 'modal');
  createForm(modal, id);
  body.appendChild(modal);
};

const createDay = id => {
  const getMonthId = container.getAttribute('data-month-id');
  const day = document.createElement('div');
  day.innerText = id;
  day.classList.add('day');
  if (currentDay === id && parseInt(getMonthId) === currentMonth) {
    day.classList.add('today');
  }
  day.addEventListener('click', () => openModal(id));
  container.appendChild(day);
};

const renderMonth = ({ name: monthName, length, id: monthId }) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.setAttribute('data-month-id', monthId);
  container.setAttribute('data-month-name', monthName);
  const currentMonthName = document.getElementById('month-name');
  currentMonthName.innerText = monthName;
  const month = createMonth(length);
  month.map(({ id }) => {
    createDay(id);
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

const app = () => {
  renderMonth(year[currentMonth - 1]);
};

app();
