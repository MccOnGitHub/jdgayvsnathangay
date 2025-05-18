let numButtonClicks = 0;
let numButtonClicks2 = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("mainDiv").textContent =
        "JD is gay (the more counts the more he's gay): " + numButtonClicks;
}
function buttonClicked2() {
    numButtonClicks2 = numButtonClicks2 + 1;
    document.getElementById("mainDiv").textContent =
        "Nathan is gay (the more counts the more he's gay): " + numButtonClicks2;
}