import { buildTetris, playTetris } from "./tetris.js";
import { buildSnake, playSnake } from "./snake.js";
import { globals, constants } from "./globals.js";
import {
    removeAllEventListeners,
    setTetrisControls,
    setSnakeControls,
    setupPowerControls,
    setupLongTouchControl,
} from "./controls.js";
import {
    generateGrid,
    renderOnGrid,
    insertToMatrix,
    invertGrid,
    displayLevel,
    applyTemporaryAnimation,
    updateGameText,
} from "./display.js";
import { highScore, resetScore } from "./score.js";
import { switchToArea } from "./main.js";

/**
 * Starts the selected game and initializes necessary components.
 */
export function startGame() {
    initializeGameMatrix();
    initializeGameGrid();
    updateGameText();
    generateGrid(globals.gameGrid, globals.gridSize);
    displayLevel();

    switch (globals.game) {
        case "tetris":
        case "tetris extra":
            setupTetrisGame();
            break;
        case "snake":
            setupSnakeGame();
            break;
        default:
            alert("No game selected");
            break;
    }
}

/**
 * Initializes the game matrix with default value of zeros.
 */
function initializeGameMatrix() {
    globals.gameMatrix = Array.from(Array(globals.gridSize[1]), () => Array(globals.gridSize[0]).fill(0));
}

/**
 * Initializes the game grid display element.
 */
function initializeGameGrid() {
    globals.gameGrid = document.getElementById("game-display");
}

/**
 * Sets up the Tetris game and starts the countdown.
 */
function setupTetrisGame() {
    buildTetris();
    countDown(() => {
        setupLongTouchControl();
        setupPowerControls();
        setTetrisControls();
        playTetris();
    });
}

/**
 * Sets up the Snake game and starts the countdown.
 */
function setupSnakeGame() {
    buildSnake();
    countDown(() => {
        setupPowerControls();
        setSnakeControls();
        playSnake();
    });
}

/**
 * Displays a countdown before starting the game.
 *
 * @param {Function} callback - The function to call after the countdown.
 */
function countDown(callback) {
    const position = [
        Math.floor((globals.gridSize[0] - constants.countdownNumbers[0][0].length) / 2),
        Math.floor((globals.gridSize[1] - constants.countdownNumbers[0].length) / 2),
    ];

    let countDownValue = 3;

    const countdownInterval = setInterval(() => {
        // If the countdown reaches zero
        if (!countDownValue) {
            clearInterval(countdownInterval); // Stop the countdown timer

            // If a callback function is provided and is a function
            if (callback && typeof callback === "function") {
                callback(); // Execute the callback function
            }
        } else {
            // Insert the current countdown number into the game matrix and render the number on the game grid
            const numberArray = insertToMatrix(constants.countdownNumbers[countDownValue - 1], position);
            renderOnGrid(globals.gameGrid, numberArray);
        }

        countDownValue--;
    }, 1000); // The interval executes every 1000 milliseconds (1 second)
}

/**
 * Handles changes in device orientation.
 */
export function handleOrientationChange() {
    const powerButtons = document.querySelector("#power-buttons");
    const gameControls = document.querySelector("#game-controls");

    if (window.screen.orientation.type === "portrait-primary") {
        powerButtons.style.display = globals.isPlaying ? "none" : "flex";
        gameControls.style.display = globals.isPlaying ? "flex" : "none";
    } else {
        powerButtons.style.display = globals.isPlaying ? "" : "";
        gameControls.style.display = globals.isPlaying ? "" : "";
    }
}

/**
 * Toggles the pause state of the game.
 */
export function toggleGamePause() {
    const breakButton = document.getElementById("break-button");
    globals.isPlaying = !globals.isPlaying;
    breakButton.innerHTML = globals.isPlaying
        ? `<i class="fa-solid fa-pause"></i>`
        : `<i class="fa-solid fa-play"></i>`;

    applyTemporaryAnimation();
    invertGrid();

    handleOrientationChange();
}

/**
 * Restarts the game from the beginning.
 */
export function restartGame() {
    resetScore();
    resetGame();
    startGame();
}

/**
 * Exits the game and displays the appropriate screen.
 */
export function exitGame() {
    resetGame();

    if (globals.score) {
        highScore();
        switchToArea("score-area");
    } else {
        switchToArea("settings-area");
    }
}

/**
 * Resets the game state and clears the game display.
 */
function resetGame() {
    globals.isPlaying = false;
    clearInterval(globals.gameLoop);
    globals.gameGrid.innerHTML = "";
    document.getElementById("brick-indicator").style.display = "";
    resetButtons();
    applyTemporaryAnimation();
}

/**
 * Resets the game control buttons to their default state.
 */
function resetButtons() {
    globals.snakeDirection = "up";
    removeAllEventListeners();
    document.getElementById("break-button").innerHTML = `<i class="fa-solid fa-pause"></i>`;
    document.querySelector("#power-buttons").style.display = "";
    document.querySelector("#game-controls").style.display = "";
}

/**
 * Restarts the game loop with the current game update function and interval.
 */
export function restartGameLoop() {
    if (globals.gameLoop) {
        clearInterval(globals.gameLoop);
        globals.gameLoop = setInterval(globals.gameUpdate, globals.interval);
    }
}
