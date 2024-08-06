import { globals } from "./globals.js";

/**
 * Generates a grid of cells in the specified element.
 *
 * @param {HTMLElement} element - The DOM element where the grid will be generated.
 * @param {number[]} size - The number of columns and rows for the grid.
 */
export function generateGrid(element, size) {
    const [cols, rows] = size;

    // Set up grid template columns and rows
    element.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    element.style.gridTemplateRows = `repeat(${rows}, auto)`;

    // Create and append cells to the grid
    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        element.appendChild(cell);
    }
}

/**
 * Renders the given matrix on the specified grid element.
 *
 * @param {HTMLElement} element - The DOM element representing the grid.
 * @param {number[][]} matrix - A 2D array representing the grid's state.
 */
export function renderOnGrid(element, matrix) {
    if (!element.hasChildNodes()) return;

    requestAnimationFrame(() => {
        const blocks = element.children;

        matrix.flat().forEach((value, index) => {
            const block = blocks[index];
            const isHidden = block.classList.contains("hide-element");

            // Show or hide blocks based on matrix values
            if (value && isHidden) {
                block.classList.remove("hide-element");
            } else if (!value && !isHidden) {
                block.classList.add("hide-element");
            }
        });
    });
}

/**
 * Renders a preview indicator of the next brick for Tetris.
 *
 * @param {number[][]} brick - A 2D array representing the next brick.
 */
export function renderIndicator(brick) {
    const indicatorGrid = document.getElementById("next-brick-indicator");
    const [cols, rows] = [brick[0].length, brick.length];

    const isPortrait = cols <= rows;
    indicatorGrid.style.width = isPortrait ? "auto" : "100%";
    indicatorGrid.style.height = isPortrait ? "100%" : "auto";

    indicatorGrid.style.aspectRatio = `${cols}/${rows}`;
    indicatorGrid.replaceChildren();

    generateGrid(indicatorGrid, [cols, rows]);
    renderOnGrid(indicatorGrid, brick);
}

/**
 * Inserts a given array into the game matrix at the specified position.
 *
 * @param {number[][]} arr - A 2D array representing the shape to be inserted.
 * @param {number[]} position - The [x, y] position where the array should be inserted.
 * @returns {number[][]} The updated game matrix.
 */
export function insertToMatrix(arr, position) {
    const matrix = globals.gameMatrix.map((innerArray) => [...innerArray]);
    const [posX, posY] = position;
    const [gridWidth, gridHeight] = [globals.gridSize[0], globals.gridSize[1]];
    const [brickWidth, brickHeight] = [arr[0].length, arr.length];

    // Adjust position to fit within the grid boundaries
    let adjustedPosX = Math.max(0, Math.min(posX, gridWidth - brickWidth));
    let adjustedPosY = Math.max(0, Math.min(posY, gridHeight - brickHeight));

    // Insert array into matrix
    arr.forEach((row, rowIndex) => {
        row.forEach((value, index) => {
            matrix[adjustedPosY + rowIndex][adjustedPosX + index] =
                value + matrix[adjustedPosY + rowIndex][adjustedPosX + index];
        });
    });

    globals.position = [adjustedPosX, adjustedPosY];
    return matrix;
}

/**
 * Toggles the visibility of elements in the game grid.
 */
export function invertGrid() {
    for (let element of globals.gameGrid.children) {
        element.classList.toggle("hide-element");
    }
}

/**
 * Updates the displayed score.
 */
export function displayScore() {
    document.getElementById("score").textContent = globals.score;
}

/**
 * Updates the displayed level.
 */
export function displayLevel() {
    document.getElementById("level").textContent = globals.level;
}

/**
 * Updates the displayed number of cleared lines.
 */
export function displayClearedLines() {
    document.getElementById("lines").textContent = globals.clearedLines;
}

/**
 * Updates the animation transition timing based on the current game state.
 */
export function updateAnimationTransition() {
    const isAnimate = globals.animation ? `${Math.floor(globals.interval / 4)}ms ease-in-out` : "none";
    document.documentElement.style.setProperty("--transition", isAnimate);
}

/**
 * Applies a temporary animation to the grid.
 */
export function applyTemporaryAnimation() {
    if (!globals.animation) {
        globals.animation = true;
        updateAnimationTransition();
        globals.animation = false;
    }
}

/**
 * Displays the current scores on the high score board.
 *
 * @param {number[]} scores - An array containing the current score and cleared lines.
 */
export function displayScores(scores) {
    document.querySelectorAll("#high-score > p")[1].innerHTML =
        globals.game === "snake" ? "Collected food: <span>0</span>" : `Cleared lines: <span>0</span>`;

    const scoreSpans = document.querySelectorAll("#high-score span");

    scores.forEach((score, index) => {
        scoreSpans[index].textContent = score;
    });
}

/**
 * Updates text labels based on the current game (Tetris or Snake).
 */
export function updateGameText() {
    const textReplacements = [
        ["Lines:", "Food:"],
        ["Cleared lines:", "Collected food:"],
    ];

    const nextBrickIndicator = document.querySelectorAll(".indicator-text")[0];
    const inGameLinesParagraph = document.querySelectorAll(".indicator-text")[3];
    const highScoreParagraph = document.querySelectorAll("#high-score > p")[1];

    if (globals.game === "snake") {
        nextBrickIndicator.classList.add("remove-element");
        inGameLinesParagraph.innerHTML = inGameLinesParagraph.innerHTML.replace(...textReplacements[0]);
        highScoreParagraph.innerHTML = highScoreParagraph.innerHTML.replace(...textReplacements[1]);
    } else {
        nextBrickIndicator.classList.remove("remove-element");
        inGameLinesParagraph.innerHTML = inGameLinesParagraph.innerHTML.replace(...textReplacements[0].reverse());
        highScoreParagraph.innerHTML = highScoreParagraph.innerHTML.replace(...textReplacements[1].reverse());
    }
}
