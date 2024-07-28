import { globals, constants } from "./globals.js";
import {
    displayScore,
    displayLevel,
    displayClearedLines,
    updateAnimationTransition,
} from "./display.js";
import { restartGameLoop } from "./game.js";

export function updateTetrisScore(lines) {
    updateScore(constants.tetrisScore[lines]);
    calculateLevel(lines, 10);
}

export function updateSnakeScore() {
    updateScore(40);
    calculateLevel(1, 5);
}

export function resetScore() {
    globals.clearedLines = 0;
    globals.score = 0;
    globals.level = globals.initialLevel;
    globals.interval = 1000 - globals.level * 90;

    displayClearedLines();
    displayScore();
    displayLevel();
    updateAnimationTransition();
}

function updateScore(baseScore) {
    globals.score += baseScore * (globals.level + 1);
    displayScore();
}

function calculateLevel(increment, levelThreshold) {
    globals.clearedLines += increment;
    const initialLevel = globals.initialLevel;
    let newLevel = initialLevel + Math.floor(globals.clearedLines / levelThreshold);

    displayClearedLines();
    newLevel = Math.min(newLevel, 10);

    if (globals.level !== newLevel) {
        let interval = 1000 - newLevel * 90;
        globals.level = newLevel;

        if (globals.game === "snake") {
            interval /= 2;
        }

        globals.interval = interval;
        updateAnimationTransition();
        displayLevel();
        restartGameLoop();
    }
}
