// select game container to append game cells
const gameContainer = document.querySelector("#game-container");

// create game board 3x3
// gameboard is an array of 9 elements
// each element is a div
// each div has an id
// each div has a class
function gameBoard() {
   const board = [];
   // create 9 divs of cells inside of game container
   for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("id", `${i}`);
      cell.setAttribute("class", "cell");
      gameContainer.appendChild(cell);
      board.push(i);
   }

   return board;

   // console.log(board)
}

// generate gameboard on page load
const getGameBoard = gameBoard();

// console.log(cells)
console.log(getGameBoard);

// create click event listener for each cell
function clickCell() {
   // player 1 value is X
   const player1 = "X";
   // player 2 value is O
   const player2 = "O";
   // playing value
   let playingValue = player1;

   // select all created celss
   const cells = document.querySelectorAll(".cell");
   // create click event listener for each cell
   cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
         // console.log(e.target.id, ` was clicked`);
         // change cell value on click
         const cellValue = e.target;
         //  disable to click on same cell twice
         cellValue.classList.add("clicked");
         //  change cell value to playing value
         cellValue.innerHTML = playingValue;
         //  change X to O or vice versa
         playingValue = playingValue === player1 ? player2 : player1;

         console.log(cellValue);
         //  console.log(getGameBoard);
      })
   );
}

clickCell();
// const cells = document.querySelectorAll(".cell");

// cells.forEach(cell => cell.addEventListener("click", e => {
//     console.log(e.target.id, ` was clicked`)
// }));
