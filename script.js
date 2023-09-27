// create game board 3x3
// gameboard is an array of 9 elements
// each element is a div
// each div has an id
// each div has a class
function gameBoard() {
    // select game container to append game cells
    const gameContainer = document.querySelector("#game-container");
    const board = [];
    // create 9 divs of cells inside of game container
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `cell-${i}`);
        cell.setAttribute("class", "cell");
        gameContainer.appendChild(cell);
        board.push(cell);
    }
}

gameBoard();
