import { globals, constants } from "./globals.js";
import { startGame } from "./game.js";

export function settings() {
    const startButton = document.getElementById("start-button");

    gameSelector();
    generateColorOptions();
    setGridSize();
    setGameSpeed();
    setBrickRotation();
    setLeftHanded();

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

function generateColorOptions() {
    const colorOptions = document.getElementById("color-options");

    Object.entries(constants.colorThemes).forEach(([key, value]) => {
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

function setGridSize() {
    const buttons = document.querySelectorAll("#grid-size-selector > div button");
    const valueToDisplay = document.querySelector("#grid-size-selector > div p");
    const valueRange = [6, 12];

    for (let button of buttons) {
        console.log(button);
        console.log(button.className);
        button.addEventListener("click", () => {
            let adjustedValue;
            let value =
                button.className === "button-increment"
                    ? 1
                    : button.className === "button-decrement"
                    ? -1
                    : 0;

            value += globals.gridSize[0];
            adjustedValue = Math.max(valueRange[0], Math.min(value, valueRange[1]));
            globals.gridSize = [adjustedValue, adjustedValue * 2];
            valueToDisplay.textContent = `${adjustedValue} x ${adjustedValue * 2}`;
        });
    }
}

function setGameSpeed() {
    const buttons = document.querySelectorAll("#speed-selector > div button");
    const valueToDisplay = document.querySelector("#speed-selector > div p");
    const valueRange = [1, 10];
    const originalInterval = 1000;
    let currentValue = 1;

    for (let button of buttons) {
        console.log(button);
        console.log(button.className);
        button.addEventListener("click", () => {
            let adjustedValue;
            let value =
                button.className === "button-increment"
                    ? 1
                    : button.className === "button-decrement"
                    ? -1
                    : 0;

            currentValue += value;
            adjustedValue = Math.max(valueRange[0], Math.min(currentValue, valueRange[1]));
            currentValue = adjustedValue;
            globals.interval = parseInt(originalInterval / adjustedValue);
            document.documentElement.style.setProperty(
                "--transition",
                `${parseInt(globals.interval / 3)}ms ease-in-out`
            );
            valueToDisplay.textContent = `${adjustedValue}`;
        });
    }
}

function setBrickRotation() {
    const button = document.querySelector("#rotation-selector button");
    const rotation = {
        clockwise: `<i class="fa-solid fa-rotate-right"></i>`,
        counterclockwise: `<i class="fa-solid fa-rotate-left"></i>`,
    };

    button.addEventListener("click", () => {
        globals.rotation = globals.rotation === "clockwise" ? "counterclockwise" : "clockwise";
        button.innerHTML = rotation[globals.rotation];
    });
}

function setLeftHanded() {
    const toggleSwitch = document.querySelector("#left-hand-selector input");

    toggleSwitch.addEventListener("change", () => {
        globals.isLeftHanded = !globals.isLeftHanded;
        const mainElement = document.querySelector("main");
        const powerButtons = document.querySelector("#power-buttons");

        mainElement.classList.toggle("left-handed", globals.isLeftHanded);
        powerButtons.classList.toggle("left-handed", globals.isLeftHanded);
    });
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
