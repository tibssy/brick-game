import { settings } from "./settings.js";

registerServiceWorker();

document.addEventListener("DOMContentLoaded", () => {
    welcome();
    settings();
});

function welcome() {
    if (localStorage.getItem("hideOnStartup") === "true") return;

    switchToArea("welcome-area");

    const closeWelcomeButton = document.querySelector("#close-welcome");
    const closeWelcome = () => {
        switchToArea("settings-area");
        localStorage.setItem("hideOnStartup", !document.querySelector("#show-welcome input").checked);
        closeWelcomeButton.removeEventListener("click", closeWelcome);
    };

    closeWelcomeButton.addEventListener("click", closeWelcome);
}

export function switchToArea(nextAreaId) {
    const nextArea = document.getElementById(nextAreaId);
    const areas = document.querySelectorAll("main > div");
    let currentArea;

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

        const onTransitionEnd = () => {
            currentArea.classList.remove("show-area", "hide-area");
            currentArea.classList.add("closed-area");
            currentArea.classList.remove("display-flex");
            currentArea.removeEventListener("transitionend", onTransitionEnd);
        };

        currentArea.addEventListener("transitionend", onTransitionEnd);
    }
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then((registration) => {
                console.log("Registered!");
            })
            .catch(console.error);
    }
}
