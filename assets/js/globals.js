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
        [
            [1, 0, 0],
            [1, 1, 1],
        ],
    ],
    bricksMod: [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        [[1, 1]],
        [
            [0, 0, 1],
            [1, 1, 1],
            [1, 0, 0],
        ],
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        [
            [1, 0, 1],
            [1, 1, 1],
        ],
        [
            [0, 1],
            [1, 1],
        ],
        [
            [1, 0],
            [1, 1],
        ],
        [
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
        ],
    ],
    countdownNumbers: [
        [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 1],
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 1, 1, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 1],
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 1, 1, 0],
        ],
    ],
    keyActions: {
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowDown: "down",
    },
    buttonActions: {
        "up-button": "up",
        "left-button": "left",
        "right-button": "right",
        "down-button": "down",
    },
};

export const globals = {
    accentColor: "#fcd234",
    gameLoop: null,
    paltform: null,
    gridSize: [10, 20],
    position: [0, 0],
    interval: 1000,
    rotation: "counterclockwise",
    game: "tetris",
    isPlaying: false,
    gameMatrix: null,
    gameGrid: null,
    brickMatrix: null,
    nextBrick: null,
    currentBrick: null,
    brickIndex: null,
    snakeDirection: "up",
    snakeLength: 4,
    snake: null,
};
