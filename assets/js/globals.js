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
            "primary-accent": "#465ba5",
            "secondary-accent": "#7289DA",
        },
        "red-dark": {
            "primary-background": "#1B1D23",
            "secondary-background": "#0F1014",
            "primary-accent": "#E74C3C",
            "secondary-accent": "#a32314",
        },
        "green-dark": {
            "primary-background": "#1A2B34",
            "secondary-background": "#0D1E24",
            "primary-accent": "#0c813d",
            "secondary-accent": "#2ECC71",
        },
        "red-light": {
            "primary-background": "#E8ECEF",
            "secondary-background": "#D0D5DA",
            "primary-accent": "#FF6B6B",
            "secondary-accent": "#c42e2e",
        },
        "yellow-light": {
            "primary-background": "#F4F1DE",
            "secondary-background": "#E0DBC8",
            "primary-accent": "#F9A825",
            "secondary-accent": "#AF7AC5",
        },
        "cyan-light": {
            "primary-background": "#EBF5FB",
            "secondary-background": "#D4E6F1",
            "primary-accent": "#48C9B0",
            "secondary-accent": "#1f947d",
        },
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
