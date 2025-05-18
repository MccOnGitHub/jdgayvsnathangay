import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('jd', { ascending: false }); // Sort by JD score (you can change)

  if (error) {
    return res.status(500).json({ message: 'Error fetching scores', error });
  }

  res.status(200).json(data);
}function loadLeaderboard() {
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


