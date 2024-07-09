import { globals, constants } from "./globals.js";

export function generateGrid(element, size) {
    console.log(size);
    const [cols, rows] = size;

    element.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    element.style.gridTemplateRows = `repeat(${rows}, auto)`;

    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        element.appendChild(cell);
    }
}

export function renderOnGrid(element, array, position = [0, 0]) {
    console.log(element);
}

export function renderIndicator(brick) {
    const indicatorGrid = globals.indicatorGrid;
    const cols = brick[0].length;
    const rows = brick.length;

    indicatorGrid.replaceChildren();
    indicatorGrid.style.aspectRatio = `${cols}/${rows}`;
    generateGrid(indicatorGrid, [cols, rows]);

    brick.flat().forEach((element, index) => {
        if (element) {
            indicatorGrid.children[index].style.boxShadow = "0 0 3px #333333";
            indicatorGrid.children[index].style.backgroundColor = "#b9f46c";
        }
    });
}
