// ============================================
// Seven Sports Calendar - Script Principal
// ============================================

/**
 * Array de partidos con información de torneo, equipos y fecha
 * Estructura: { tournament, team1, team2, date, time }
 */
const matches = [
    {
        tournament: 'Liga MX - Apertura',
        team1: 'América',
        team2: 'Guadalajara',
        date: '2024-07-14',
        time: '19:00'
    },
    {
        tournament: 'Liga MX - Apertura',
        team1: 'UNAM',
        team2: 'Tigres',
        date: '2024-07-15',
        time: '21:00'
    },
    {
        tournament: 'Liga MX - Apertura',
        team1: 'Monterrey',
        team2: 'Toluca',
        date: '2024-07-16',
        time: '19:30'
    },
    {
        tournament: 'UEFA Champions League',
        team1: 'Real Madrid',
        team2: 'Manchester City',
        date: '2024-07-20',
        time: '20:00'
    },
    {
        tournament: 'UEFA Champions League',
        team1: 'Bayern Munich',
        team2: 'PSG',
        date: '2024-07-21',
        time: '20:30'
    },
    {
        tournament: 'Liga MX - Apertura',
        team1: 'Santos',
        team2: 'Pumas',
        date: '2024-07-22',
        time: '20:00'
    },
    {
        tournament: 'Copa Libertadores',
        team1: 'Flamengo',
        team2: 'Boca Juniors',
        date: '2024-07-25',
        time: '21:30'
    },
    {
        tournament: 'Copa Libertadores',
        team1: 'River Plate',
        team2: 'São Paulo',
        date: '2024-07-26',
        time: '21:00'
    }
];

/**
 * Función para renderizar los partidos en el DOM
 * Recorre el array de partidos y crea elementos HTML para cada uno
 */
function renderMatches() {
    const matchesList = document.getElementById('matches');
    
    // Limpiar la lista antes de agregar elementos
    matchesList.innerHTML = '';
    
    // Iterar sobre cada partido y crear su elemento HTML
    matches.forEach(match => {
        const li = document.createElement('li');
        li.className = 'match-item';
        
        // Construir el contenido HTML del partido
        li.innerHTML = `
            <span class="match-tournament">${match.tournament}</span>
            <div class="match-teams">
                <div class="match-team">
                    <span class="team-name">${match.team1}</span>
                </div>
                <div class="vs-separator">VS</div>
                <div class="match-team">
                    <span class="team-name">${match.team2}</span>
                </div>
            </div>
            <div class="match-date">
                <span>${formatDate(match.date)}</span>
                <span class="match-time">${match.time}</span>
            </div>
        `;
        
        // Agregar el elemento a la lista
        matchesList.appendChild(li);
    });
}

/**
 * Función para formatear la fecha en formato legible
 * Convierte YYYY-MM-DD a "Domingo, 14 de Julio"
 * 
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada
 */
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Función para manejar la suscripción del usuario
 * Muestra un mensaje de confirmación
 */
function handleSubscribe() {
    alert('¡Gracias por suscribirte! Pronto recibirás actualizaciones de próximos partidos.');
    console.log('Usuario suscrito al calendario deportivo');
}

/**
 * Función para descargar el archivo .ics
 * Crea un archivo de calendario con los próximos partidos
 */
function handleDownload() {
    // Crear contenido ICS básico
    let icsContent = 'BEGIN:VCALENDAR\n';
    icsContent += 'VERSION:2.0\n';
    icsContent += 'PRODID:-//Seven Sports Calendar//EN\n';
    icsContent += 'CALSCALE:GREGORIAN\n';
    icsContent += 'METHOD:PUBLISH\n';
    
    // Agregar cada partido como un evento
    matches.forEach((match, index) => {
        const eventDate = match.date.replace(/-/g, '');
        const eventTime = match.time.replace(/:/g, '');
        
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `DTSTART:${eventDate}T${eventTime}00Z\n`;
        icsContent += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `UID:match-${index}-${Date.now()}@sevensportscalendar.com\n`;
        icsContent += `SUMMARY:${match.tournament} - ${match.team1} vs ${match.team2}\n`;
        icsContent += `DESCRIPTION:${match.team1} vs ${match.team2}\\nTorneo: ${match.tournament}\n`;
        icsContent += 'STATUS:CONFIRMED\n';
        icsContent += 'SEQUENCE:0\n';
        icsContent += 'END:VEVENT\n';
    });
    
    icsContent += 'END:VCALENDAR\n';
    
    // Crear blob y descargar
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'seven-sports-calendar.ics');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Archivo .ics descargado exitosamente');
}

/**
 * Event Listeners
 * Se ejecutan cuando el documento ha cargado completamente
 */
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar partidos al cargar la página
    renderMatches();
    
    // Agregar eventos a los botones
    const subscribeBtn = document.getElementById('subscribe-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', handleSubscribe);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleDownload);
    }
    
    console.log('Seven Sports Calendar cargado correctamente');
});
