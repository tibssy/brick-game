import { buildGame } from "./tetris.js";
import { globals, constants } from "./globals.js";
import { renderOnGrid, toPosition } from "./display.js";

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
        closeModal();
        globals.zeroMatrix = Array.from(Array(globals.gridSize[1]), () =>
            Array(globals.gridSize[0]).fill(0)
        );
        buildGame();
        countDown(() => {
            console.log("start game");
            // tetrisGame();
        });
    });
});

function closeModal() {
    const modal = document.getElementById("settings");
    modal.style.transform = "scale(1.5)";
    modal.style.filter = "opacity(0)";

    modal.addEventListener("transitionend", onTransitionEnd);

    function onTransitionEnd() {
        modal.style.display = "none";
        modal.removeEventListener("transitionend", onTransitionEnd);
    }

    document.querySelector("main").style.transform = "scale(1)";
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
            const numberArray = toPosition(
                constants.countdownNumbers[countDownValue - 1],
                position
            );
            renderOnGrid(globals.gameGrid, numberArray);
        }

        countDownValue--;
    }, 1000);
}
