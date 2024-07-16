import { globals } from "./globals.js";
import { insertToMatrix, renderOnGrid } from "./display.js";

export function buildSnake() {
    globals.snake = Array.from({ length: globals.snakeLength }, () => [1]);
}

export function playSnake() {
    console.log("play...");
    initializeGame();
    setupControlButtons();
    if (globals.paltform === "desktop") {
        setupKeyboardControls();
    }
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
    getRandomSnakeFood();
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}

function setupControlButtons() {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleControlButtonClick);
    }
}

function setupKeyboardControls() {
    document.addEventListener("keydown", handleKeyDown);
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

function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            globals.snakeDirection = "up";
            break;
        case "ArrowLeft":
            globals.snakeDirection = "left";
            break;
        case "ArrowRight":
            globals.snakeDirection = "right";
            break;
        case "ArrowDown":
            globals.snakeDirection = "down";
            break;
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
            updatePosition();
            if (isPositionInMatrix() && !isCollision(globals.position)) {
                if (isCollision(globals.snakeFood)) {
                    growSnake();
                    getRandomSnakeFood();
                } else {
                    moveSnake();
                }

                renderOnGrid(globals.gameGrid, globals.gameMatrix);
            } else {
                console.log("Game Over");
                clearInterval(gameLoop);
            }
        }
    }, globals.interval / 2);
}

function updatePosition() {
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
}

function isPositionInMatrix() {
    const [positionX, positionY] = globals.position;
    const [gridWidth, gridHeight] = globals.gridSize;

    return positionX >= 0 && positionX < gridWidth && positionY >= 0 && positionY < gridHeight;
}

function isCollision(position) {
    const snakeBody = [...globals.snakeBody];
    return snakeBody.some((pos) => pos[0] === position[0] && pos[1] === position[1]);
}

function growSnake() {
    globals.snakeBody.splice(0, 0, [...globals.position]);
    globals.gameMatrix[globals.position[1]][globals.position[0]] = 1;
}

function moveSnake() {
    let snakeTail;

    growSnake();
    snakeTail = globals.snakeBody.pop();
    globals.gameMatrix[snakeTail[1]][snakeTail[0]] = 0;
}

function getRandomSnakeFood() {
    const [gridWidth, gridHeight] = globals.gridSize;
    let snakeFood;

    do {
        snakeFood = [Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight)];
    } while (isCollision(snakeFood));

    globals.gameMatrix[snakeFood[1]][snakeFood[0]] = 1;
    globals.snakeFood = snakeFood;
}
