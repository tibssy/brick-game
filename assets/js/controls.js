import { globals } from "./globals.js";
import { invertBrickMatrix } from "./display.js";
import { resetGame } from "./game.js";

export function setupPowerButtons() {
    const powerButtons = document.getElementsByClassName("power-button");

    for (let button of powerButtons) {
        button.addEventListener("click", handlePowerButtonClick);
    }
}

function handlePowerButtonClick(event) {
    const buttonId = event.currentTarget.id;

    switch (buttonId) {
        case "exit-button":
            console.log("exit...");
            resetGame();
            break;
        case "break-button":
            globals.isPlaying = !globals.isPlaying;
            invertBrickMatrix();
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }
}
