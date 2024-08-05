import { globals, constants } from "./globals.js";
import { displayScore, displayLevel, displayClearedLines, displayScores } from "./display.js";
import { restartGameLoop } from "./game.js";
import { switchToArea } from "./main.js";

export function highScore() {
    const exitButton = document.getElementById("close-score");
    const scores = [globals.score, globals.clearedLines];
    const tableHeadElements = document.querySelectorAll("#score-table table th");
    let playerName = document.getElementById("player-name");
    const saveScoreButton = document.getElementById("save-score");
    const timeStamp = getTimeStamp();

    tableHeadElements.forEach((th) => {
        th.addEventListener("click", () => {
            updateTable(getSortedHighscores(th.textContent.toLocaleLowerCase()));
        });
    });

    const closeScores = () => {
        switchToArea("settings-area");
        resetScore();
        playerName.value = "";
        exitButton.removeEventListener("click", closeScores);
        saveScoreButton.removeEventListener("click", saveScore);
    };

    const saveScore = () => {
        if (playerName.value) {
            saveHighscore(playerName.value, parseInt(scores[0]), globals.game, timeStamp);
            playerName.value = "";
            updateTable(getHighscores());
        }
    };

    exitButton.addEventListener("click", closeScores);
    saveScoreButton.addEventListener("click", saveScore);
    displayScores(scores);
    updateTable(getHighscores());
}

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
        globals.interval = interval;
        displayLevel();
        restartGameLoop();
    }
}

function getTimeStamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${month}/${day} - ${hours}:${minutes}`;
}

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

function saveHighscore(player, score, game, date) {
    const highscore = { player, score, game, date };
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.push(highscore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function getHighscores() {
    return JSON.parse(localStorage.getItem("highscores")) || [];
}

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
