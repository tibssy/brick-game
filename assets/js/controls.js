import { globals } from "./globals.js";
import { invertBrickMatrix, invertGameMatrix } from "./display.js";
import { resetGame } from "./game.js";

export function setupPowerButtons() {
    const powerButtons = document.getElementsByClassName("power-button");

    for (let button of powerButtons) {
        button.addEventListener("click", handlePowerButtonClick);
    }
}

function handlePowerButtonClick(event) {
    const buttonId = event.currentTarget.id;
    const invertMatrix = globals.game === "tetris" ? invertBrickMatrix : invertGameMatrix;

    switch (buttonId) {
        case "exit-button":
            console.log("exit...");
            resetGame();
            break;
        case "break-button":
            globals.isPlaying = !globals.isPlaying;
            invertMatrix();
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }
}
