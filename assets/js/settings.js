import { globals, constants } from "./globals.js";
import { startGame } from "./game.js";
import { switchToArea } from "./main.js";

export function settings() {
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", () => {
        switchToArea("game-area");
        startGame();
    });

    gameSelector();
    generateColorOptions();
    setDarkMode();
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
    const captions = ["Tetris", "Snake", "Tetris Extra"];
    const buttonActions = {
        "previous-game": -1,
        "next-game": 1,
    };
    let currentIndex = 0;

    for (let button of buttons) {
        button.addEventListener("click", (event) => {
            const buttonId = event.currentTarget.id;

            let newIndex = Math.max(0, Math.min(currentIndex + buttonActions[buttonId], captions.length - 1));
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

function setDarkMode() {
    const toggleSwitch = document.querySelector("#dark-mode-selector input");

    const updateDarkLightMode = () => {
        globals.colorMode = globals.colorMode === "dark" ? "light" : "dark";
        setColorTheme(document.querySelector('input[name="color"]:checked').value);
    };

    toggleSwitch.addEventListener("change", updateDarkLightMode);
}

function generateColorOptions() {
    const colorOptions = document.getElementById("color-options");
    let isFirst = true;

    Object.entries(constants.hslColorThemes.hue).forEach(([key, hue]) => {
        const colorOption = document.createElement("div");
        const input = document.createElement("input");
        const label = document.createElement("label");

        input.type = "radio";
        input.name = "color";
        input.value = key;
        input.id = key;
        input.classList.add("color-input");

        if (isFirst) {
            input.checked = true;
            isFirst = false;
        }

        label.setAttribute("for", input.id);
        label.classList.add("color-label");
        label.style.backgroundColor = `hsl(${hue}, ${constants.hslColorThemes.light["primary-accent"]})`;

        colorOption.appendChild(input);
        colorOption.appendChild(label);
        colorOptions.appendChild(colorOption);

        input.addEventListener("click", (event) => {
            setColorTheme(event.target.value);
        });
    });
}

function setColorTheme(theme) {
    const hueValue = constants.hslColorThemes.hue[theme];
    const slValues = constants.hslColorThemes[globals.colorMode];
    const carouselImages = document.querySelectorAll(".carousel-image");

    carouselImages.forEach((image) => {
        image.style.filter = `hue-rotate(${hueValue - 33}deg) contrast(1.3)`;
    });

    document.documentElement.style.setProperty(
        "--primary-background",
        `hsl(${hueValue}, ${slValues["primary-background"]})`
    );
    document.documentElement.style.setProperty(
        "--secondary-background",
        `hsl(${hueValue}, ${slValues["secondary-background"]})`
    );
    document.documentElement.style.setProperty("--primary-accent", `hsl(${hueValue}, ${slValues["primary-accent"]})`);
    document.documentElement.style.setProperty(
        "--secondary-accent",
        `hsl(${hueValue}, ${slValues["secondary-accent"]})`
    );
    document.documentElement.style.setProperty("--font-color", `hsl(${hueValue}, ${slValues["font-color"]})`);
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

    setupIncrementDecrementButtons("#grid-size-selector > div button", "#grid-size-selector > div p", updateGridSize);
}

function setGameSpeed() {
    const valueRange = [0, 10];
    let currentValue = 0;

    const updateGameSpeed = (increment, valueToDisplay) => {
        currentValue = Math.max(valueRange[0], Math.min(currentValue + increment, valueRange[1]));
        valueToDisplay.textContent = `${currentValue}`;
        globals.level = currentValue;
        globals.initialLevel = currentValue;
        globals.interval = 1000 - currentValue * 90;
    };

    setupIncrementDecrementButtons("#speed-selector > div button", "#speed-selector > div p", updateGameSpeed);
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
        const gameArea = document.querySelector("#game-area");
        const powerButtons = document.querySelector("#power-buttons");

        gameArea.classList.toggle("left-handed", globals.isLeftHanded);
        powerButtons.classList.toggle("left-handed", globals.isLeftHanded);
    };

    toggleSwitch.addEventListener("change", updateHandedness);
}

function setAnimation() {
    const toggleSwitch = document.querySelector("#animation-selector input");

    const updateAnimationMode = () => {
        globals.animation = !globals.animation;
    };

    toggleSwitch.addEventListener("click", updateAnimationMode);
}
