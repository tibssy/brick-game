import { buildTetris, playTetris } from "./tetris.js";
import { buildSnake, playSnake } from "./snake.js";
import { globals, constants } from "./globals.js";
import {
    setupPowerButtons,
    setupTetrisControls,
    setupSnakeControls,
    removeAllEventListeners,
} from "./controls.js";
import { generateGrid, renderOnGrid, insertToMatrix } from "./display.js";
import { openModal } from "./main.js";

export function startGame() {
    const platform =
        "ontouchstart" in window || navigator.maxTouchPoints > 0 ? "mobile" : "desktop";
    globals.gameMatrix = Array.from(Array(globals.gridSize[1]), () =>
        Array(globals.gridSize[0]).fill(0)
    );
    globals.gameGrid = document.getElementById("game-display");
    generateGrid(globals.gameGrid, globals.gridSize);

    switch (globals.game) {
        case "tetris":
            buildTetris();
            countDown(() => {
                setupPowerButtons();
                setupTetrisControls(platform);
                playTetris();
            });
            break;
        case "snake":
            buildSnake();
            countDown(() => {
                setupPowerButtons();
                setupSnakeControls(platform);
                playSnake();
            });
            break;
        default:
            console.log("No game selected");
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

export function resetGame() {
    console.log("Game Over");
    globals.isPlaying = false;
    clearInterval(globals.gameLoop);
    globals.gameGrid.innerHTML = "";
    removeAllEventListeners();

    openModal();
}
