const cells = document.querySelectorAll("div.square");
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
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    );
  });
}

for (let cell of cells) {
  cell.addEventListener("click", (event) => {
    if (cell.innerHTML) return;
    cell.innerHTML = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const winPattern = checkWin();
    if (winPattern) {
      messageElement.innerHTML = `Wygrywa ${currentPlayer}!`;
      drawWinLine(winPattern);
      return;
    }

    currentPlayer = currentPlayer === "O" ? "X" : "O";
  });
}

document.getElementById("reload").addEventListener("click", resetBoard);

function resetBoard() {
  for (let cell of cells) {
    cell.innerHTML = "";
    cell.classList.remove("X", "O");
  }
  currentPlayer = "O";
  messageElement.innerHTML = "";
  winLine.style.width = "0";
}
