import { currentPage } from "./routes/restaurants/_stores";

let currentPageValue;
currentPage.subscribe(value => {
    currentPageValue = value;
});

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function nextPage() {
    currentPage.update(n => n + 1);
    updateBrowserHistory()
}

export function backPage() {
    window.history.go(-1);
}

export function startOver() {
    currentPage.set(1);
    updateBrowserHistory()
}

function updateBrowserHistory() {
    window.history.pushState(currentPageValue, null, "");
}