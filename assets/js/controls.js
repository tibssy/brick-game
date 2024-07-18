import { constants, globals } from "./globals.js";
import { invertBrickMatrix, invertGameMatrix, renderOnGrid } from "./display.js";
import { resetGame } from "./game.js";
import { updateGameState, rotateBrick } from "./tetris.js";

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
    const direction = constants.buttonActions[buttonId];

    if (direction) {
        globals.snakeDirection = direction;
    } else {
        throw new Error(`Invalid button id: ${buttonId}`);
    }
}

function handleSnakeKeyDown(event) {
    const direction = constants.keyActions[event.key];

    if (direction) {
        globals.snakeDirection = direction;
    }
}

export function setupTetrisControls(platform) {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleTetrisControlButtonClick);
    }

    if (platform === "desktop") {
        document.addEventListener("keydown", handleTetrisKeyDown);
    }
}

function handleTetrisControlButtonClick(event) {
    const buttonId = event.currentTarget.id;
    const previousPosition = [...globals.position];
    const previousBrickState = globals.currentBrick.map((innerArray) => [...innerArray]);

    switch (buttonId) {
        case "up-button":
            globals.currentBrick = rotateBrick(globals.currentBrick);
            break;
        case "left-button":
            globals.position[0]--;
            break;
        case "right-button":
            globals.position[0]++;
            break;
        case "down-button":
            globals.position[1]++;
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }

    updateGameState(previousPosition, previousBrickState);
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}

function handleTetrisKeyDown(event) {
    const previousPosition = [...globals.position];
    const previousBrickState = globals.currentBrick.map((innerArray) => [...innerArray]);

    switch (event.key) {
        case "ArrowUp":
            globals.currentBrick = rotateBrick(globals.currentBrick);
            break;
        case "ArrowLeft":
            globals.position[0]--;
            break;
        case "ArrowRight":
            globals.position[0]++;
            break;
        case "ArrowDown":
            globals.position[1]++;
            break;
    }

    updateGameState(previousPosition, previousBrickState);
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}

export function removeAllEventListeners() {
    const gameControls = document.getElementById("game-controls");
    const buttons = gameControls.getElementsByTagName("button");

    for (let button of buttons) {
        const clonedButton = button.cloneNode(true);
        button.parentNode.replaceChild(clonedButton, button);
    }
}
