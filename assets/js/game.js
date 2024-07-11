import { buildTetris, playTetris } from "./tetris.js";
import { globals, constants } from "./globals.js";
import { generateGrid, renderOnGrid, insertToMatrix } from "./display.js";

export function startGame() {
    globals.gameMatrix = generateZeroMatrix();
    globals.gameGrid = document.getElementById("game-display");
    generateGrid(globals.gameGrid, globals.gridSize);

    switch (globals.game) {
        case "tetris":
            buildTetris();
            countDown(() => {
                playTetris();
            });
            break;
        case "snake":
            console.log("Buils Snake");
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
            const matrix = globals.gameMatrix.map((innerArray) => [...innerArray]);
            const numberArray = insertToMatrix(
                constants.countdownNumbers[countDownValue - 1],
                matrix,
                position
            );
            renderOnGrid(globals.gameGrid, numberArray);
        }

        countDownValue--;
    }, 1000);
}

export function generateZeroMatrix() {
    return Array.from(Array(globals.gridSize[1]), () => Array(globals.gridSize[0]).fill(0));
}
