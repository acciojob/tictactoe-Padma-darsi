let currentPlayer = 'X';
let board = Array(9).fill('');
let player1 = '';
let player2 = '';
let gameActive = false;

document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
  player1 = document.getElementById('player1').value || 'Player1';
  player2 = document.getElementById('player2').value || 'Player2';

  gameActive = true;
  document.getElementById('input-section').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';

  createBoard();
  displayMessage(`${player1}, you're up`);
}

function createBoard() {
  const boardElement = document.querySelector('.board');
  boardElement.innerHTML = '';
  board = Array(9).fill('');
  currentPlayer = 'X';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = (i + 1).toString(); // Add ID from 1 to 9
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = parseInt(event.target.id) - 1;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer.toLowerCase(); // x or o

  if (checkWin()) {
    const winner = currentPlayer === 'X' ? player1 : player2;
    displayMessage(`${winner} congratulations you won!`);
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    displayMessage("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const nextPlayer = currentPlayer === 'X' ? player1 : player2;
  displayMessage(`${nextPlayer}, you're up`);
}

function displayMessage(msg) {
  document.querySelector('.message').textContent = msg;
}

function checkWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winConditions.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}
