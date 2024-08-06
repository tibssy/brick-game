/**
 * Constants used in the game for various purposes including bricks, countdown numbers, and control actions.
 */
export const constants = {
    /**
     * The different brick shapes used in Tetris.
     * Each brick is represented as a 2D array where 1s represent filled cells.
     */
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

    /**
     * Modified versions of Tetris bricks with different shapes.
     * These variations are used for different game mode like tetris extra.
     */
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

    /**
     * Number representations used for countdown displays.
     * Each number is represented as a 2D array where 1s represent filled cells.
     */
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

    /**
     * Control actions for the snake game, mapping key codes and button IDs to directions.
     */
    snakeControlActions: {
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowDown: "down",
        "up-button": "up",
        "left-button": "left",
        "right-button": "right",
        "down-button": "down",
    },

    /**
     * Opposite directions for the snake movement.
     */
    oppositeDirections: {
        up: "down",
        down: "up",
        left: "right",
        right: "left",
    },

    /**
     * Color themes defined using HSL color values.
     */
    hslColorThemes: {
        hue: {
            orange: 33,
            yellow: 60,
            green: 100,
            blue: 200,
            purple: 266,
            pink: 320,
            red: 360,
        },
        light: {
            "primary-background": "100%, 94%",
            "secondary-background": "75%, 85%",
            "primary-accent": "100%, 60%",
            "secondary-accent": "100%, 35%",
            "font-color": "15%, 15%",
        },
        dark: {
            "primary-background": "16%, 16%",
            "secondary-background": "15%, 25%",
            "primary-accent": "100%, 60%",
            "secondary-accent": "100%, 80%",
            "font-color": "95%, 95%",
        },
    },

    /**
     * Points awarded for clearing lines in Tetris, based on the number of lines cleared.
     */
    tetrisScore: {
        1: 40,
        2: 100,
        3: 300,
        4: 1200,
    },
};

/**
 * Global variables and game state management.
 */
export const globals = {
    colorMode: "dark", // Current color mode (light or dark)
    gameLoop: null, // Reference to the game loop function
    gridSize: [10, 20], // Dimensions of the game grid [columns, rows]
    position: [0, 0], // Current position of the active brick or object [x, y]
    interval: 1000, // Interval for game updates (in milliseconds)
    initialLevel: 0, // Starting level of the game
    level: 0, // Current level of the game
    clearedLines: 0, // Number of lines cleared in Tetris
    score: 0, // Current score
    animation: true, // Flag indicating if animations are enabled
    rotation: "counterclockwise", // Direction of brick rotation
    isLeftHanded: false, // Flag for left-handed controls
    game: "tetris", // Current game type ("tetris" or "snake")
    isPlaying: false, // Flag indicating if the game is currently being played
    gameMatrix: null, // Matrix representing the game state
    gameGrid: null, // DOM element representing the game grid
    brickMatrix: null, // Matrix representing the current brick
    nextBrick: null, // Matrix representing the next brick
    currentBrick: null, // Matrix representing the currently active brick
    brickIndex: null, // Index of the current brick in the array
    snakeDirection: "up", // Current direction of the snake
    snakeLength: 4, // Length of the snake
    snakeBody: null, // Array representing the snake's body segments
    snake: null, // DOM element representing the snake
};
