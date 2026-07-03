// ============================================
// Seven Sports Calendar - Script Principal
// ============================================

/**
 * Array de partidos con información completa
 * Estructura: { tournament, home, homeLogo, away, awayLogo, stadium, stadiumEmoji, date, time }
 * homeLogo y awayLogo: URLs de imágenes de equipos
 * stadiumEmoji: emoji del estadio
 */
const matches = [
    {
        tournament: 'Liga MX - Apertura',
        home: 'América',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/8066_2023.png',
        away: 'Guadalajara',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/8048_2023.png',
        stadium: 'Estadio Azteca',
        stadiumEmoji: '🏟️',
        date: '2024-07-14',
        time: '19:00'
    },
    {
        tournament: 'Liga MX - Apertura',
        home: 'UNAM',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/8082_2023.png',
        away: 'Tigres',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/8071_2023.png',
        stadium: 'Estadio Olímpico',
        stadiumEmoji: '🏟️',
        date: '2024-07-15',
        time: '21:00'
    },
    {
        tournament: 'Liga MX - Apertura',
        home: 'Monterrey',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/8047_2023.png',
        away: 'Toluca',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/8069_2023.png',
        stadium: 'Estadio BBVA',
        stadiumEmoji: '🏟️',
        date: '2024-07-16',
        time: '19:30'
    },
    {
        tournament: 'UEFA Champions League',
        home: 'Real Madrid',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/418_2023.png',
        away: 'Manchester City',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/281_2023.png',
        stadium: 'Santiago Bernabéu',
        stadiumEmoji: '🏟️',
        date: '2024-07-20',
        time: '20:00'
    },
    {
        tournament: 'UEFA Champions League',
        home: 'Bayern Munich',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/27_2023.png',
        away: 'PSG',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/89_2023.png',
        stadium: 'Allianz Arena',
        stadiumEmoji: '🏟️',
        date: '2024-07-21',
        time: '20:30'
    },
    {
        tournament: 'Liga MX - Apertura',
        home: 'Santos',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/8077_2023.png',
        away: 'Pumas',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/8081_2023.png',
        stadium: 'Estadio Corona',
        stadiumEmoji: '🏟️',
        date: '2024-07-22',
        time: '20:00'
    },
    {
        tournament: 'Copa Libertadores',
        home: 'Flamengo',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/4340_2023.png',
        away: 'Boca Juniors',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/4332_2023.png',
        stadium: 'Maracanã',
        stadiumEmoji: '🏟️',
        date: '2024-07-25',
        time: '21:30'
    },
    {
        tournament: 'Copa Libertadores',
        home: 'River Plate',
        homeLogo: 'https://www.worldfootball.net/photo/team_img/4354_2023.png',
        away: 'São Paulo',
        awayLogo: 'https://www.worldfootball.net/photo/team_img/4369_2023.png',
        stadium: 'Monumental',
        stadiumEmoji: '🏟️',
        date: '2024-07-26',
        time: '21:00'
    }
];

/**
 * Función para renderizar los partidos en el DOM
 * Recorre el array de partidos y crea elementos HTML para cada uno
 * Incluye logos de equipos (imágenes) y emoji del stadio
 */
function renderMatches() {
    const matchesList = document.getElementById('matches');
    
    // Limpiar la lista antes de agregar elementos
    matchesList.innerHTML = '';
    
    // Iterar sobre cada partido y crear su elemento HTML
    matches.forEach((match, index) => {
        const li = document.createElement('li');
        li.className = 'match-item';
        li.setAttribute('data-match-id', index);
        
        // Construir el contenido HTML del partido con logos e imágenes
        li.innerHTML = `
            <span class="match-tournament">${match.tournament}</span>
            
            <div class="match-container">
                <!-- Equipo local -->
                <div class="team-section home-team">
                    <img src="${match.homeLogo}" alt="${match.home}" class="team-logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%231e90ff%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2750%27 font-size=%2740%27 fill=%27white%27 text-anchor=%27middle%27 dy=%27.3em%27%3E?%3C/text%3E%3C/svg%3E'">
                    <div class="team-info">
                        <span class="team-name">${match.home}</span>
                    </div>
                </div>
                
                <!-- Separador VS -->
                <div class="vs-section">
                    <span class="vs-text">VS</span>
                </div>
                
                <!-- Equipo visitante -->
                <div class="team-section away-team">
                    <div class="team-info">
                        <span class="team-name">${match.away}</span>
                    </div>
                    <img src="${match.awayLogo}" alt="${match.away}" class="team-logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%271e90ff%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2750%27 font-size=%2740%27 fill=%27white%27 text-anchor=%27middle%27 dy=%27.3em%27%3E?%3C/text%3E%3C/svg%3E'">
                </div>
            </div>
            
            <!-- Información de fecha y estadio -->
            <div class="match-details">
                <div class="stadium-info">
                    <span class="stadium-emoji">${match.stadiumEmoji}</span>
                    <span class="stadium-name">${match.stadium}</span>
                </div>
                
                <div class="match-date-time">
                    <span class="match-date">${formatDate(match.date)}</span>
                    <span class="match-time">${match.time}</span>
                </div>
            </div>
        `;
        
        // Agregar el elemento a la lista
        matchesList.appendChild(li);
    });
    
    console.log(`✅ Se cargaron ${matches.length} partidos exitosamente`);
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
    icsContent += 'X-WR-CALNAME:Seven Sports Calendar\n';
    
    // Agregar cada partido como un evento
    matches.forEach((match, index) => {
        const eventDate = match.date.replace(/-/g, '');
        const eventTime = match.time.replace(/:/g, '');
        
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `DTSTART:${eventDate}T${eventTime}00Z\n`;
        icsContent += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `UID:match-${index}-${Date.now()}@sevensportscalendar.com\n`;
        icsContent += `SUMMARY:${match.tournament} - ${match.home} vs ${match.away}\n`;
        icsContent += `DESCRIPTION:${match.home} vs ${match.away}\\nEstadio: ${match.stadium}\\nTorneo: ${match.tournament}\n`;
        icsContent += `LOCATION:${match.stadium}\n`;
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
    
    console.log('✅ Archivo .ics descargado exitosamente');
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
    
    console.log('🏆 Seven Sports Calendar cargado correctamente');
});
