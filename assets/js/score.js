import { globals, constants } from "./globals.js";
import { displayScore, displayLevel, displayClearedLines, displayScores } from "./display.js";
import { restartGameLoop } from "./game.js";
import { switchToArea } from "./main.js";

/**
 * Handles the display and management of high scores, including saving new scores and updating the leaderboard.
 */
export function highScore() {
    const playerInput = document.querySelector("#player-input");
    const exitButton = document.getElementById("close-score");
    const scores = [globals.score, globals.clearedLines];
    const tableHeadElements = document.querySelectorAll("#score-table table th");
    let playerName = document.getElementById("player-name");
    const saveScoreButton = document.getElementById("save-score");
    const timeStamp = getTimeStamp();

    // Set up sorting for table columns when headers are clicked
    tableHeadElements.forEach((th) => {
        th.addEventListener("click", () => {
            updateTable(getSortedHighscores(th.textContent.toLocaleLowerCase()));
        });
    });

    // Closes the score entry form and switches to the settings area
    const closeScores = () => {
        switchToArea("settings-area");
        resetScore();
        playerName.value = "";
        exitButton.removeEventListener("click", closeScores);
        saveScoreButton.removeEventListener("click", saveScore);
    };

    // Saves the new score to local storage and updates the scores table
    const saveScore = () => {
        if (playerName.value) {
            saveHighscore(playerName.value, parseInt(scores[0]), globals.game, timeStamp);
            playerName.value = "";
            playerInput.style.display = "none";
            updateTable(getHighscores());
        }
    };

    // Display the input form and set up event listeners for saving and closing scores
    playerInput.style.display = "unset";
    exitButton.addEventListener("click", closeScores);
    saveScoreButton.addEventListener("click", saveScore);
    displayScores(scores);
    updateTable(getHighscores());
}

/**
 * Updates the Tetris score based on the number of lines cleared and adjusts the level.
 *
 * @param {number} lines - The number of lines cleared in Tetris.
 */
export function updateTetrisScore(lines) {
    updateScore(constants.tetrisScore[lines]);
    calculateLevel(lines, 10);
}

/**
 * Updates the Snake score and adjusts the level.
 */
export function updateSnakeScore() {
    updateScore(40);
    calculateLevel(1, 5);
}

/**
 * Resets the score, level, and cleared lines to their initial values.
 */
export function resetScore() {
    globals.clearedLines = 0;
    globals.score = 0;
    globals.level = globals.initialLevel;
    globals.interval = 1000 - globals.level * 90;

    displayClearedLines();
    displayScore();
    displayLevel();
}

/**
 * Updates the player's score and refreshes the score display.
 *
 * @param {number} baseScore - The base score to add to the current score.
 */
function updateScore(baseScore) {
    globals.score += baseScore * (globals.level + 1);
    displayScore();
}

/**
 * Calculates and updates the game level based on the number of cleared lines.
 *
 * @param {number} increment - The number of lines cleared or the increment for score.
 * @param {number} levelThreshold - The number of cleared lines required to level up.
 */
function calculateLevel(increment, levelThreshold) {
    globals.clearedLines += increment;
    const initialLevel = globals.initialLevel;
    let newLevel = initialLevel + Math.floor(globals.clearedLines / levelThreshold);

    displayClearedLines();
    newLevel = Math.min(newLevel, 10);

    if (globals.level !== newLevel) {
        let interval = 1000 - newLevel * 90;
        globals.level = newLevel;
        globals.interval = interval;
        displayLevel();
        restartGameLoop();
    }
}

/**
 * Generates a timestamp in the format MM/DD - HH:MM.
 *
 * @returns {string} The formatted timestamp.
 */
function getTimeStamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${month}/${day} - ${hours}:${minutes}`;
}

/**
 * Updates the scores table with the provided list of high scores.
 *
 * @param {Array} scores - The list of high scores to display in the table.
 */
function updateTable(scores) {
    const table = document.querySelector("#score-table table");
    const tableBody = table.querySelector("tbody");

    if (tableBody.children.length) {
        tableBody.innerHTML = "";
    }

    scores.forEach((element) => {
        const tableRow = `
            <tr>
                <td>${element.player}</td>
                <td>${element.score}</td>
                <td>${element.game}</td>
                <td>${element.date}</td>
            </tr>`;

        tableBody.insertAdjacentHTML("afterbegin", tableRow);
    });
}

/**
 * Saves a new high score to local storage.
 *
 * @param {string} player - The player's name.
 * @param {number} score - The score achieved.
 * @param {string} game - The name of the game.
 * @param {string} date - The date the score was achieved.
 */
function saveHighscore(player, score, game, date) {
    const highscore = { player, score, game, date };
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.push(highscore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

/**
 * Retrieves the list of high scores from local storage.
 *
 * @returns {Array} The list of high scores.
 */
function getHighscores() {
    return JSON.parse(localStorage.getItem("highscores")) || [];
}

/**
 * Retrieves and sorts the high scores based on the specified key.
 *
 * @param {string} sortKey - The key by which to sort the scores ('score' or 'date').
 * @returns {Array} The sorted list of high scores.
 */
function getSortedHighscores(sortKey) {
    const highscores = getHighscores();

    if (sortKey === "score") {
        return highscores.sort((a, b) => a[sortKey] - b[sortKey]);
    } else if (sortKey === "date") {
        return highscores.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    } else {
        return highscores.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
    }
}
