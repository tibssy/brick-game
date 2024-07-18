import { globals, constants } from "./globals.js";

export function settings() {
    gameSelector();
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

            currentIndex = Math.max(0, Math.min(buttonActions[buttonId], captions.length));

            updateCarousel();
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
