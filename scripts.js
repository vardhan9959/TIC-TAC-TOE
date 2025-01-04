const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

function handleCellClick(event) {
   const clickedCell = event.target;
   const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
   
   if (gameState[clickedCellIndex] !== '' || !gameActive) {
       return;
   }
   
   gameState[clickedCellIndex] = currentPlayer;

   clickedCell.textContent = currentPlayer;

   checkResult();
}

function checkResult() {
   let roundWon = false;

   for (let i = 0; i < winningConditions.length; i++) {
       const [a, b, c] = winningConditions[i];

       if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
           roundWon = true;
           break;
       }
   }

   if (roundWon) {
       message.textContent = `Player ${currentPlayer} wins!`;
       gameActive = false;
       return;
   }

   if (!gameState.includes('')) {
       message.textContent = 'Game ended in a draw!';
       gameActive = false;
       return;
   }

   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleResetButton() {
   gameState = ['', '', '', '', '', '', '', '', ''];
   gameActive = true;

   currentPlayer = 'X';

   cells.forEach(cell => cell.textContent = '');
   message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetButton);
