const fs = require("fs");
const { createEvents } = require("ics");

// Leer datos del JSON
const data = JSON.parse(fs.readFileSync("./data/matches.json", "utf-8"));

let events = [];

data.competitions.forEach((competition) => {
  competition.matches.forEach((match) => {

    // ✅ VALIDACIÓN PRIMERO (IMPORTANTE)
    if (!match.home || !match.away || !match.date) {
      console.log("❌ Invalid match skipped:", match.id);
      return;
    }

    // 📅 Procesar fecha
    const [year, month, day] = match.date.split("-").map(Number);

    // ⏰ Manejo de hora (híbrido)
    let time;

    if (!match.time || match.status === "estimated") {
      time = [12, 0]; // default seguro para estimados
    } else {
      time = match.time.split(":").map(Number);
    }

    // 📌 Crear evento
    events.push({
      title: `${match.home} vs ${match.away}`,
      description: [
        `🏆 ${competition.name}`,
        `📊 Status: ${match.status}`,
        `📡 Source: ${match.source || "manual"}`
      ].join("\n"),
      location: `${match.stadium}, ${match.city}`,
      start: [year, month, day, time[0], time[1]],
      duration: { hours: 2 }
    });

  });
});

// 📤 Generar archivo .ics
createEvents(events, (error, value) => {
  if (error) {
    console.log("Error:", error);
    return;
  }

  fs.writeFileSync("./calendar/combined.ics", value);
  console.log("✅ Calendar generated successfully!");
});
