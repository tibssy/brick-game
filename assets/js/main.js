import { startGame } from "./game.js";
import { settings } from "./settings.js";

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    settings();
    startButton.addEventListener("click", () => {
        closeModal();
        startGame();
    });
});

function closeModal() {
    const modal = document.getElementById("settings");
    modal.style.transform = "scale(1.5)";
    modal.style.filter = "opacity(0)";

    modal.addEventListener("transitionend", onTransitionEnd);

    function onTransitionEnd() {
        modal.style.display = "none";
        modal.removeEventListener("transitionend", onTransitionEnd);
    }

    document.querySelector("main").style.transform = "scale(1)";
}

export function openModal() {
    const modal = document.getElementById("settings");
    modal.style.display = "flex";
    modal.offsetHeight;
    modal.style.transform = "scale(1)";
    modal.style.filter = "opacity(1)";

    document.querySelector("main").style.transform = "scale(0.8)";
}
