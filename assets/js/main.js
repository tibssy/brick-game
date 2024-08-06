import { settings } from "./settings.js";

// Register the service worker to enable offline functionality and other background features.
registerServiceWorker();

// Execute when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    settings();
    gameInstuctions();
});

/**
 * Handles the display and functionality of game instructions.
 */
function gameInstuctions() {
    const closeInstructionButton = document.querySelector("#close-instruction");

    // Switches to the settings area when the close instruction button is clicked.
    const closeInstruction = () => {
        switchToArea("settings-area");
    };

    closeInstructionButton.addEventListener("click", closeInstruction);
}

/**
 * Switches the visible area of the application to the specified area.
 *
 * @param {string} nextAreaId - The ID of the area to switch to.
 */
export function switchToArea(nextAreaId) {
    const nextArea = document.getElementById(nextAreaId);
    const areas = document.querySelectorAll("main > div");
    let currentArea;

    // Determine the current visible area.
    areas.forEach((area) => {
        const style = window.getComputedStyle(area);
        if (style.display !== "none" && !area.classList.contains("closed-area")) {
            currentArea = area;
        }
    });

    if (currentArea && nextArea) {
        nextArea.classList.add("display-flex");
        nextArea.offsetHeight;

        currentArea.classList.add("hide-area");
        nextArea.classList.remove("closed-area");
        nextArea.classList.add("show-area");

        /**
         * Handles the end of the transition between areas.
         */
        const onTransitionEnd = () => {
            currentArea.classList.remove("show-area", "hide-area");
            currentArea.classList.add("closed-area");
            currentArea.classList.remove("display-flex");
            currentArea.removeEventListener("transitionend", onTransitionEnd);
        };

        currentArea.addEventListener("transitionend", onTransitionEnd);
    }
}

/**
 * Registers the service worker for the application, if supported by the browser.
 */
function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then((registration) => {
                // Service worker registered successfully.
            })
            .catch(console.error);
    }
}
