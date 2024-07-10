export const constants = {
    bricks: [
        [
            [1, 1],
            [1, 1],
        ],
        [[1, 1, 1, 1]],
        [
            [0, 1, 1],
            [1, 1, 0],
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1, 0],
            [1, 1, 1],
        ],
        [
            [0, 0, 1],
            [1, 1, 1],
        ],
    ],
    countdownNumbers: [
        [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 1, 1, 0],
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 1, 1, 0],
        ],
    ],
};

export const globals = {
    gridSize: [10, 20],
    brickPosition: [0, 0],
    interval: 1000,
    game: "tetris",
    zeroMatrix: null,
    gameGrid: null,
    gameMatrix: null,
    indicatorGrid: null,
    nextBrick: null,
    currentBrick: null,
};
