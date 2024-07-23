import { constants, globals } from "./globals.js";
import { invertBrickMatrix, invertGameMatrix, renderOnGrid } from "./display.js";
import { resetGame } from "./game.js";
import { updateGameState, rotateBrick } from "./tetris.js";

function setupTouchControls() {
    const touchThreshold = 180;
    let touchStartTime = 0;

    globals.gameGrid.addEventListener("touchstart", touchHandler, false);
    globals.gameGrid.addEventListener("touchend", touchHandler, false);

    function touchHandler(event) {
        if (event.type == "touchstart") {
            touchStartTime = Date.now();
        } else if (event.type == "touchend" && Date.now() - touchStartTime <= touchThreshold) {
            toggleGamePause();
        }
    }
}

function toggleGamePause() {
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

export function setupPowerButtons() {
    if (window.screen.width < 992) {
        setupTouchControls();
    }

    const powerButtons = document.getElementById("power-buttons").children;
    console.log(powerButtons);

    for (let button of powerButtons) {
        button.addEventListener("click", handlePowerButtonClick);
    }

    window.addEventListener("orientationchange", (event) => {
        const powerButtons = document.querySelector("#power-buttons");
        const gameControls = document.querySelector("#game-controls");

        if (window.screen.orientation.type === "portrait-primary" && !globals.isPlaying) {
            powerButtons.style.display = "flex";
            gameControls.style.display = "none";
        } else {
            powerButtons.style.display = "";
            gameControls.style.display = "";
        }
    });
}

function handlePowerButtonClick(event) {
    const buttonId = event.currentTarget.id;
    const invertMatrix = globals.game === "snake" ? invertGameMatrix : invertBrickMatrix;

    switch (buttonId) {
        case "exit-button":
            console.log("exit...");
            resetGame();
            break;
        case "break-button":
            toggleGamePause();
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
    const controlButtons = document.querySelectorAll(".control-button");

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
