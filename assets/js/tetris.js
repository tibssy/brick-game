import { globals, constants } from "./globals.js";
import { insertToMatrix, renderIndicator, renderOnGrid } from "./display.js";

export function buildTetris() {
    document.getElementById("indicator-container").style.visibility = "visible";
    document.getElementById("up-button").innerHTML =
        globals.rotation === "clockwise"
            ? `<i class="fa-solid fa-rotate-right"></i>`
            : `<i class="fa-solid fa-rotate-left"></i>`;
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
    globals.position = [Math.ceil((globals.gridSize[0] - globals.currentBrick[0].length) / 2), 0];
    globals.nextBrick = getRandomBrick();

    updateBrickMatrix();
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
    renderIndicator(globals.nextBrick);
}

function setupControlButtons() {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleControlButtonClick);
    }
}

function startGameLoop() {
    globals.isPlaying = true;

    const gameLoop = setInterval(() => {
        if (globals.isPlaying) {
            globals.position[1]++;
            if (isBrickAtBottom()) {
                moveToNextBrick();
            }

            let matrix = insertToMatrix(globals.currentBrick, globals.position);

            if (isCollision(matrix)) {
                if (globals.position[1] <= 1) {
                    console.log("Stop Game Loop...");
                    clearInterval(gameLoop);
                }
                moveToNextBrick();
                updateBrickMatrix();
            } else {
                globals.brickMatrix = matrix;
            }

            renderOnGrid(globals.gameGrid, globals.brickMatrix);
        }
    }, globals.interval);
}

function isCollision(matrix) {
    return matrix.flat().includes(2);
}

function isBrickAtBottom() {
    return globals.gridSize[1] - globals.currentBrick.length < globals.position[1];
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
    globals.currentBrick = globals.nextBrick;
    globals.position = [Math.ceil((globals.gridSize[0] - globals.currentBrick[0].length) / 2), 0];
    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
    globals.gameMatrix = globals.brickMatrix;
    cleanFullRows();
}

function updateBrickMatrix() {
    globals.brickMatrix = insertToMatrix(globals.currentBrick, globals.position);
}

function getRandomBrick() {
    const bricks = constants.bricks;
    let brickIndex;

    do {
        brickIndex = Math.floor(Math.random() * bricks.length);
    } while (brickIndex === globals.brickIndex);
    globals.brickIndex = brickIndex;

    let brick = bricks[brickIndex];
    let maxRotation = brickIndex >= 4 ? 3 : brickIndex >= 1 ? 1 : 0;

    const rotationCount = Math.floor(Math.random() * maxRotation);

    for (let i = 0; i < rotationCount; i++) {
        brick = rotateBrick(brick);
    }

    return brick;
}

function rotateBrick(brick) {
    const dimensionDifference = brick[0].length - brick.length;

    globals.position[0] += Math.trunc(dimensionDifference / 2);
    globals.position[1] -= dimensionDifference;

    const rotateClockwise = (matrix) =>
        matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());

    const rotateCounterclockwise = (matrix) =>
        matrix[0].map((val, index) => matrix.map((row) => row[row.length - 1 - index]));

    if (globals.rotation === "clockwise") {
        return rotateClockwise(brick);
    } else if (globals.rotation === "counterclockwise") {
        return rotateCounterclockwise(brick);
    } else {
        throw new Error('Invalid rotation direction. Use "clockwise" or "counterclockwise".');
    }
}

function handleControlButtonClick(event) {
    const buttonId = event.currentTarget.id;
    const previousPosition = [...globals.position];
    const previousBrickState = globals.currentBrick.map((innerArray) => [...innerArray]);

    switch (buttonId) {
        case "exit-button":
            console.log("exit...");
            break;
        case "break-button":
            globals.isPlaying = !globals.isPlaying;
            invertBrickMatrix();
            break;
        case "up-button":
            globals.currentBrick = rotateBrick(globals.currentBrick);
            break;
        case "left-button":
            globals.position[0]--;
            break;
        case "right-button":
            globals.position[0]++;
            break;
        case "down-button":
            globals.position[1]++;
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }

    updateGameState(previousPosition, previousBrickState);
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}

function invertBrickMatrix() {
    globals.brickMatrix = globals.brickMatrix.map((row) =>
        row.map((element) => (element === 0 ? 1 : 0))
    );
}

function updateGameState(previousPosition, previousBrickState) {
    let matrix = insertToMatrix(globals.currentBrick, globals.position);

    if (isCollision(matrix) || !globals.isPlaying) {
        globals.position = previousPosition;
        globals.currentBrick = previousBrickState;
        matrix = insertToMatrix(globals.currentBrick, globals.position);
    }

    if (globals.isPlaying) {
        globals.brickMatrix = matrix;
    }
}
