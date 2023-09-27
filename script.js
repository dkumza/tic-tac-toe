// select elements for the DOM
const gameContainer = document.querySelector("#game-container");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#reset");
// create variables for the game
let player = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

// create game window
function createGame() {
   for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", `${i}`);
      cell.setAttribute("class", "cell");
      gameContainer.appendChild(cell);
   }
}

createGame();

// initialize game
function startGame() {
   // select all created cells
   const cells = document.querySelectorAll(".cell");
   // add click event listener to each cell to get values
   cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
         const cellIndex = e.target.id;
         // add class to cell to prevent clicking again
         cell.classList.add("clicked");
         // update cells with functions
         updateCell(cellIndex);
         statusText.textContent = `${player}'s turn`;
         checkWinner();
      })
   );
}

// checks who wins the game
function checkWinner() {
   let roundWon = false;
   // compare each win condition with game board
   for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = gameBoard[condition[0]];
      const cellB = gameBoard[condition[1]];
      const cellC = gameBoard[condition[2]];
      // if any of the cells are empty, continue
      if (cellA == "" || cellB == "" || cellC == "") {
         continue;
      }
      // if all cells are equal, round is won
      if (cellA == cellB && cellB == cellC) {
         roundWon = true;
         break;
      }
   }
   // if round is won, display winner
   if (roundWon) {
      statusText.textContent = `${player} wins!`;
      // disable pointer events on game container
      gameContainer.classList.add("game-over");
      // if round is not won, check if game is a draw
   } else if (!gameBoard.includes("")) {
      statusText.textContent = `Draw!`;
      // else change player
   } else {
      changePlayer();
   }
}

function updateCell(cellIndex) {
   // update game board when cell is clicked
   gameBoard[cellIndex] = player;
   const cell = document.getElementById(cellIndex);
   cell.textContent = player;
}

// after each turn change player
function changePlayer() {
   player = player == "X" ? "O" : "X";
   statusText.textContent = `${player}'s turn`;
}

// restart game
restartBtn.addEventListener("click", () => {
   location.reload();
});

startGame();
