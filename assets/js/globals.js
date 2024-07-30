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
    hslColorThemes: {
        hue: {
            yellow: 33,
            lime: 66,
            green: 100,
            blue: 200,
            purple: 266,
            red: 0,
        },
        light: {
            "primary-background": "100%, 95%",
            "secondary-background": "15%, 30%",
            "primary-accent": "100%, 65%",
            "secondary-accent": "100%, 35%",
        },
        dark: {
            "primary-background": "20%, 16%",
            "secondary-background": "100%, 95%",
            "primary-accent": "100%, 65%",
            "secondary-accent": "100%, 80%",
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
    colorMode: "dark",
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
