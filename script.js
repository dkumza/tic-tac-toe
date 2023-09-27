// select elements for the DOM
const gameContainer = document.querySelector("#game-container");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#reset");
const startGameBtn = document.querySelector("#start");
const statusContainer = document.querySelector("#status-container");
const helloContainer = document.querySelector("#hello-container");

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

// start game
startGameBtn.addEventListener("click", () => {
   gameContainer.classList.remove("hide");
   statusContainer.classList.remove("hide");
   helloContainer.classList.add("hide");
   startGame();
});

// create game window of 3x3 grid
function createGame() {
   for (let i = 0; i < 9; i++) {
      // create div for each cell
      const cell = document.createElement("div");
      // set attributes for each cell
      cell.setAttribute("id", `${i}`);
      // add class to each cell
      cell.setAttribute("class", "cell");
      // append each cell to game container
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
         // select all cells with win condition and change background color to green
         for (let i = 0; i < condition.length; i++) {
            const cell = document.getElementById(condition[i]);
            cell.classList.add("win");
         }
         roundWon = true;
         break;
      }
   }
   // if round is won, display winner
   if (roundWon) {
      statusText.textContent = `Congratulations, ${player} wins!`;
      // disable pointer events on game container
      gameContainer.classList.add("game-over");
      // if round is not won, check if game is a draw
   } else if (!gameBoard.includes("")) {
      // select all cells and change background color to yellow
      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => cell.classList.add("draw"));
      statusText.textContent = `Game is Draw!`;
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

// startGame();
