import { globals } from "./globals.js";

export function generateGrid(element, size) {
    const [cols, rows] = size;

    element.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    element.style.gridTemplateRows = `repeat(${rows}, auto)`;

    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        const maskUrl = `assets/images/blocks/block-${Math.floor(Math.random() * 10)}.svg`;

        cell.style.mask = `url("${maskUrl}") no-repeat 100% 100%`;
        cell.style.maskSize = "contain";
        cell.style.backgroundColor = globals.accentColor;

        element.appendChild(cell);
    }
}

export function renderOnGrid(element, array) {
    array.flat().forEach((value, index) => {
        const blockStyle = element.children[index].style;
        if (value) {
            blockStyle.transform = "scale(1)";
            blockStyle.filter = "opacity(1)";
            blockStyle.transition = `${globals.interval / 4}ms ease-in-out`;
        } else {
            blockStyle.transform = "scale(0.3)";
            blockStyle.filter = "opacity(0)";
        }
    });
}

export function renderIndicator(brick) {
    const indicatorGrid = document.getElementById("next-brick-indicator");
    const [cols, rows] = [brick[0].length, brick.length];

    const isPortrait = cols < rows;
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

export function invertBrickMatrix() {
    globals.brickMatrix = globals.brickMatrix.map((row) =>
        row.map((element) => (element === 0 ? 1 : 0))
    );

    renderOnGrid(globals.gameGrid, globals.brickMatrix);
}

export function invertGameMatrix() {
    globals.gameMatrix = globals.gameMatrix.map((row) =>
        row.map((element) => (element === 0 ? 1 : 0))
    );
    renderOnGrid(globals.gameGrid, globals.gameMatrix);
}
