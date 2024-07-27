import { globals, constants } from "./globals.js";
import {
    displayScore,
    displayLevel,
    displayClearedLines,
    updateAnimationTransition,
} from "./display.js";
import { restartGameLoop } from "./game.js";

export function updateScore(lines) {
    calculateScore(lines);
    calculateLevel(lines);
    displayScore();

    console.log("global initialLevel:", globals.initialLevel);
    console.log("cleared lines:", globals.clearedLines);
    console.log("global level:", globals.level);
    console.log("global interval:", globals.interval);
}

export function resetScore() {
    globals.clearedLines = 0;
    globals.score = 0;
    globals.level = globals.initialLevel;
    globals.interval = 1000 - globals.level * 90;

    displayClearedLines();
    displayScore();
    displayLevel();
}

function calculateScore(lines) {
    globals.score += constants.tetrisScore[lines] * (globals.level + 1);
}

function calculateLevel(lines) {
    globals.clearedLines += lines;
    const initialLevel = globals.initialLevel;
    let newLevel = initialLevel + Math.floor(globals.clearedLines / 10);

    displayClearedLines();
    newLevel = Math.min(newLevel, 10);

    if (globals.level !== newLevel) {
        globals.level = newLevel;
        globals.interval = 1000 - newLevel * 90;
        updateAnimationTransition();
        displayLevel();
        restartGameLoop();
    }
}
