import { buildTetris, playTetris } from "./tetris.js";
import { buildSnake, playSnake } from "./snake.js";
import { globals, constants } from "./globals.js";
import {
    setupPowerButtons,
    setupTetrisControls,
    setupSnakeControls,
    removeAllEventListeners,
} from "./controls.js";
import {
    generateGrid,
    renderOnGrid,
    insertToMatrix,
    invertGameMatrix,
    invertBrickMatrix,
} from "./display.js";
import { openSettings } from "./settings.js";

export function startGame() {
    globals.gameMatrix = Array.from(Array(globals.gridSize[1]), () =>
        Array(globals.gridSize[0]).fill(0)
    );
    globals.gameGrid = document.getElementById("game-display");
    generateGrid(globals.gameGrid, globals.gridSize);

    switch (globals.game) {
        case "tetris":
        case "tetrismod":
            buildTetris();
            countDown(() => {
                setupPowerButtons();
                setupTetrisControls();
                playTetris();
            });
            break;
        case "snake":
            buildSnake();
            countDown(() => {
                setupPowerButtons();
                setupSnakeControls();
                playSnake();
            });
            break;
        default:
            alert("No game selected");
            break;
    }
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
            const numberArray = insertToMatrix(
                constants.countdownNumbers[countDownValue - 1],
                position
            );
            renderOnGrid(globals.gameGrid, numberArray);
        }

        countDownValue--;
    }, 1000);
}

export function toggleGamePause() {
    const powerButtons = document.querySelector("#power-buttons");
    const gameControls = document.querySelector("#game-controls");
    const invertMatrix = globals.game === "snake" ? invertGameMatrix : invertBrickMatrix;
    globals.isPlaying = !globals.isPlaying;
    invertMatrix();

    if (window.screen.width < window.screen.height) {
        powerButtons.style.display = globals.isPlaying ? "none" : "flex";
        gameControls.style.display = globals.isPlaying ? "flex" : "none";
    }
}

export function restartGame() {
    resetGame();
    startGame();
}

export function exitGame() {
    resetGame();
    openSettings();
}

function resetGame() {
    globals.isPlaying = false;
    clearInterval(globals.gameLoop);
    globals.gameGrid.innerHTML = "";
    removeAllEventListeners();
    document.getElementById("brick-indicator").style.display = "";
    document.querySelector("#power-buttons").style.display = "";
    document.querySelector("#game-controls").style.display = "";
}
