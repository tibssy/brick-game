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
        Math.ceil((globals.gridSize[0] - globals.currentBrick[0].length) / 2),
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

        let matrix = insertToMatrix(globals.currentBrick, globals.brickPosition);

        if (isCollision(matrix)) {
            moveToNextBrick();
            updateBrickMatrix();
        } else {
            globals.brickMatrix = matrix;
        }

        renderOnGrid(globals.gameGrid, globals.brickMatrix);
    }, globals.interval);
}

function isCollision(matrix) {
    return matrix.flat().includes(2);
}

function isBrickAtBottom() {
    return globals.gridSize[1] - globals.currentBrick.length < globals.brickPosition[1];
}

function cleanFullRows() {
    globals.gameMatrix.forEach((row, rowIndex) => {
        if (row.every(Boolean)) {
            globals.gameMatrix.splice(rowIndex, 1);
            globals.gameMatrix.splice(0, 0, Array(row.length).fill(0));
        }
    });
}

function moveToNextBrick() {
    console.log("next brick");
    globals.currentBrick = globals.nextBrick;
    globals.brickPosition = [
        Math.ceil((globals.gridSize[0] - globals.currentBrick[0].length) / 2),
        0,
    ];
    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
    globals.gameMatrix = globals.brickMatrix;
    cleanFullRows();
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
    const dimensionDifference = brick[0].length - brick.length;

    globals.brickPosition[0] += Math.trunc(dimensionDifference / 2);
    globals.brickPosition[1] -= dimensionDifference;

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
    const previousBrickPosition = [...globals.brickPosition];
    const previousBrickState = globals.currentBrick.map((innerArray) => [...innerArray]);

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

    let matrix = insertToMatrix(globals.currentBrick, globals.brickPosition);
    if (isCollision(matrix)) {
        globals.brickPosition = previousBrickPosition;
        globals.currentBrick = previousBrickState;
        matrix = insertToMatrix(globals.currentBrick, globals.brickPosition);
    }

    globals.brickMatrix = matrix;
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}
