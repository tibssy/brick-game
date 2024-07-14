import { globals, constants } from "./globals.js";
import { insertToMatrix, renderOnGrid } from "./display.js";

export function playSnake() {
    console.log("play...");
    initializeGame();
    // setupControlButtons();
    startGameLoop();
}

function initializeGame() {
    globals.snakeHeadPosition = [
        Math.ceil(globals.gridSize[0] / 2),
        globals.gridSize[1] - constants.snake.length,
    ];
    globals.snakeTailPosition = [Math.ceil(globals.gridSize[0] / 2), globals.gridSize[1]];
    globals.snakeMatrix = insertToMatrix(constants.snake, globals.snakeHeadPosition);
    renderOnGrid(globals.gameGrid, globals.snakeMatrix);
}

function startGameLoop() {
    const gameLoop = setInterval(() => {
        moveSnake();
    }, globals.interval);
}

function moveSnake() {
    switch (globals.snakeDirection) {
        case "up":
            globals.snakeHeadPosition[1]--;
            break;
        case "down":
            globals.snakeHeadPosition[1]++;
            break;
        case "left":
            globals.snakeHeadPosition[0]--;
            break;
        case "right":
            globals.snakeHeadPosition[0]++;
            break;
    }

    globals.snakeMatrix[globals.snakeHeadPosition[1]][globals.snakeHeadPosition[0]] = 1;
    renderOnGrid(globals.gameGrid, globals.snakeMatrix);
}
