// get nickname from local storage
const nickname = localStorage.getItem("nickname");

// select elements for the DOM
const gameContainer = document.querySelector("#game-container");
const statusText = document.querySelector("#status");
const nextRoundBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#new-game");
const statusContainer = document.querySelector("#status-container");
const helloContainer = document.querySelector("#hello-container");
const turnCheck = document.querySelector("#turn-check");
const roundCount = document.querySelector("#round-no");
const playerScore = document.querySelector("#user-points");
const computerScore = document.querySelector("#pc-points");
const computerVal = document.querySelector(".pc-value");

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

let playerData = {
   nickname: nickname,
   score: 0,
};

let computerData = {
   score: 0,
};
let round = 0;
let gameStatus = "";

// start game
//
startGame();

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

// initialize game
function startGame() {
   // startRound();
   turnCheck.textContent = `${nickname}`;
   createGame();
   // select all created cells
   const cells = document.querySelectorAll(".cell");
   // add click event listener to each cell to get values
   cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
         const cellIndex = e.target.id;
         // console.log(cellIndex);
         // console.log(player);

         // add class to cell to prevent clicking again
         cell.classList.add("clicked");
         // update cells with functions
         updateCell(cellIndex);

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
         winColor(condition);
         roundWon = true;
         // count points
         countPoints();
         break;
      }
   }
   // if round is won, display winner
   if (roundWon) {
      if (player == "X") {
         // statusText.textContent = `Congratulations, ${nickname} wins!`;

         nextRoundBtn.classList.remove("hide");
         checkGameStatus();
      } else {
         // statusText.textContent = `Computer wins!`;

         nextRoundBtn.classList.remove("hide");
         checkGameStatus();
      }
      // disable pointer events on game container
      gameContainer.classList.add("game-over");
      // if round is not won, check if game is a draw
   } else if (!gameBoard.includes("")) {
      // select all cells and change background color to yellow
      drawColor();
      statusText.textContent = `Game is Draw!`;
      // nextRoundBtn.classList.remove("hide");
      // else change player
   } else {
      changePlayer();
      // checkGameStatus();
   }
}

function updateCell(cellIndex) {
   // update game board when cell is clicked
   gameBoard[cellIndex] = player;
   const cell = document.getElementById(cellIndex);
   cell.classList.add("clicked");
   cell.textContent = player;
}

// after each turn change player
function changePlayer() {
   player = player == "X" ? "O" : "X";
   if (player == "X") {
   } else {
      computerPlay();
   }
}

// new game
newGameBtn.addEventListener("click", () => {
   // refresh page
   window.location.reload();
   // window.location.href = "../index.html";
});

// restart game
nextRoundBtn.addEventListener("click", () => {
   nextRoundBtn.classList.add("hide");
   // console.log("clicked");
   startRound();
});

// function for win condition to change background color
function winColor(condition) {
   for (let i = 0; i < condition.length; i++) {
      const cell = document.getElementById(condition[i]);
      cell.classList.add("win");
   }
}

// funtion for draw condition to change background color
function drawColor() {
   const cells = document.querySelectorAll(".cell");
   cells.forEach((cell) => cell.classList.add("draw"));
   nextRoundBtn.classList.remove("hide");
}

// reset startRound function
function startRound() {
   // nextRoundBtn.classList.add("hide");
   countRounds();
   // reset game board
   gameBoard = ["", "", "", "", "", "", "", "", ""];
   // reset player
   player = "X";
   // reset game container
   const cells = document.querySelectorAll(".cell");
   cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("clicked", "win", "draw");
      gameContainer.classList.remove("game-over");
   });
}

// function for computer to play
function computerPlay() {
   // get random number from 0 to 8
   const random = Math.floor(Math.random() * 9);
   console.log(random);
   // check if cell is empty
   if (gameBoard[random] == "") {
      // if empty, update cell
      updateCell(random);
      // check winner
      checkWinner();
      // if not empty, run function again
   } else {
      computerPlay();
   }
}

// functio to count rounds
function countRounds() {
   round++;
   roundCount.textContent = `${round}`;
   // console.log(roundCount.textContent);
   //
}

// function to count points
function countPoints() {
   if (player == "X") {
      playerData.score++;
      playerScore.textContent = `${playerData.score}`;
      // show next round button
      // nextRoundBtn.classList.remove("hide");
   } else {
      computerData.score++;
      computerScore.textContent = `${computerData.score}`;
      // computerVal.classList.add("hide");
   }
}

// function to check if game is over
function checkGameStatus() {
   if (playerData.score == 2) {
      statusText.textContent = `${nickname} wins the game!`;
      gameContainer.classList.add("game-over");
      nextRoundBtn.classList.add("hide");
      computerVal.classList.add("hide");
   } else if (computerData.score == 2) {
      statusText.textContent = `Computer wins the game!`;
      gameContainer.classList.add("game-over");
      nextRoundBtn.classList.add("hide");
      statusContainer.innerHTML = "Computer Wind!";
   }
}
