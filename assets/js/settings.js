import { globals } from "./globals.js";
import { startGame } from "./game.js";

export function settings() {
    const startButton = document.getElementById("start-button");

    gameSelector();

    startButton.addEventListener("click", () => {
        closeSettings();
        startGame();
    });
}

function gameSelector() {
    const images = document.querySelector("#game-selector-images");
    const buttons = document.querySelectorAll("#game-selector-controls button");
    const caption = document.querySelector("#game-selector-controls p");
    const captions = ["Tetris", "Snake"];
    const buttonActions = {
        "previous-game": -1,
        "next-game": 1,
    };
    let currentIndex = 0;

    for (let button of buttons) {
        button.addEventListener("click", (event) => {
            const buttonId = event.currentTarget.id;

            let newIndex = Math.max(
                0,
                Math.min(currentIndex + buttonActions[buttonId], captions.length - 1)
            );
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateCarousel();
                console.log("update...");
            }

            console.log(currentIndex);
        });
    }

    function updateCarousel() {
        const width = images.parentElement.clientWidth;
        images.style.transform = `translateX(${-currentIndex * width}px)`;
        caption.textContent = captions[currentIndex];
        globals.game = caption.textContent.toLowerCase();
    }

    updateCarousel();
}

function closeSettings() {
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

export function openSettings() {
    const modal = document.getElementById("settings");
    modal.style.display = "flex";
    modal.offsetHeight;
    modal.style.transform = "scale(1)";
    modal.style.filter = "opacity(1)";

    document.querySelector("main").style.transform = "scale(0.8)";
}
