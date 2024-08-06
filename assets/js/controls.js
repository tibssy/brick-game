import { constants, globals } from "./globals.js";
import { renderOnGrid } from "./display.js";
import { handleOrientationChange, toggleGamePause, restartGame, exitGame } from "./game.js";
import { updateGameState, rotateBrick } from "./tetris.js";

/**
 * Sets up power controls, including button event listeners and orientation change handling.
 */
export function setupPowerControls() {
    setTouchControls(); // Initialize touch controls for game grid
    setupButtons("#power-buttons button", handlePowerButtonClick); // Set up event listeners for power control buttons
    document.addEventListener("keyup", handleEscapeKeyUp); // Handle escape key press for pausing the game

    window.addEventListener("orientationchange", handleOrientationChange); // Handle device orientation changes
}

/**
 * Handles the escape key press to toggle game pause.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered on keyup.
 */
function handleEscapeKeyUp(event) {
    if (event.key === "Escape") {
        toggleGamePause();
    }
}

/**
 * Sets up long touch controls for game control buttons.
 */
export function setupLongTouchControl() {
    const buttons = document.querySelectorAll("#game-controls button");
    const longTouchThreshold = 150;
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

/**
 * Sets up touch controls for the game grid to toggle pause on short touches.
 */
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

/**
 * Sets up controls for the Tetris game, including button and keyboard controls.
 */
export function setTetrisControls() {
    setupButtons(".control-button", handleTetrisControlButtonClick);
    document.addEventListener("keydown", handleTetrisKeyDown);
}

/**
 * Sets up controls for the Snake game, including button and keyboard controls.
 */
export function setSnakeControls() {
    setupButtons(".control-button", handleSnakeControlButtonClick);
    document.addEventListener("keydown", handleSnakeKeyDown);
}

/**
 * Handles click events for power control buttons (exit, reset, pause).
 *
 * @param {MouseEvent} event - The click event triggered on power control buttons.
 */
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

/**
 * Handles the Snake control actions based on the provided action.
 *
 * @param {string} action - The action corresponding to the control (button ID or key).
 */
function handleSnakeControlAction(action) {
    if (!globals.isPlaying) return;

    const direction = constants.snakeControlActions[action];
    if (direction && constants.oppositeDirections[direction] !== globals.snakeDirection) {
        globals.snakeDirection = direction;
    }
}

/**
 * Handles click events for Snake control buttons.
 *
 * @param {MouseEvent} event - The click event triggered on Snake control buttons.
 */
function handleSnakeControlButtonClick(event) {
    handleSnakeControlAction(event.currentTarget.id);
}

/**
 * Handles keydown events for Snake controls.
 *
 * @param {KeyboardEvent} event - The keydown event triggered by the user.
 */
function handleSnakeKeyDown(event) {
    handleSnakeControlAction(event.key);
}

/**
 * Handles click events for Tetris control buttons and updates the game state.
 *
 * @param {MouseEvent} event - The click event triggered on Tetris control buttons.
 */
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

/**
 * Handles keydown events for Tetris controls and updates the game state.
 *
 * @param {KeyboardEvent} event - The keydown event triggered by the user.
 */
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

/**
 * Updates the Tetris game state based on the provided control input.
 *
 * @param {string} control - The control input (button ID or key).
 */
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

/**
 * Sets up event listeners for buttons based on the provided selector and handler.
 *
 * @param {string} selector - The CSS selector for the buttons.
 * @param {Function} handler - The function to handle button click events.
 */
function setupButtons(selector, handler) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => button.addEventListener("click", handler));
}

/**
 * Removes all event listeners related to game controls and touch handling.
 */
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

/**
 * Removes all event listeners attached to buttons within the specified selector.
 *
 * @param {string} selector - The CSS selector for the buttons.
 */
function removeAllButtonListeners(selector) {
    const buttons = document.querySelectorAll(`${selector} button`);
    buttons.forEach((button) => {
        const clonedButton = button.cloneNode(true);
        button.parentNode.replaceChild(clonedButton, button);
    });
}
