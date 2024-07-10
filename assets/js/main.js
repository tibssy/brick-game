import { initializeGame } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
        closeModal();
        initializeGame();
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
