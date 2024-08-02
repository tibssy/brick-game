import { constants, globals } from "./globals.js";
import { renderOnGrid } from "./display.js";
import { handleOrientationChange, toggleGamePause, restartGame, exitGame, restartGameLoop } from "./game.js";
import { updateGameState, rotateBrick } from "./tetris.js";

export function setupPowerControls() {
    setTouchControls();
    setupButtons("#power-buttons button", handlePowerButtonClick);
    document.addEventListener("keyup", handleEscapeKeyUp);

    window.addEventListener("orientationchange", handleOrientationChange);
}

function handleEscapeKeyUp(event) {
    if (event.key === "Escape") {
        toggleGamePause();
    }
}

export function setupLongTouchControl() {
    const buttons = document.querySelectorAll("#game-controls button");
    const longTouchThreshold = 180;
    const touchState = {
        touchStartTime: 0,
        touchTimer: null,
        repeatTouch: null,
        touched: false,
        buttonId: null,
    };

    buttons.forEach((button) => {
        if (button.id !== "up-button") {
            button.addEventListener("touchstart", handleTouchStart);
            button.addEventListener("touchend", handleTouchEnd);
            button.addEventListener("touchcancel", handleTouchEnd);
            button.addEventListener("touchleave", handleTouchEnd);
        }
    });

    function handleTouchStart(event) {
        event.preventDefault();
        const { id } = event.currentTarget;
        touchState.buttonId = id;
        const axis = id === "down-button" ? 1 : 0;
        const speed = Math.floor(500 / globals.gridSize[axis]);
        touchState.touchStartTime = Date.now();
        touchState.touched = true;

        clearTimeout(touchState.touchTimer);

        touchState.touchTimer = setTimeout(() => {
            if (touchState.touched) {
                touchState.repeatTouch = setInterval(() => {
                    if (touchState.touched) {
                        handleTetrisControlButtonClick({ currentTarget: { id } });
                    } else {
                        clearInterval(touchState.repeatTouch);
                    }
                }, speed);
            }
        }, longTouchThreshold);
    }

    function handleTouchEnd() {
        clearTimeout(touchState.touchTimer);
        touchState.touchTimer = null;

        clearInterval(touchState.repeatTouch);
        touchState.repeatTouch = null;

        if (Date.now() - touchState.touchStartTime < longTouchThreshold) {
            handleTetrisControlButtonClick({ currentTarget: { id: touchState.buttonId } });
        }

        touchState.touched = false;
    }

    globals.touchHandler = { handleTouchStart, handleTouchEnd };
}

function setTouchControls() {
    const touchThreshold = 180;
    let touchStartTime = 0;

    globals.gameGrid.addEventListener("touchstart", handleTouchStart);
    globals.gameGrid.addEventListener("touchend", handleTouchEnd);

    function handleTouchStart() {
        touchStartTime = Date.now();
    }

    function handleTouchEnd() {
        if (Date.now() - touchStartTime <= touchThreshold) {
            toggleGamePause();
        }
    }

    globals.touchHandler = { handleTouchStart, handleTouchEnd };
}

export function setTetrisControls() {
    setupButtons(".control-button", handleTetrisControlButtonClick);
    document.addEventListener("keydown", handleTetrisKeyDown);
}

export function setSnakeControls() {
    setupButtons(".control-button", handleSnakeControlButtonClick);
    document.addEventListener("keydown", handleSnakeKeyDown);
}

function handlePowerButtonClick(event) {
    const buttonId = event.currentTarget.id;

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

function handleSnakeControlButtonClick(event) {
    if (!globals.isPlaying) return;

    const direction = constants.buttonActions[event.currentTarget.id];
    if (direction) {
        globals.snakeDirection = direction;
    } else {
        throw new Error(`Invalid button id: ${event.currentTarget.id}`);
    }
}

function handleSnakeKeyDown(event) {
    if (!globals.isPlaying) return;

    const direction = constants.keyActions[event.key];
    if (direction) {
        globals.snakeDirection = direction;
    }
}

function handleTetrisControlButtonClick(event) {
    if (!globals.isPlaying) return;

    const buttonId = event.currentTarget.id;
    const previousState = {
        position: [...globals.position],
        brick: globals.currentBrick.map((row) => [...row]),
    };

    updateTetrisState(buttonId);
    updateGameState(previousState.position, previousState.brick);
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}

function handleTetrisKeyDown(event) {
    if (!globals.isPlaying) return;

    if (event.key === "Escape") return;

    const previousState = {
        position: [...globals.position],
        brick: globals.currentBrick.map((row) => [...row]),
    };

    updateTetrisState(event.key);
    updateGameState(previousState.position, previousState.brick);
    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}

function updateTetrisState(control) {
    switch (control) {
        case "up-button":
        case "ArrowUp":
            globals.currentBrick = rotateBrick(globals.currentBrick);
            break;
        case "left-button":
        case "ArrowLeft":
            globals.position[0]--;
            break;
        case "right-button":
        case "ArrowRight":
            globals.position[0]++;
            break;
        case "down-button":
        case "ArrowDown":
            globals.position[1]++;
            break;
    }
}

function setupButtons(selector, handler) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => button.addEventListener("click", handler));
}

export function removeAllEventListeners() {
    document.removeEventListener("keydown", handleSnakeKeyDown);
    document.removeEventListener("keydown", handleTetrisKeyDown);
    document.removeEventListener("keyup", handleEscapeKeyUp);

    if (globals.touchHandler) {
        const downButton = document.getElementById("down-button");

        globals.gameGrid.removeEventListener("touchstart", globals.touchHandler.handleTouchStart);
        globals.gameGrid.removeEventListener("touchend", globals.touchHandler.handleTouchEnd);
        downButton.removeEventListener("touchstart", globals.touchHandler.handleLongTouchStart);
        downButton.removeEventListener("touchend", globals.touchHandler.handleLongTouchEnd);
        downButton.removeEventListener("touchcancel", globals.touchHandler.handleLongTouchEnd);
        downButton.removeEventListener("touchleave", globals.touchHandler.handleLongTouchEnd);
        delete globals.touchHandler;
    }

    removeAllButtonListeners("#game-controls");
    removeAllButtonListeners("#power-buttons");
}

function removeAllButtonListeners(selector) {
    const buttons = document.querySelectorAll(`${selector} button`);
    buttons.forEach((button) => {
        const clonedButton = button.cloneNode(true);
        button.parentNode.replaceChild(clonedButton, button);
    });
}
