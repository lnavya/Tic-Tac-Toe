const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  if (checkWin()) {
    highlightWinningCells();
    setTimeout(() => alert(`${currentPlayer} Wins!`), 100);
  } else if (isDraw()) {
    setTimeout(() => alert('Draw!'), 100);
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function highlightWinningCells() {
  winningCombinations.forEach(combination => {
    if (combination.every(index => cells[index].textContent === currentPlayer)) {
      combination.forEach(index => cells[index].classList.add('winning'));
    }
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
  currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
