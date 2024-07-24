import { globals, constants } from "./globals.js";
import { startGame } from "./game.js";

export function settings() {
    const startButton = document.getElementById("start-button");

    gameSelector();
    generateColorOptions();

    startButton.addEventListener("click", () => {
        closeSettings();
        startGame();
    });
}

function gameSelector() {
    const images = document.querySelector("#game-selector-images");
    const buttons = document.querySelectorAll("#game-selector-controls button");
    const caption = document.querySelector("#game-selector-controls p");
    const captions = ["Tetris", "Snake", "TetrisMod"];
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
            }
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

function generateColorOptions(colorThemes) {
    const colorOptions = document.getElementById("color-options");

    Object.entries(constants.colorThemes).forEach(([key, value]) => {
        console.log(key);
        console.log(value);

        const colorOption = document.createElement("div");
        const input = document.createElement("input");
        const label = document.createElement("label");

        input.type = "radio";
        input.name = "color";
        input.value = key;
        input.id = key;
        input.classList.add("color-input");

        label.setAttribute("for", input.id);
        label.classList.add("color-label");
        label.style.backgroundColor = value["primary-accent"];
        label.style.setProperty("border", `5px solid ${value["primary-background"]}`);

        colorOption.appendChild(input);
        colorOption.appendChild(label);
        colorOptions.appendChild(colorOption);

        input.addEventListener("click", (event) => {
            setColorTheme(event.target.value);
        });
    });
}

function setColorTheme(theme) {
    const themeColors = constants.colorThemes[theme];

    document.documentElement.style.setProperty(
        "--primary-background",
        `${themeColors["primary-background"]}`
    );
    document.documentElement.style.setProperty(
        "--secondary-background",
        `${themeColors["secondary-background"]}`
    );
    document.documentElement.style.setProperty(
        "--primary-accent",
        `${themeColors["primary-accent"]}`
    );
    document.documentElement.style.setProperty(
        "--secondary-accent",
        `${themeColors["secondary-accent"]}`
    );
}

function closeSettings() {
    const modal = document.getElementById("settings");
    const main = document.querySelector("main");
    modal.style.transform = "scale(1.5)";
    modal.style.filter = "opacity(0)";

    modal.addEventListener("transitionend", onTransitionEnd);

    function onTransitionEnd() {
        modal.style.display = "none";
        modal.removeEventListener("transitionend", onTransitionEnd);
    }

    main.style.filter = "opacity(1)";
    main.style.transform = "scale(1)";
}

export function openSettings() {
    const modal = document.getElementById("settings");
    modal.style.display = "flex";
    modal.offsetHeight;
    modal.style.transform = "scale(1)";
    modal.style.filter = "opacity(1)";

    document.querySelector("main").style.transform = "scale(0.8)";
}
