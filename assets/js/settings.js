import { globals, constants } from "./globals.js";
import { startGame } from "./game.js";
import { switchToArea } from "./main.js";

/**
 * Initializes and sets up the application settings.
 */
export function settings() {
    const startButton = document.getElementById("start-button");
    const infoButton = document.querySelector("#info-button");

    // Start the game when the start button is clicked.
    startButton.addEventListener("click", () => {
        switchToArea("game-area");
        startGame();
    });

    // Show game instructions when the info button is clicked.
    infoButton.addEventListener("click", () => {
        switchToArea("instruction-area");
    });

    // Initialize various settings.
    gameSelector();
    generateColorOptions();
    setDarkMode();
    setGridSize();
    setGameSpeed();
    setBrickRotation();
    setLeftHanded();
    setAnimation();
}

/**
 * Handles the game selector carousel functionality.
 */
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

    // Function to handle button clicks
    function handleButtonClick(event) {
        const buttonId = event.currentTarget.id;
        let newIndex = Math.max(0, Math.min(currentIndex + buttonActions[buttonId], captions.length - 1));
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateCarousel();
        }
    }

    // Add event listeners to carousel buttons.
    for (let button of buttons) {
        button.addEventListener("click", handleButtonClick);
    }

    // Updates the carousel to display the current game.
    function updateCarousel() {
        const width = images.parentElement.clientWidth;
        images.style.transform = `translateX(${-currentIndex * width}px)`;
        caption.textContent = captions[currentIndex];
        globals.game = caption.textContent.toLowerCase();
    }

    // Initialize the carousel display.
    updateCarousel();
}

/**
 * Sets up the dark mode toggle functionality.
 */
function setDarkMode() {
    const toggleSwitch = document.querySelector("#dark-mode-selector input");

    // Updates the color theme based on dark/light mode.
    const updateDarkLightMode = () => {
        globals.colorMode = globals.colorMode === "dark" ? "light" : "dark";
        setColorTheme(document.querySelector('input[name="color"]:checked').value);
    };

    toggleSwitch.addEventListener("change", updateDarkLightMode);
}

/**
 * Generates color theme options for the user to select.
 */
function generateColorOptions() {
    const colorOptions = document.getElementById("color-options");
    let isFirst = true;

    // Create and append color options.
    Object.entries(constants.hslColorThemes.hue).forEach(([key, hue]) => {
        const colorOption = document.createElement("div");
        const input = document.createElement("input");
        const label = document.createElement("label");
        const hiddenText = document.createElement("span");

        input.type = "radio";
        input.name = "color";
        input.value = key;
        input.id = key;
        input.classList.add("color-input");
        input.setAttribute("aria-label", `Color option ${key}`);

        if (isFirst) {
            input.checked = true;
            isFirst = false;
        }

        label.setAttribute("for", input.id);
        label.classList.add("color-label");
        label.style.backgroundColor = `hsl(${hue}, ${constants.hslColorThemes.light["primary-accent"]})`;
        hiddenText.classList.add("remove-element");
        hiddenText.textContent = `Color option ${key}`;
        label.appendChild(hiddenText);

        colorOption.appendChild(input);
        colorOption.appendChild(label);
        colorOptions.appendChild(colorOption);

        input.addEventListener("click", (event) => {
            setColorTheme(event.target.value);
        });
    });
}

/**
 * Sets the color theme of the application.
 *
 * @param {string} theme - The selected color theme.
 */
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

/**
 * Sets up increment and decrement button functionality.
 *
 * @param {string} buttonSelector - The selector for the increment/decrement buttons.
 * @param {string} valueDisplaySelector - The selector for the value display element.
 * @param {Function} updateCallback - The callback function to update the value.
 */
function setupIncrementDecrementButtons(buttonSelector, valueDisplaySelector, updateCallback) {
    const buttons = document.querySelectorAll(buttonSelector);
    const valueToDisplay = document.querySelector(valueDisplaySelector);

    // Add event listeners to increment and decrement buttons.
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const increment = button.classList.contains("button-increment") ? 1 : -1;
            updateCallback(increment, valueToDisplay);
        });
    });
}

/**
 * Sets up the grid size selection functionality.
 */
function setGridSize() {
    const valueRange = [6, 12];

    /**
     * Updates the grid size based on user input.
     *
     * @param {number} increment - The increment value to adjust the grid size.
     * @param {HTMLElement} valueToDisplay - The element to display the current grid size.
     */
    const updateGridSize = (increment, valueToDisplay) => {
        let newValue = globals.gridSize[0] + increment;
        newValue = Math.max(valueRange[0], Math.min(newValue, valueRange[1]));
        globals.gridSize = [newValue, newValue * 2];
        valueToDisplay.textContent = `${newValue} x ${newValue * 2}`;
    };

    setupIncrementDecrementButtons("#grid-size-selector > div button", "#grid-size-selector > div p", updateGridSize);
}

/**
 * Sets up the game speed selection functionality.
 */
function setGameSpeed() {
    const valueRange = [0, 10];
    let currentValue = 0;

    /**
     * Updates the game speed based on user input.
     *
     * @param {number} increment - The increment value to adjust the game speed.
     * @param {HTMLElement} valueToDisplay - The element to display the current game speed.
     */
    const updateGameSpeed = (increment, valueToDisplay) => {
        currentValue = Math.max(valueRange[0], Math.min(currentValue + increment, valueRange[1]));
        valueToDisplay.textContent = `${currentValue}`;
        globals.level = currentValue;
        globals.initialLevel = currentValue;
        globals.interval = 1000 - currentValue * 90;
    };

    setupIncrementDecrementButtons("#speed-selector > div button", "#speed-selector > div p", updateGameSpeed);
}

/**
 * Sets up the brick rotation direction functionality.
 */
function setBrickRotation() {
    const button = document.querySelector("#rotation-selector button");
    const rotationIcons = {
        clockwise: `<i class="fa-solid fa-rotate-right"></i>`,
        counterclockwise: `<i class="fa-solid fa-rotate-left"></i>`,
    };

    // Updates the brick rotation direction icon.
    const updateRotationIcon = () => {
        globals.rotation = globals.rotation === "clockwise" ? "counterclockwise" : "clockwise";
        button.innerHTML = rotationIcons[globals.rotation];
    };

    button.addEventListener("click", updateRotationIcon);
}

/**
 * Sets up the left-handed mode functionality.
 */
function setLeftHanded() {
    const toggleSwitch = document.querySelector("#left-hand-selector input");

    // Updates the application for left-handed mode.
    const updateHandedness = () => {
        globals.isLeftHanded = !globals.isLeftHanded;
        const gameArea = document.querySelector("#game-area");
        const powerButtons = document.querySelector("#power-buttons");

        gameArea.classList.toggle("left-handed", globals.isLeftHanded);
        powerButtons.classList.toggle("left-handed", globals.isLeftHanded);
    };

    toggleSwitch.addEventListener("change", updateHandedness);
}

/**
 * Sets up the animation toggle functionality.
 */
function setAnimation() {
    const toggleSwitch = document.querySelector("#animation-selector input");

    // Updates the animation mode.
    const updateAnimationMode = () => {
        globals.animation = !globals.animation;
    };

    toggleSwitch.addEventListener("click", updateAnimationMode);
}
