import './style.css';

const gameId = 'k7nmRGShKQZXlHE3gpFY';
const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
const addscore = async (name, number) => {
  await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({
      user: name,
      score: number,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
const display = (scores) => {
  const table = document.createElement('table');
  const div = document.getElementById('table');
  div.innerHTML = '';
  scores.forEach((item) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = `${item.user}: ${item.score}`;
    row.appendChild(cell);
    table.appendChild(row);
  });
  div.appendChild(table);
};
const form = document.getElementById('submit');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name');
  const score = document.getElementById('score');
  addscore(name.value, score.value);
  name.value = '';
  score.value = '';
});

const fetchscore = async () => {
  const response = await fetch(requestURL);
  const scores = await response.json();
  display(scores.result);
};

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', () => fetchscore());
fetchscore();
