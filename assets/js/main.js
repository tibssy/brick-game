import { settings } from "./settings.js";

document.addEventListener("DOMContentLoaded", () => {
    settings();
});

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
