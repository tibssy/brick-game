import { globals } from "./globals.js";
import { insertToMatrix, renderOnGrid } from "./display.js";

export function buildSnake() {
    globals.snake = Array.from({ length: globals.snakeLength }, () => [1]);
}

export function playSnake() {
    console.log("play...");
    initializeGame();
    setupControlButtons();
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

function setupControlButtons() {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleControlButtonClick);
    }
}

function handleControlButtonClick(event) {
    const buttonId = event.currentTarget.id;

    switch (buttonId) {
        case "exit-button":
            console.log("exit...");
            break;
        case "break-button":
            globals.isPlaying = !globals.isPlaying;
            invertGameMatrix();
            break;
        case "up-button":
            globals.snakeDirection = "up";
            break;
        case "left-button":
            globals.snakeDirection = "left";
            break;
        case "right-button":
            globals.snakeDirection = "right";
            break;
        case "down-button":
            globals.snakeDirection = "down";
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }
}

function invertGameMatrix() {
    globals.gameMatrix = globals.gameMatrix.map((row) =>
        row.map((element) => (element === 0 ? 1 : 0))
    );
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}

function startGameLoop() {
    globals.isPlaying = true;

    const gameLoop = setInterval(() => {
        if (globals.isPlaying) {
            moveSnake();
        }
    }, globals.interval);
}

function moveSnake() {
    let snakeTail;
    let position = [...globals.position];

    switch (globals.snakeDirection) {
        case "up":
            position[1]--;
            break;
        case "down":
            position[1]++;
            break;
        case "left":
            position[0]--;
            break;
        case "right":
            position[0]++;
            break;
    }

    globals.position = position;
    globals.snakeBody.splice(0, 0, [...globals.position]);
    snakeTail = globals.snakeBody.pop();
    globals.gameMatrix[snakeTail[1]][snakeTail[0]] = 0;
    globals.gameMatrix[globals.position[1]][globals.position[0]] = 1;
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}
