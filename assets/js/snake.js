import { globals } from "./globals.js";
import { insertToMatrix, renderOnGrid, updateAnimationTransition } from "./display.js";
import { exitGame } from "./game.js";
import { updateSnakeScore } from "./score.js";

/**
 * Initializes the Snake game by setting up the snake and the control button.
 */
export function buildSnake() {
    // Create the initial snake as a vertical line
    globals.snake = Array.from({ length: globals.snakeLength }, () => [1]);
    document.getElementById("up-button").innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
}

/**
 * Starts the Snake game by initializing the game state and starting the game loop.
 */
export function playSnake() {
    initializeGame();
    startGameLoop();
}

/**
 * Sets up the initial game state for Snake, including the snake's position and food.
 */
function initializeGame() {
    // Set initial position for the snake
    globals.position = [Math.ceil(globals.gridSize[0] / 2), globals.gridSize[1] - globals.snakeLength];

    // Create the initial snake body
    globals.snakeBody = Array.from({ length: globals.snakeLength }, (_, i) => [
        globals.position[0],
        globals.position[1] + i,
    ]);

    // Set up the game matrix and place the initial food
    globals.gameMatrix = insertToMatrix(globals.snake, globals.position);
    getRandomSnakeFood();
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}

/**
 * Starts the game loop, which updates the game state at regular intervals.
 */
function startGameLoop() {
    globals.isPlaying = true;

    globals.gameUpdate = () => {
        if (globals.isPlaying) {
            updateAnimationTransition();
            updatePosition();

            // Check if the snake's new position is valid and not colliding
            if (isPositionInMatrix() && !isCollision(globals.position)) {
                // Check if the snake has eaten food
                if (isCollision(globals.snakeFood)) {
                    growSnake();
                    getRandomSnakeFood();
                    updateSnakeScore();
                } else {
                    moveSnake();
                }

                renderOnGrid(globals.gameGrid, globals.gameMatrix);
            } else {
                exitGame(); // End the game if the snake collides with itself or the wall
            }
        }
    };

    globals.gameLoop = setInterval(globals.gameUpdate, globals.interval); // Update game state at regular intervals
}

/**
 * Updates the snake's position based on the current direction.
 */
function updatePosition() {
    const [x, y] = globals.position;
    const directions = {
        up: [x, y - 1],
        down: [x, y + 1],
        left: [x - 1, y],
        right: [x + 1, y],
    };

    globals.position = directions[globals.snakeDirection] || globals.position;
}

/**
 * Checks if the current position is within the grid boundaries.
 *
 * @returns {boolean} - True if the position is within bounds, otherwise false.
 */
function isPositionInMatrix() {
    const [positionX, positionY] = globals.position;
    const [gridWidth, gridHeight] = globals.gridSize;

    return positionX >= 0 && positionX < gridWidth && positionY >= 0 && positionY < gridHeight;
}

/**
 * Checks if the given position collides with any part of the snake's body.
 *
 * @param {Array} position - The position to check for collision.
 * @returns {boolean} - True if there is a collision, otherwise false.
 */
function isCollision(position) {
    const snakeBody = [...globals.snakeBody];
    return snakeBody.some((pos) => pos[0] === position[0] && pos[1] === position[1]);
}

/**
 * Grows the snake by adding a new segment at the current position.
 */
function growSnake() {
    globals.snakeBody.splice(0, 0, [...globals.position]);
    globals.gameMatrix[globals.position[1]][globals.position[0]] = 1;
}

/**
 * Moves the snake by growing it and removing the tail segment.
 */
function moveSnake() {
    let snakeTail;

    growSnake(); // Add a new segment to the snake's body
    snakeTail = globals.snakeBody.pop(); // Remove the tail segment
    globals.gameMatrix[snakeTail[1]][snakeTail[0]] = 0;
}

/**
 * Randomly generates a new piece of food for the snake and places it on the grid.
 */
function getRandomSnakeFood() {
    const [gridWidth, gridHeight] = globals.gridSize;
    let snakeFood;

    // Ensure the food does not appear on the snake's body
    do {
        snakeFood = [Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight)];
    } while (isCollision(snakeFood));

    globals.gameMatrix[snakeFood[1]][snakeFood[0]] = 1;
    globals.snakeFood = snakeFood;
}
