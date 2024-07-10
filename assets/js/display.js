import { globals, constants } from "./globals.js";

export function generateGrid(element, size) {
    const [cols, rows] = size;

    element.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    element.style.gridTemplateRows = `repeat(${rows}, auto)`;

    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        element.appendChild(cell);
    }
}

export function renderOnGrid(element, array) {
    array.flat().forEach((value, index) => {
        if (value) {
            element.children[index].style.boxShadow = "0 0 6px #333333";
            element.children[index].style.backgroundColor = "#b9f46c";
            element.children[index].style.transform = "scale(1)";
        } else {
            element.children[index].style.boxShadow = "none";
            element.children[index].style.backgroundColor = element.style.backgroundColor;
            element.children[index].style.transform = "scale(0.5)";
        }
    });
}

export function renderIndicator(brick) {
    const indicatorGrid = globals.indicatorGrid;
    const cols = brick[0].length;
    const rows = brick.length;

    indicatorGrid.replaceChildren();
    indicatorGrid.style.aspectRatio = `${cols}/${rows}`;
    generateGrid(indicatorGrid, [cols, rows]);
    renderOnGrid(indicatorGrid, brick);
}

export function toPosition(arr, position) {
    let grid = globals.zeroMatrix.map((innerArray) => [...innerArray]);

    arr.forEach((row, rowIndex) => {
        grid[position[1] + rowIndex].splice(position[0], row.length, ...row);
    });

    return grid;
}
