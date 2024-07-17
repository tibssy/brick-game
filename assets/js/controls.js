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

export function setupSnakeControls(platform) {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleSnakeControlButtonClick);
    }

    if (platform === "desktop") {
        document.addEventListener("keydown", handleSnakeKeyDown);
    }
}

function handleSnakeControlButtonClick(event) {
    const buttonId = event.currentTarget.id;

    switch (buttonId) {
        case "up-button":
            globals.snakeDirection = "up";
            break;
        case "left-button":
            globals.snakeDirection = "left";
            break;
        case "right-button":
            globals.snakeDirection = "right";
            break;
        case "down-button":
            globals.snakeDirection = "down";
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }
}

function handleSnakeKeyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            globals.snakeDirection = "up";
            break;
        case "ArrowLeft":
            globals.snakeDirection = "left";
            break;
        case "ArrowRight":
            globals.snakeDirection = "right";
            break;
        case "ArrowDown":
            globals.snakeDirection = "down";
            break;
    }
}
