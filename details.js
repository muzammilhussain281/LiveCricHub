// Dummy data
const matches = {
  "pak-ind": {
    title: "Pakistan vs India",
    status: "Pakistan batting 1st • 280/7 (50 ov)",
    batting: [
      { name: "Babar Azam", runs: 85, balls: 95, fours: 8, sixes: 1 },
      { name: "Rizwan", runs: 65, balls: 70, fours: 5, sixes: 2 },
    ],
    bowling: [
      { name: "Bumrah", overs: "10", runs: 50, wickets: 2 },
      { name: "Shami", overs: "9", runs: 45, wickets: 1 },
    ]
  },
  "eng-aus": {
    title: "England vs Australia",
    status: "England won by 5 wickets",
    batting: [
      { name: "Buttler", runs: 72, balls: 50, fours: 6, sixes: 3 },
      { name: "Root", runs: 45, balls: 40, fours: 4, sixes: 1 },
    ],
    bowling: [
      { name: "Starc", overs: "8", runs: 40, wickets: 2 },
      { name: "Cummins", overs: "9", runs: 42, wickets: 1 },
    ]
  }
};

// Load match by ID
const urlParams = new URLSearchParams(window.location.search);
const matchId = urlParams.get("id");
const match = matches[matchId];

if (match) {
  document.getElementById("match-title").textContent = match.title;
  document.getElementById("match-status").textContent = match.status;

  // Batting table
  let battingHTML = "<tr><th>Batsman</th><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th></tr>";
  match.batting.forEach(p => {
    battingHTML += `<tr><td>${p.name}</td><td>${p.runs}</td><td>${p.balls}</td><td>${p.fours}</td><td>${p.sixes}</td></tr>`;
  });
  document.getElementById("batting-table").innerHTML = battingHTML;

  // Bowling table
  let bowlingHTML = "<tr><th>Bowler</th><th>Overs</th><th>Runs</th><th>Wickets</th></tr>";
  match.bowling.forEach(p => {
    bowlingHTML += `<tr><td>${p.name}</td><td>${p.overs}</td><td>${p.runs}</td><td>${p.wickets}</td></tr>`;
  });
  document.getElementById("bowling-table").innerHTML = bowlingHTML;
}
