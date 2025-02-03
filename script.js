const gridContainer = document.getElementById("puzzle-grid");
const shuffleBtn = document.getElementById("shuffle-btn");
const resetBtn = document.getElementById("reset-btn");
const movesDisplay = document.getElementById("moves");

let grid = [];
let moves = 0;

const createGrid = () => {
    grid = [];
    for (let i = 0; i < 16; i++) {
        grid.push(i);
    }
    renderGrid();
};

const renderGrid = () => {
    gridContainer.innerHTML = "";
    grid.forEach((tile, index) => {
        const tileElement = document.createElement("div");
        tileElement.classList.add("tile");
        tileElement.textContent = tile === 0 ? "" : tile;
        if (tile === 0) {
            tileElement.classList.add("empty");
        }
        tileElement.setAttribute("data-index", index);
        tileElement.addEventListener("click", handleTileClick);
        gridContainer.appendChild(tileElement);
    });
};

const handleTileClick = (event) => {
    const tileIndex = parseInt(event.target.getAttribute("data-index"));
    const emptyTileIndex = grid.indexOf(0);
    const validMoves = [
        emptyTileIndex - 1, // left
        emptyTileIndex + 1, // right
        emptyTileIndex - 4, // up
        emptyTileIndex + 4, // down
    ];

    if (validMoves.includes(tileIndex) && isAdjacent(emptyTileIndex, tileIndex)) {
        swapTiles(emptyTileIndex, tileIndex);
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
    }
};

const isAdjacent = (emptyTileIndex, tileIndex) => {
    const rowDifference = Math.abs(Math.floor(emptyTileIndex / 4) - Math.floor(tileIndex / 4));
    return rowDifference <= 1 && Math.abs(emptyTileIndex - tileIndex) === 1 || rowDifference === 1 && Math.abs(emptyTileIndex - tileIndex) === 4;
};

const swapTiles = (emptyTileIndex, tileIndex) => {
    [grid[emptyTileIndex], grid[tileIndex]] = [grid[tileIndex], grid[emptyTileIndex]];
    renderGrid();
    checkForWin();
};

const shuffleGrid = () => {
    for (let i = 0; i < 1000; i++) {
        const emptyTileIndex = grid.indexOf(0);
        const validMoves = [
            emptyTileIndex - 1, // left
            emptyTileIndex + 1, // right
            emptyTileIndex - 4, // up
            emptyTileIndex + 4, // down
        ].filter((index) => index >= 0 && index < 16);

        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        swapTiles(emptyTileIndex, randomMove);
    }
    moves = 0;
    movesDisplay.textContent = `Moves: ${moves}`;
};

const checkForWin = () => {
    if (grid.join("") === "1234567891011121314150") {
        alert("Congratulations! You've solved the puzzle!");
    }
};

createGrid();

shuffleBtn.addEventListener("click", shuffleGrid);
resetBtn.addEventListener("click", createGrid);