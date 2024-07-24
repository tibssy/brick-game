import { constants, globals } from "./globals.js";
import { invertBrickMatrix, invertGameMatrix, renderOnGrid } from "./display.js";
import { toggleGamePause, restartGame, exitGame } from "./game.js";
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

    globals.touchHandler = touchHandler;
}

export function setupPowerButtons() {
    if (window.screen.width < 992) {
        setupTouchControls();
    }

    const powerButtons = document.getElementById("power-buttons").children;

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
            exitGame();
            break;
        case "reset-button":
            restartGame();
            break;
        case "break-button":
            toggleGamePause();
            break;
        default:
            throw new Error(`Invalid button id: ${buttonId}`);
    }
}

export function setupSnakeControls() {
    const controlButtons = document.getElementsByClassName("control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleSnakeControlButtonClick);
    }

    if (window.screen.width >= 992) {
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

export function setupTetrisControls() {
    const controlButtons = document.querySelectorAll(".control-button");

    for (let button of controlButtons) {
        button.addEventListener("click", handleTetrisControlButtonClick);
    }

    if (window.screen.width >= 992) {
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

    if (globals.touchHandler) {
        globals.gameGrid.removeEventListener("touchstart", globals.touchHandler, false);
        globals.gameGrid.removeEventListener("touchend", globals.touchHandler, false);
        delete globals.touchHandler;
    }

    for (let button of buttons) {
        const clonedButton = button.cloneNode(true);
        button.parentNode.replaceChild(clonedButton, button);
    }
}
