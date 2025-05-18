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

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function stopp() {
    const username = prompt("Enter your username:");
    if (!username) return;

    leaderboard.push({
        name: username,
        jd: numButtonClicks,
        nathan: numButtonClicks2
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    numButtonClicks = 0;
    numButtonClicks2 = 0;

    let leaderboardHTML = "<h2>Leaderboard</h2><ul>";
    leaderboard.forEach(entry => {
        leaderboardHTML += `<li>${entry.name} - JD: ${entry.jd}, Nathan: ${entry.nathan}</li>`;
    });
    leaderboardHTML += "</ul>";

    document.getElementById("mainDiv").innerHTML = leaderboardHTML;
}
function loadLeaderboard() {
    fetch('/api/get-scores')
        .then(res => res.json())
        .then(data => {
            let leaderboardHTML = "<h2>🏆 Leaderboard</h2><ul>";
            data.forEach(entry => {
                leaderboardHTML += `<li>${entry.name} - JD: ${entry.jd}, Nathan: ${entry.nathan}</li>`;
            });
            leaderboardHTML += "</ul>";
            document.getElementById("mainDiv").innerHTML = leaderboardHTML;
        })
        .catch(err => {
            console.error("Failed to load leaderboard", err);
            document.getElementById("mainDiv").textContent = "Error loading leaderboard";
        });
}
