let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

document.getElementById('submit').addEventListener('click', function() 
												   {
    const playerXName = document.getElementById('player-1').value || 'Player X';
    const playerOName = document.getElementById('player-2').value || 'Player O';
    gameActive = true;
    initializeBoard();
});

function initializeBoard() {
    const boardElement = document.querySelector('.board');
    boardElement.innerHTML = '';
    board.fill('');
    currentPlayer = 'X';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.dataset.index;

    if (board[clickedIndex] !== '' || !gameActive) return;

    board[clickedIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}


const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}
document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    gameActive = true;
    initializeBoard();
}

