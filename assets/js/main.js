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
        if (style.display !== "none" && !area.classList.contains("closed-element-a")) {
            currentArea = area;
        }
    });

    if (currentArea && nextArea) {
        nextArea.classList.add("display-flex");
        nextArea.offsetHeight;

        currentArea.classList.add("hide-element-a");
        nextArea.classList.remove("closed-element-a");
        nextArea.classList.add("show-element-a");

        const onTransitionEnd = () => {
            currentArea.classList.remove("show-element-a", "hide-element-a");
            currentArea.classList.add("closed-element-a");
            currentArea.classList.remove("display-flex");
            currentArea.removeEventListener("transitionend", onTransitionEnd);
        };

        currentArea.addEventListener("transitionend", onTransitionEnd);
    }
}
