import { globals, constants } from "./globals.js";
import { generateGrid, renderIndicator, toPosition, renderOnGrid } from "./display.js";

export function buildTetris() {
    console.log("build game");

    globals.indicatorGrid = document.getElementById("next-brick-indicator");

    globals.nextBrick = getRandomBrick();
    renderIndicator(globals.nextBrick);
}

export function playTetris() {
    console.log("play...");
    let currentBrick = globals.nextBrick;
    let nextBrick = getRandomBrick();
    let brickPosition = [Math.floor((globals.gridSize[0] - currentBrick[0].length) / 2), 0];
    let gameMatrix = toPosition(currentBrick, brickPosition);

    renderOnGrid(globals.gameGrid, gameMatrix);
    renderIndicator(nextBrick);

    setInterval(() => {
        brickPosition[1]++;
        gameMatrix = toPosition(currentBrick, brickPosition);
        renderOnGrid(globals.gameGrid, gameMatrix);
    }, globals.interval);
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
