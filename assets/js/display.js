import { globals } from "./globals.js";

export function generateGrid(element, size) {
    const [cols, rows] = size;

    element.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    element.style.gridTemplateRows = `repeat(${rows}, auto)`;

    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        element.appendChild(cell);
    }
}

export function renderOnGrid(element, matrix) {
    if (!element.hasChildNodes()) return;

    requestAnimationFrame(() => {
        const blocks = element.children;

        matrix.flat().forEach((value, index) => {
            const block = blocks[index];
            const isHidden = block.classList.contains("hide-element");

            if (value && isHidden) {
                block.classList.remove("hide-element");
            } else if (!value && !isHidden) {
                block.classList.add("hide-element");
            }
        });
    });
}

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

export function insertToMatrix(arr, position) {
    const matrix = globals.gameMatrix.map((innerArray) => [...innerArray]);
    const [posX, posY] = position;
    const [gridWidth, gridHeight] = [globals.gridSize[0], globals.gridSize[1]];
    const [brickWidth, brickHeight] = [arr[0].length, arr.length];

    let adjustedPosX = Math.max(0, Math.min(posX, gridWidth - brickWidth));
    let adjustedPosY = Math.max(0, Math.min(posY, gridHeight - brickHeight));

    arr.forEach((row, rowIndex) => {
        row.forEach((value, index) => {
            matrix[adjustedPosY + rowIndex][adjustedPosX + index] =
                value + matrix[adjustedPosY + rowIndex][adjustedPosX + index];
        });
    });

    globals.position = [adjustedPosX, adjustedPosY];
    return matrix;
}

export function invertGrid() {
    for (let element of globals.gameGrid.children) {
        element.classList.toggle("hide-element");
    }
}

export function displayScore() {
    document.getElementById("score").textContent = globals.score;
}

export function displayLevel() {
    document.getElementById("level").textContent = globals.level;
}

export function displayClearedLines() {
    document.getElementById("lines").textContent = globals.clearedLines;
}

export function updateAnimationTransition() {
    const isAnimate = globals.animation ? `${Math.floor(globals.interval / 4)}ms ease-in-out` : "none";
    document.documentElement.style.setProperty("--transition", isAnimate);
}

export function applyTemporaryAnimation() {
    if (!globals.animation) {
        globals.animation = true;
        updateAnimationTransition();
        globals.animation = false;
    }
}

export function displayScores(scores) {
    const scoreSpans = document.querySelectorAll("#high-score span");

    scores.forEach((score, index) => {
        scoreSpans[index].textContent = score;
    });
}
