import { globals, constants } from "./globals.js";
import { insertToMatrix, renderOnGrid } from "./display.js";

export function playSnake() {
    console.log("play...");
    initializeGame();
    // setupControlButtons();
    startGameLoop();
}

function initializeGame() {
    globals.snakePosition = {
        head: [Math.ceil(globals.gridSize[0] / 2), globals.gridSize[1] - constants.snake.length],
        tail: [Math.ceil(globals.gridSize[0] / 2), globals.gridSize[1]],
    };
    globals.snakeMatrix = insertToMatrix(constants.snake, globals.snakePosition.head);
    renderOnGrid(globals.gameGrid, globals.snakeMatrix);
}

function startGameLoop() {
    const gameLoop = setInterval(() => {
        moveSnake();
    }, globals.interval);
}

function moveSnake() {}
