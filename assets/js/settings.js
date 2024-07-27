import { globals, constants } from "./globals.js";
import { startGame } from "./game.js";

export function settings() {
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", () => {
        closeSettings();
        startGame();
    });

    gameSelector();
    generateColorOptions();
    setGridSize();
    setGameSpeed();
    setBrickRotation();
    setLeftHanded();
    setAnimation();
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

function setupIncrementDecrementButtons(buttonSelector, valueDisplaySelector, updateCallback) {
    const buttons = document.querySelectorAll(buttonSelector);
    const valueToDisplay = document.querySelector(valueDisplaySelector);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const increment = button.classList.contains("button-increment") ? 1 : -1;
            updateCallback(increment, valueToDisplay);
        });
    });
}

function setGridSize() {
    const valueRange = [6, 12];

    const updateGridSize = (increment, valueToDisplay) => {
        let newValue = globals.gridSize[0] + increment;
        newValue = Math.max(valueRange[0], Math.min(newValue, valueRange[1]));
        globals.gridSize = [newValue, newValue * 2];
        valueToDisplay.textContent = `${newValue} x ${newValue * 2}`;
    };

    setupIncrementDecrementButtons(
        "#grid-size-selector > div button",
        "#grid-size-selector > div p",
        updateGridSize
    );
}

function setGameSpeed() {
    const valueRange = [1, 10];
    const originalInterval = 1000;
    const minInterval = 100;
    let currentValue = 1;

    const updateGameSpeed = (increment, valueToDisplay) => {
        currentValue = Math.max(valueRange[0], Math.min(currentValue + increment, valueRange[1]));
        globals.interval = minInterval + (originalInterval - currentValue * 100);
        updateAnimationTransition();
        valueToDisplay.textContent = `${currentValue}`;
    };

    setupIncrementDecrementButtons(
        "#speed-selector > div button",
        "#speed-selector > div p",
        updateGameSpeed
    );
}

function setBrickRotation() {
    const button = document.querySelector("#rotation-selector button");
    const rotationIcons = {
        clockwise: `<i class="fa-solid fa-rotate-right"></i>`,
        counterclockwise: `<i class="fa-solid fa-rotate-left"></i>`,
    };

    const updateRotationIcon = () => {
        globals.rotation = globals.rotation === "clockwise" ? "counterclockwise" : "clockwise";
        button.innerHTML = rotationIcons[globals.rotation];
    };

    button.addEventListener("click", updateRotationIcon);
}

function setLeftHanded() {
    const toggleSwitch = document.querySelector("#left-hand-selector input");

    const updateHandedness = () => {
        globals.isLeftHanded = !globals.isLeftHanded;
        const mainElement = document.querySelector("main");
        const powerButtons = document.querySelector("#power-buttons");

        mainElement.classList.toggle("left-handed", globals.isLeftHanded);
        powerButtons.classList.toggle("left-handed", globals.isLeftHanded);
    };

    toggleSwitch.addEventListener("change", updateHandedness);
}

function setAnimation() {
    const toggleSwitch = document.querySelector("#animation-selector input");

    const updateAnimationMode = () => {
        globals.animation = !globals.animation;
        updateAnimationTransition();
    };

    toggleSwitch.addEventListener("click", updateAnimationMode);
}

function updateAnimationTransition() {
    const isAnimate = globals.animation
        ? `${Math.floor(globals.interval / 3)}ms ease-in-out`
        : "none";
    document.documentElement.style.setProperty("--transition", isAnimate);
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
