let numButtonClicks = 0;
let numButtonClicks2 = 0;

function buttonClicked() {
    numButtonClicks++;
    document.getElementById("mainDiv").textContent =
        "JD is gay (the more counts the more he's gay): " + numButtonClicks;
}

function buttonClicked2() {
    numButtonClicks2++;
    document.getElementById("mainDiv").textContent =
        "Nathan is gay (the more counts the more he's gay): " + numButtonClicks2;
}

function stopp() {
    const username = prompt("Enter your username:");
    if (!username) return;

    // POST score to your API (Supabase backend)
    fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: username,
            jd: numButtonClicks,
            nathan: numButtonClicks2
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Score saved!");
        numButtonClicks = 0;
        numButtonClicks2 = 0;
        loadLeaderboard(); // refresh leaderboard from backend
    })
    .catch(err => {
        console.error(err);
        alert("Error saving score");
    });
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

window.onload = loadLeaderboard;
