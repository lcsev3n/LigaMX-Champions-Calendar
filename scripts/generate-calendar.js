const fs = require("fs");
const { createEvents } = require("ics");

// Leer datos del JSON
const data = JSON.parse(fs.readFileSync("./data/matches.json", "utf-8"));

let events = [];

data.competitions.forEach((competition) => {
  competition.matches.forEach((match) => {

    if (!match.date) return;

    const [year, month, day] = match.date.split("-").map(Number);

    let time = match.time ? match.time.split(":").map(Number) : [12, 0];

    events.push({
      title: `${match.home} vs ${match.away}`,
      description: `Competition: ${competition.name}\nStatus: ${match.status}`,
      location: `${match.stadium}, ${match.city}`,
      start: [year, month, day, time[0], time[1]],
      duration: { hours: 2 }
    });
  });
});

createEvents(events, (error, value) => {
  if (error) {
    console.log("Error:", error);
    return;
  }

  fs.writeFileSync("./calendar/combined.ics", value);
  console.log("✅ Calendar generated successfully!");
});
