import { globals, constants } from "./globals.js";
import {
    insertToMatrix,
    renderIndicator,
    renderOnGrid,
    updateAnimationTransition,
    applyTemporaryAnimation,
} from "./display.js";
import { exitGame } from "./game.js";
import { updateTetrisScore } from "./score.js";

/**
 * Initializes the Tetris game by setting up the brick indicator and generating the first brick.
 */
export function buildTetris() {
    document.getElementById("brick-indicator").style.display = "flex";
    document.getElementById("up-button").innerHTML =
        globals.rotation === "clockwise"
            ? `<i class="fa-solid fa-rotate-right"></i>`
            : `<i class="fa-solid fa-rotate-left"></i>`;
    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
}

/**
 * Starts the Tetris game by initializing the game and starting the game loop.
 */
export function playTetris() {
    initializeGame();
    startGameLoop();
}

/**
 * Initializes the game state, including the current brick and its position.
 */
function initializeGame() {
    globals.currentBrick = globals.nextBrick;
    globals.position = [Math.ceil((globals.gridSize[0] - globals.currentBrick[0].length) / 2), 0];
    globals.nextBrick = getRandomBrick();

    updateBrickMatrix();
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
    renderIndicator(globals.nextBrick);
}

/**
 * Starts the game loop, which updates the game state at regular intervals.
 */
function startGameLoop() {
    globals.isPlaying = true;

    globals.gameUpdate = () => {
        if (globals.isPlaying) {
            updateAnimationTransition();
            globals.position[1]++; // Move the brick down one row

            if (isBrickAtBottom()) {
                moveToNextBrick();
            }

            let matrix = insertToMatrix(globals.currentBrick, globals.position);

            if (isCollision(matrix)) {
                if (globals.position[1] <= 1) {
                    exitGame(); // End the game if the brick is at the top
                }
                moveToNextBrick();
                updateBrickMatrix();
            } else {
                globals.brickMatrix = matrix;
            }

            renderOnGrid(globals.gameGrid, globals.brickMatrix);
        }
    };

    globals.gameLoop = setInterval(globals.gameUpdate, globals.interval); // Update game state at regular intervals
}

/**
 * Checks if the current brick has collided with other bricks.
 *
 * @param {Array} matrix - The matrix representing the current state of the grid.
 * @returns {boolean} - True if there is a collision, otherwise false.
 */
function isCollision(matrix) {
    return matrix.flat().includes(2);
}

/**
 * Checks if the current brick has reached the bottom of the grid.
 *
 * @returns {boolean} - True if the brick is at the bottom, otherwise false.
 */
function isBrickAtBottom() {
    return globals.gridSize[1] - globals.currentBrick.length < globals.position[1];
}

/**
 * Cleans up any full rows in the game matrix and updates the score.
 */
function cleanFullRows() {
    let lines = 0;

    globals.gameMatrix.forEach((row, rowIndex) => {
        // Check if the row is full
        if (row.every(Boolean)) {
            globals.gameMatrix.splice(rowIndex, 1);
            globals.gameMatrix.splice(0, 0, Array(row.length).fill(0));
            lines++;
        }
    });

    if (lines) {
        updateTetrisScore(lines);
        animateGridUpdate();
    }
}

/**
 * Applies an animation to the grid if animations are disabled.
 */
function animateGridUpdate() {
    if (globals.animation) return;

    applyTemporaryAnimation();
}

/**
 * Moves to the next brick and updates the game state.
 */
function moveToNextBrick() {
    globals.currentBrick = globals.nextBrick;
    globals.position = [Math.ceil((globals.gridSize[0] - globals.currentBrick[0].length) / 2), 0];
    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
    globals.gameMatrix = globals.brickMatrix;
    cleanFullRows();
}

/**
 * Updates the brick matrix with the current brick and its position.
 */
function updateBrickMatrix() {
    globals.brickMatrix = insertToMatrix(globals.currentBrick, globals.position);
}

/**
 * Generates a random brick and applies a random rotation if applicable.
 *
 * @returns {Array} - The randomly selected and possibly rotated brick.
 */
function getRandomBrick() {
    let bricks = constants.bricks;
    let brickIndex;

    if (globals.game === "tetris extra" && Math.floor(Math.random() * 2)) {
        bricks = constants.bricksMod;
    }

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

/**
 * Rotates a brick matrix either clockwise or counterclockwise.
 *
 * @param {Array} brick - The matrix representing the brick.
 * @returns {Array} - The rotated brick matrix.
 */
export function rotateBrick(brick) {
    const dimensionDifference = brick[0].length - brick.length;

    globals.position[0] += Math.trunc(dimensionDifference / 2);
    globals.position[1] -= dimensionDifference;

    const rotateClockwise = (matrix) => matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());

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

/**
 * Updates the game state based on the previous position and brick state.
 *
 * @param {Array} previousPosition - The position of the brick before the update.
 * @param {Array} previousBrickState - The state of the brick before the update.
 */
export function updateGameState(previousPosition, previousBrickState) {
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
