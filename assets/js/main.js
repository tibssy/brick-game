import { globals } from "./globals.js";
import { buildGame } from "./tetris.js";

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
        closeModal();
        buildGame();
        console.log(globals);
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

    document.getElementsByTagName("main")[0].style.transform = "scale(1)";
}
