let winningMessage = document.getElementById('winning-message');
let newGameButton = document.getElementById('new-game-button');
let playerXColor = getComputedStyle(document.body).getPropertyValue('--player-x');
let playerOColor = getComputedStyle(document.body).getPropertyValue('--player-o');

let cells = Array.from(document.getElementsByClassName('cell'));

let playerValues = Array(9).fill(null);
const PLAYER_O = "O";
const PLAYER_X = "X";
let currentPlayer = PLAYER_X;

const winningValues = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const gameStart = () => {
  cells.forEach(cell => cell.addEventListener('click', cellClicked))
}

function cellClicked(event) {
  const id = event.target.id;
  if (!playerValues[id]) {
    playerValues[id] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.style.color = (currentPlayer == PLAYER_O) ? playerOColor : playerXColor;

    if (playerWon() != false) {
      let winningIndexes = playerWon();
      winningIndexes.map(i =>
        cells[i].style.backgroundColor = '#eeeeee');

      winningMessage.innerText = `Player ${currentPlayer} won the game!`;
      //disable clicking
      cells.forEach(cell => cell.style.pointerEvents = 'none');
      // confetti effect
      party.confetti(document.getElementById('main-container'), {
        count: 40
      });

    }
    // else switch player
    currentPlayer = (currentPlayer == PLAYER_O) ? PLAYER_X : PLAYER_O;
  }
}

function playerWon() {
  for (obj of winningValues) {
    let [a, b, c] = obj;
    if ((playerValues[a] !== null) &&
      (playerValues[a] == playerValues[b]) &&
      (playerValues[a] == playerValues[c])) {
      return obj;
    }
  }
  return false;
}

function restartGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.style.backgroundColor = '#fff';
    cell.style.pointerEvents = 'auto';
  });

  winningMessage.innerText = '';
  playerValues.fill(null);
  currentPlayer = PLAYER_X;
}

newGameButton.addEventListener('click', restartGame);
gameStart();