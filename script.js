const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let cells = Array(9).fill(null);

function createBoard() {
    board.innerHTML = '';
    cells.forEach((_, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    });
    status.textContent = "Na potezu: " + currentPlayer;
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (cells[index] || checkWinner()) return;
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWinner()) {
        status.textContent = currentPlayer + " je pobijedio!";
    } else if (cells.every(cell => cell)) {
        status.textContent = "Neriješeno!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = "Na potezu: " + currentPlayer;
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern => {
        const [a,b,c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = 'X';
    createBoard();
}

createBoard();