const squares = document.querySelectorAll("div.square");
let currentPlayer = "O";
const messageElement = document.getElementById("message");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  return winPatterns.find((pattern) => {
    const [a, b, c] = pattern;
    return (
      squares[a].innerHTML &&
      squares[a].innerHTML === squares[b].innerHTML &&
      squares[a].innerHTML === squares[c].innerHTML
    );
  });
}

function handleClick(event) {
  const square = event.target;
  if (square.innerHTML) return;
  square.innerHTML = currentPlayer;
  square.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    messageElement.innerHTML = `Wygrywa ${currentPlayer}!`;
    disableCells();
    return;
  }

  currentPlayer = currentPlayer === "O" ? "X" : "O";
  if (currentPlayer === "X") {
    makeAIMove();
  }
}

function makeAIMove() {
  const emptySquares = Array.from(squares).filter((square) => !square.innerHTML);
  if (emptySquares.length === 0) return;

  const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
  randomSquare.innerHTML = currentPlayer;
  randomSquare.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    messageElement.innerHTML = `Wygrywa ${currentPlayer}!`;
    disableCells();
    return;
  }

  currentPlayer = "O";
}

function disableCells() {
  for (let square of squares) {
    square.removeEventListener("click", handleClick);
  }
}

function resetBoard() {
  for (let square of squares) {
    square.innerHTML = "";
    square.classList.remove("x", "o");
    square.addEventListener("click", handleClick);
  }
  currentPlayer = "O";
  messageElement.innerHTML = "";
}

for (let square of squares) {
  square.addEventListener("click", handleClick);
}

document.getElementById("reload").addEventListener("click", resetBoard);
