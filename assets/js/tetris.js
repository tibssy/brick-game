import { globals, constants } from "./globals.js";
import { generateGrid, renderIndicator, renderOnGrid } from "./display.js";

export function buildGame() {
    console.log("build game");
    globals.gameGrid = document.getElementById("game-display");
    globals.indicatorGrid = document.getElementById("next-brick-indicator");

    generateGrid(globals.gameGrid, globals.gridSize);

    globals.nextBrick = getRandomBrick();
    console.log(globals.nextBrick);
    renderIndicator(globals.nextBrick);
}

function getRandomBrick() {
    const bricks = constants.bricks;
    const brickIndex = Math.floor(Math.random() * bricks.length);
    let brick = bricks[brickIndex];
    let maxRotation = 0;

    if (brickIndex >= 4) {
        maxRotation = 3;
    } else if (brickIndex >= 1) {
        maxRotation = 1;
    }

    const rotationCount = Math.floor(Math.random() * maxRotation);

    for (let i = 0; i < rotationCount; i++) {
        brick = rotateBrick(brick, "clockwise");
    }

    return brick;
}

function rotateBrick(brick, direction) {
    if (direction === "clockwise") {
        return brick[0].map((val, index) => brick.map((row) => row[index]).reverse());
    } else if (direction === "counterclockwise") {
        return brick[0].map((val, index) => brick.map((row) => row[row.length - 1 - index]));
    } else {
        throw new Error('Invalid rotation direction. Use "clockwise" or "counterclockwise".');
    }
}
