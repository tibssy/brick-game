import { globals, constants } from "./globals.js";
import { generateGrid, renderIndicator, renderOnGrid } from "./display.js";

export function buildGame() {
    console.log("build game");
    globals.gameGrid = document.getElementById("game-display");
    globals.indicatorGrid = document.getElementById("next-brick-indicator");

    generateGrid(globals.gameGrid, globals.gridSize);

    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
}

function getRandomBrick() {
    const bricks = constants.bricks;
    const brickIndex = Math.floor(Math.random() * bricks.length);
    let brick = bricks[brickIndex];
    let maxRotation = brickIndex >= 4 ? 3 : brickIndex >= 1 ? 1 : 0;
    const rotationCount = Math.floor(Math.random() * maxRotation);

    for (let i = 0; i < rotationCount; i++) {
        brick = rotateBrick(brick, "clockwise");
    }

    return brick;
}

function rotateBrick(brick, direction) {
    const rotateClockwise = (matrix) =>
        matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());
    const rotateCounterclockwise = (matrix) =>
        matrix[0].map((val, index) => matrix.map((row) => row[row.length - 1 - index]));

    if (direction === "clockwise") {
        return rotateClockwise(brick);
    } else if (direction === "counterclockwise") {
        return rotateCounterclockwise(brick);
    } else {
        throw new Error('Invalid rotation direction. Use "clockwise" or "counterclockwise".');
    }
}
