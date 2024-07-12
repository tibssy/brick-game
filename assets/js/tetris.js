import { globals, constants } from "./globals.js";
import { insertToMatrix, renderIndicator, renderOnGrid } from "./display.js";

export function buildTetris() {
    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
}

export function playTetris() {
    console.log("play...");
    initializeGame();
    setupControlButtons();
    startGameLoop();
}

function initializeGame() {
    globals.currentBrick = globals.nextBrick;
    globals.brickPosition = [
        Math.floor((globals.gridSize[0] - globals.currentBrick[0].length) / 2),
        0,
    ];
    globals.nextBrick = getRandomBrick();

    updateBrickMatrix();
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
    renderIndicator(globals.nextBrick);
}

function setupControlButtons() {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        console.log(button);
        button.addEventListener("click", handleControlButtonClick);
    }
}

function startGameLoop() {
    setInterval(() => {
        globals.brickPosition[1]++;

        if (isBrickAtBottom()) {
            moveToNextBrick();
        }

        updateBrickMatrix();
        renderOnGrid(globals.gameGrid, globals.brickMatrix);
    }, globals.interval);
}

function isBrickAtBottom() {
    return globals.gridSize[1] - globals.currentBrick.length < globals.brickPosition[1];
}

function moveToNextBrick() {
    console.log("next brick");
    globals.currentBrick = globals.nextBrick;
    globals.brickPosition = [
        Math.floor((globals.gridSize[0] - globals.currentBrick[0].length) / 2),
        0,
    ];
    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
    globals.gameMatrix = globals.brickMatrix;
}

function updateBrickMatrix() {
    globals.brickMatrix = insertToMatrix(globals.currentBrick, globals.brickPosition);
}

function getRandomBrick() {
    const bricks = constants.bricks;
    const brickIndex = Math.floor(Math.random() * bricks.length);
    let brick = bricks[brickIndex];
    let maxRotation = brickIndex >= 4 ? 3 : brickIndex >= 1 ? 1 : 0;

    const rotationCount = Math.floor(Math.random() * maxRotation);

    for (let i = 0; i < rotationCount; i++) {
        brick = rotateBrick(brick, "clockwise");
    }

    return brick;
}

function rotateBrick(brick, direction) {
    const rotateClockwise = (matrix) =>
        matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());

    const rotateCounterclockwise = (matrix) =>
        matrix[0].map((val, index) => matrix.map((row) => row[row.length - 1 - index]));

    if (direction === "clockwise") {
        return rotateClockwise(brick);
    } else if (direction === "counterclockwise") {
        return rotateCounterclockwise(brick);
    } else {
        throw new Error('Invalid rotation direction. Use "clockwise" or "counterclockwise".');
    }
}

function handleControlButtonClick(event) {
    const buttonId = event.currentTarget.id;

    switch (buttonId) {
        case "rotate-left-button":
            globals.currentBrick = rotateBrick(globals.currentBrick, "counterclockwise");
            break;
        case "rotate-right-button":
            globals.currentBrick = rotateBrick(globals.currentBrick, "clockwise");
            break;
        case "left-button":
            globals.brickPosition[0]--;
            break;
        case "right-button":
            globals.brickPosition[0]++;
            break;
        case "down-button":
            globals.brickPosition[1]++;
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }

    updateBrickMatrix();
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}
