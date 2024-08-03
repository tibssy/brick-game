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
} from "./display.js";
import { highScore } from "./score.js";
import { switchToArea } from "./main.js";

export function startGame() {
    initializeGameMatrix();
    initializeGameGrid();
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

function initializeGameMatrix() {
    globals.gameMatrix = Array.from(Array(globals.gridSize[1]), () => Array(globals.gridSize[0]).fill(0));
}

function initializeGameGrid() {
    globals.gameGrid = document.getElementById("game-display");
}

function setupTetrisGame() {
    buildTetris();
    countDown(() => {
        setupLongTouchControl();
        setupPowerControls();
        setTetrisControls();
        playTetris();
    });
}

function setupSnakeGame() {
    buildSnake();
    countDown(() => {
        setupPowerControls();
        setSnakeControls();
        playSnake();
    });
}

function countDown(callback) {
    const position = [
        Math.floor((globals.gridSize[0] - constants.countdownNumbers[0][0].length) / 2),
        Math.floor((globals.gridSize[1] - constants.countdownNumbers[0].length) / 2),
    ];

    let countDownValue = 3;

    const countdownInterval = setInterval(() => {
        if (!countDownValue) {
            clearInterval(countdownInterval);
            if (callback && typeof callback === "function") {
                callback();
            }
        } else {
            const numberArray = insertToMatrix(constants.countdownNumbers[countDownValue - 1], position);
            renderOnGrid(globals.gameGrid, numberArray);
        }

        countDownValue--;
    }, 1000);
}

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

export function restartGame() {
    resetGame();
    startGame();
}

export function exitGame() {
    const nextArea = globals.score ? "score-area" : "settings-area";

    resetGame();
    highScore();
    switchToArea(nextArea);
}

function resetGame() {
    globals.isPlaying = false;
    clearInterval(globals.gameLoop);
    globals.gameGrid.innerHTML = "";
    globals.snakeDirection = "up";
    removeAllEventListeners();
    document.getElementById("break-button").innerHTML = `<i class="fa-solid fa-pause"></i>`;
    document.getElementById("brick-indicator").style.display = "";
    document.querySelector("#power-buttons").style.display = "";
    document.querySelector("#game-controls").style.display = "";
    applyTemporaryAnimation();
}

export function restartGameLoop() {
    if (globals.gameLoop) {
        clearInterval(globals.gameLoop);
        globals.gameLoop = setInterval(globals.gameUpdate, globals.interval);
    }
}
