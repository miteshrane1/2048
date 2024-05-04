const gameContainer = document.getElementById('game-container');
const tiles = gameContainer.children;

let gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let score = 0;

function initGame() {
    // Initialize game board and tiles
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = tiles[i * 4 + j];
            tile.textContent = '';
            tile.className = 'tile';
            if (Math.random() < 0.9) { // Adjusted probability to 90%
                gameBoard[i][j] = 0; // Initialize empty tile
            } else {
                gameBoard[i][j] = 2; // Initialize tile with value 2
                tile.textContent = 2;
                tile.className += ' merge';
            }
        }
    }
}


function handleInput(event) {
    const key = event.key.toLowerCase(); 
    switch (key) {
        case "arrowup":
            moveTilesUp();
            checkWin();
            // Move tiles up
            break;
        case "arrowdown":
            moveTilesDown();
            checkWin();
            // Move tiles down
            break;
        case "arrowleft":
            moveTilesLeft();
            checkWin();
            // Move tiles left
            break;
        case "arrowright":
            moveTilesRight();
            checkWin();
            // Move tiles right
            break;
    }
}

function updateGame() {
    // Update game state and tile values
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = tiles[i * 4 + j];
            tile.textContent = gameBoard[i][j];
            tile.className = gameBoard[i][j] === 0 ? 'tile' : 'tile merge';
        }
    }
}

function checkWin() {
    // Check for winning conditions (e.g., reaching 2048)
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameBoard[i][j] === 2048) {
                alert('You won!');
                return;
            }
        }
    }
}
function moveTilesUp() {
    for (let j = 0; j < 4; j++) { // Iterate through columns
        for (let i = 1; i < 4; i++) { // Iterate through rows (start from second row)
            if (gameBoard[i][j] !== 0) { // If current tile is not empty
                let currentRow = i;
                while (currentRow > 0) { // Move tile upwards until it reaches top
                    let aboveTile = gameBoard[currentRow - 1][j];
                    if (aboveTile === 0 || aboveTile === gameBoard[currentRow][j]) { // Merge tiles if above tile is empty or has the same value
                        gameBoard[currentRow - 1][j] += gameBoard[currentRow][j];
                        gameBoard[currentRow][j] = 0;
                        break; // Exit loop after merging
                    }
                    currentRow--; // Move to the tile above
                }
            }
        }
    }
    updateGame(); // Update the UI after moving tiles
    // Here you can add logic for generating new tiles
}
function moveTilesDown() {
    for (let j = 0; j < 4; j++) { // Iterate through columns
        for (let i = 2; i >= 0; i--) { // Iterate through rows (start from second to last row)
            if (gameBoard[i][j] !== 0) { // If current tile is not empty
                let currentRow = i;
                while (currentRow < 3) { // Move tile downwards until it reaches bottom
                    let belowTile = gameBoard[currentRow + 1][j];
                    if (belowTile === 0 || belowTile === gameBoard[currentRow][j]) { // Merge tiles if below tile is empty or has the same value
                        gameBoard[currentRow + 1][j] += gameBoard[currentRow][j];
                        gameBoard[currentRow][j] = 0;
                        break; // Exit loop after merging
                    }
                    currentRow++; // Move to the tile below
                }
            }
        }
    }
    updateGame(); // Update the UI after moving tiles
    // Here you can add logic for generating new tiles
}

function moveTilesLeft() {
    for (let i = 0; i < 4; i++) { // Iterate through rows
        for (let j = 1; j < 4; j++) { // Iterate through columns (start from second column)
            if (gameBoard[i][j] !== 0) { // If current tile is not empty
                let currentColumn = j;
                while (currentColumn > 0) { // Move tile to the left until it reaches leftmost column
                    let leftTile = gameBoard[i][currentColumn - 1];
                    if (leftTile === 0 || leftTile === gameBoard[i][currentColumn]) { // Merge tiles if left tile is empty or has the same value
                        gameBoard[i][currentColumn - 1] += gameBoard[i][currentColumn];
                        gameBoard[i][currentColumn] = 0;
                        break; // Exit loop after merging
                    }
                    currentColumn--; // Move to the left tile
                }
            }
        }
    }
    updateGame(); // Update the UI after moving tiles
    // Here you can add logic for generating new tiles
}

function moveTilesRight() {
    for (let i = 0; i < 4; i++) { // Iterate through rows
        for (let j = 2; j >= 0; j--) { // Iterate through columns (start from second to last column)
            if (gameBoard[i][j] !== 0) { // If current tile is not empty
                let currentColumn = j;
                while (currentColumn < 3) { // Move tile to the right until it reaches rightmost column
                    let rightTile = gameBoard[i][currentColumn + 1];
                    if (rightTile === 0 || rightTile === gameBoard[i][currentColumn]) { // Merge tiles if right tile is empty or has the same value
                        gameBoard[i][currentColumn + 1] += gameBoard[i][currentColumn];
                        gameBoard[i][currentColumn] = 0;
                        break; // Exit loop after merging
                    }
                    currentColumn++; // Move to the right tile
                }
            }
        }
    }
    updateGame(); // Update the UI after moving tiles
    // Here you can add logic for generating new tiles
}
function generateRandomTile() {
    let emptyPositions = [];
    // Find all empty positions on the game board
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameBoard[i][j] === 0) {
                emptyPositions.push({ row: i, column: j });
            }
        }
    }
    // If there are no empty positions, do nothing
    if (emptyPositions.length === 0) {
        return;
    }
    // Choose a random empty position
    let randomPositionIndex = Math.floor(Math.random() * emptyPositions.length);
    let randomPosition = emptyPositions[randomPositionIndex];
    // Assign a value of 2 or 4 to the randomly chosen empty position
    gameBoard[randomPosition.row][randomPosition.column] = Math.random() < 0.9 ? 2 : 4; // Adjust probability to 90% for 2 and 10% for 4
}


document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', handleInput);
document.addEventListener('keyleft', handleInput);
document.addEventListener('keyright', handleInput);
initGame();
