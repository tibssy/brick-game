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
    colorThemes: {
        "blue-dark": {
            "primary-background": "#2C2F33",
            "secondary-background": "#868788",
            "primary-accent": "#5873d3",
            "secondary-accent": "#9fb1f1",
        },
        "red-dark": {
            "primary-background": "#25211f",
            "secondary-background": "#928281",
            "primary-accent": "#a32314",
            "secondary-accent": "#e74c3b",
        },
        "green-dark": {
            "primary-background": "#1d2521",
            "secondary-background": "#84968b",
            "primary-accent": "#149b4c",
            "secondary-accent": "#33eb80",
        },
        "red-light": {
            "primary-background": "#fcf1f1",
            "secondary-background": "#a39797",
            "primary-accent": "#ff6b6b",
            "secondary-accent": "#c42e2e",
        },
        "yellow-light": {
            "primary-background": "#fff0d9",
            "secondary-background": "#b8afa0",
            "primary-accent": "#fda81e",
            "secondary-accent": "#aa6d0c",
        },
        "cyan-light": {
            "primary-background": "#e3fff9",
            "secondary-background": "#9cb1ad",
            "primary-accent": "#4fe4c6",
            "secondary-accent": "#1f947d",
        },
    },
    tetrisScore: {
        1: 40,
        2: 100,
        3: 300,
        4: 1200,
    },
};

export const globals = {
    gameLoop: null,
    gridSize: [10, 20],
    position: [0, 0],
    interval: 1000,
    initialLevel: 0,
    level: 0,
    clearedLines: 0,
    score: 0,
    animation: true,
    rotation: "counterclockwise",
    isLeftHanded: false,
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
    snakeBody: null,
    snake: null,
};
