import { globals } from "./globals.js";
import { insertToMatrix, renderOnGrid } from "./display.js";

export function buildSnake() {
    globals.snake = Array.from({ length: globals.snakeLength }, () => [1]);
}

export function playSnake() {
    console.log("play...");
    initializeGame();
    // setupControlButtons();
    startGameLoop();
}

function initializeGame() {
    globals.position = [
        Math.ceil(globals.gridSize[0] / 2),
        globals.gridSize[1] - globals.snakeLength,
    ];
    globals.snakeBody = Array.from({ length: globals.snakeLength }, (_, i) => [
        globals.position[0],
        globals.position[1] + i,
    ]);
    globals.gameMatrix = insertToMatrix(globals.snake, globals.position);
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}

function startGameLoop() {
    const gameLoop = setInterval(() => {
        moveSnake();
    }, globals.interval);
}

function moveSnake() {
    let snakeTail;

    switch (globals.snakeDirection) {
        case "up":
            globals.position[1]--;
            break;
        case "down":
            globals.position[1]++;
            break;
        case "left":
            globals.position[0]--;
            break;
        case "right":
            globals.position[0]++;
            break;
    }

    globals.snakeBody.splice(0, 0, globals.position);
    snakeTail = globals.snakeBody.pop();
    globals.gameMatrix[snakeTail[1]][snakeTail[0]] = 0;
    globals.gameMatrix[globals.position[1]][globals.position[0]] = 1;
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}
