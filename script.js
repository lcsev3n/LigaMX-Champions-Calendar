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
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Logo_América.svg/200px-Logo_América.svg.png',
        away: 'Guadalajara',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ChivasLogo.svg/200px-ChivasLogo.svg.png',
        stadium: 'Estadio Azteca',
        stadiumEmoji: '🏟️',
        date: '2024-07-14',
        time: '19:00'
    },
    {
        tournament: 'Liga MX - Apertura',
        home: 'UNAM',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Escudo_de_la_UNAM.svg/200px-Escudo_de_la_UNAM.svg.png',
        away: 'Tigres',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Tigres_UANL_Logo.svg/200px-Tigres_UANL_Logo.svg.png',
        stadium: 'Estadio Olímpico',
        stadiumEmoji: '🏟️',
        date: '2024-07-15',
        time: '21:00'
    },
    {
        tournament: 'Liga MX - Apertura',
        home: 'Monterrey',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/CF_Monterrey_Logo.svg/200px-CF_Monterrey_Logo.svg.png',
        away: 'Toluca',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Toluca_logo.svg/200px-Toluca_logo.svg.png',
        stadium: 'Estadio BBVA',
        stadiumEmoji: '🏟️',
        date: '2024-07-16',
        time: '19:30'
    },
    {
        tournament: 'UEFA Champions League',
        home: 'Real Madrid',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Real_Madrid_CF.svg/200px-Real_Madrid_CF.svg.png',
        away: 'Manchester City',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Manchester_City_FC_badge.svg/200px-Manchester_City_FC_badge.svg.png',
        stadium: 'Santiago Bernabéu',
        stadiumEmoji: '🏟️',
        date: '2024-07-20',
        time: '20:00'
    },
    {
        tournament: 'UEFA Champions League',
        home: 'Bayern Munich',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/FC_Bayern_Munich_logo_%282017%29.svg/200px-FC_Bayern_Munich_logo_%282017%29.svg.png',
        away: 'PSG',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Paris_Saint-Germain_F.C._%282013%29.svg/200px-Paris_Saint-Germain_F.C._%282013%29.svg.png',
        stadium: 'Allianz Arena',
        stadiumEmoji: '🏟️',
        date: '2024-07-21',
        time: '20:30'
    },
    {
        tournament: 'Liga MX - Apertura',
        home: 'Santos',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Santos_Laguna_Logo.svg/200px-Santos_Laguna_Logo.svg.png',
        away: 'Pumas',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Pumas_UNAM_Logo.svg/200px-Pumas_UNAM_Logo.svg.png',
        stadium: 'Estadio Corona',
        stadiumEmoji: '🏟️',
        date: '2024-07-22',
        time: '20:00'
    },
    {
        tournament: 'Copa Libertadores',
        home: 'Flamengo',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_logo_%282019%29.svg/200px-Flamengo_logo_%282019%29.svg.png',
        away: 'Boca Juniors',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Boca_Juniors_logo.svg/200px-Boca_Juniors_logo.svg.png',
        stadium: 'Maracanã',
        stadiumEmoji: '🏟️',
        date: '2024-07-25',
        time: '21:30'
    },
    {
        tournament: 'Copa Libertadores',
        home: 'River Plate',
        homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/River_Plate_logo.svg/200px-River_Plate_logo.svg.png',
        away: 'São Paulo',
        awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sao_Paulo_FC_logo.svg/200px-Sao_Paulo_FC_logo.svg.png',
        stadium: 'Monumental',
        stadiumEmoji: '🏟️',
        date: '2024-07-26',
        time: '21:00'
    }
];

// Mapa de ligas con sus emojis/imágenes
const leagueData = {
    'Liga MX - Apertura': { emoji: '🇲🇽', displayName: 'Liga MX' },
    'UEFA Champions League': { emoji: '🏆', displayName: 'UEFA Champions League' },
    'Copa Libertadores': { emoji: '🏆', displayName: 'Copa Libertadores' }
};

// Variables para almacenar las ligas seleccionadas
let selectedLeagues = new Set(['Liga MX - Apertura', 'UEFA Champions League', 'Copa Libertadores']);

/**
 * Función para renderizar los partidos en el DOM
 * Recorre el array de partidos y crea elementos HTML para cada uno
 * Incluye logos de equipos (imágenes) y emoji del estadio
 * Integra selección de liga en la tarjeta
 */
function renderMatches() {
    const matchesList = document.getElementById('matches');
    
    // Limpiar la lista antes de agregar elementos
    matchesList.innerHTML = '';
    
    // Filtrar partidos según las ligas seleccionadas
    const filteredMatches = matches.filter(match => selectedLeagues.has(match.tournament));
    
    if (filteredMatches.length === 0) {
        matchesList.innerHTML = '<li class="no-matches">No hay partidos para los filtros seleccionados</li>';
        return;
    }
    
    // Iterar sobre cada partido y crear su elemento HTML
    filteredMatches.forEach((match, index) => {
        const li = document.createElement('li');
        li.className = 'match-item';
        li.setAttribute('data-tournament', match.tournament);
        
        // Construir el contenido HTML del partido con logos e imágenes
        li.innerHTML = `
            <div class="match-header">
                <span class="match-tournament">${match.tournament}</span>
                <input type="checkbox" class="match-checkbox" data-league="${match.tournament}" checked>
            </div>
            
            <div class="match-container">
                <!-- Equipo local -->
                <div class="team-section home-team">
                    <img src="${match.homeLogo}" alt="${match.home}" class="team-logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%271e90ff%27 width=%27100%27 height=%27100%27/%3E%3Ctext x=%2750%27 y=%2750%27 font-size=%2740%27 fill=%27white%27 text-anchor=%27middle%27 dy=%27.3em%27%3E?%3C/text%3E%3C/svg%3E'">
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
    
    // Agregar event listeners a los checkboxes de los partidos
    const matchCheckboxes = document.querySelectorAll('.match-checkbox');
    matchCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateLeagueCheckboxes);
    });
    
    console.log(`✅ Se cargaron ${filteredMatches.length} partidos exitosamente`);
}

/**
 * Función para actualizar los checkboxes de la sección de filtros
 * basado en los checkboxes individuales de los partidos
 */
function updateLeagueCheckboxes() {
    const matchCheckboxes = document.querySelectorAll('.match-checkbox');
    const leagueCheckboxes = document.querySelectorAll('.league-checkbox');
    
    leagueCheckboxes.forEach(leagueCheckbox => {
        const league = leagueCheckbox.value;
        const matchesForLeague = document.querySelectorAll(`.match-checkbox[data-league="${league}"]`);
        const anyChecked = Array.from(matchesForLeague).some(cb => cb.checked);
        
        leagueCheckbox.checked = anyChecked;
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
 * Función para generar contenido ICS
 * Crea un archivo de calendario con los partidos especificados
 * 
 * @param {Array} matchesToInclude - Array de partidos a incluir
 * @returns {string} Contenido ICS formateado
 */
function generateIcsContent(matchesToInclude) {
    let icsContent = 'BEGIN:VCALENDAR\n';
    icsContent += 'VERSION:2.0\n';
    icsContent += 'PRODID:-//Seven Sports Calendar//EN\n';
    icsContent += 'CALSCALE:GREGORIAN\n';
    icsContent += 'METHOD:PUBLISH\n';
    icsContent += 'X-WR-CALNAME:Seven Sports Calendar\n';
    
    // Agregar cada partido como un evento
    matchesToInclude.forEach((match, index) => {
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
    
    return icsContent;
}

/**
 * Función para descargar un archivo .ics
 * 
 * @param {string} icsContent - Contenido del archivo ICS
 * @param {string} filename - Nombre del archivo a descargar
 */
function downloadIcsFile(icsContent, filename) {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`✅ Archivo ${filename} descargado exitosamente`);
}

/**
 * Función para mostrar modal de confirmación
 * 
 * @param {Array} selectedLeagueNames - Ligas seleccionadas
 * @param {Function} onConfirm - Callback cuando se confirma
 */
function showConfirmationModal(selectedLeagueNames, onConfirm) {
    // Si es solo una liga, descargar directamente
    if (selectedLeagueNames.length === 1) {
        onConfirm();
        return;
    }
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const leaguesContent = selectedLeagueNames.map(league => 
        `<div class="league-item">
            <span class="league-emoji">${leagueData[league].emoji}</span>
            <span class="league-name">${leagueData[league].displayName}</span>
        </div>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirmar Descarga</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
            </div>
            <div class="modal-body">
                <p>Vas a descargar calendarios de las siguientes ligas:</p>
                <div class="leagues-list">
                    ${leaguesContent}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary modal-cancel" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
                <button class="btn btn-primary modal-confirm">Descargar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Evento para confirmar
    modal.querySelector('.modal-confirm').addEventListener('click', () => {
        onConfirm();
        modal.remove();
    });
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
 * Función para descargar calendario de una liga específica
 * 
 * @param {string} league - Nombre de la liga
 */
function downloadLeagueCalendar(league) {
    const leagueMatches = matches.filter(match => match.tournament === league);
    
    if (leagueMatches.length === 0) {
        alert(`No hay partidos disponibles para ${league}`);
        return;
    }
    
    const icsContent = generateIcsContent(leagueMatches);
    const filename = `${league.replace(/\s+/g, '-').toLowerCase()}.ics`;
    downloadIcsFile(icsContent, filename);
}

/**
 * Función para descargar todos los calendarios seleccionados
 */
function downloadAllCalendars() {
    const selectedLeagueNames = Array.from(selectedLeagues);
    
    if (selectedLeagueNames.length === 0) {
        alert('Por favor selecciona al menos una liga');
        return;
    }
    
    // Mostrar modal de confirmación
    showConfirmationModal(selectedLeagueNames, () => {
        const icsContent = generateIcsContent(matches.filter(m => selectedLeagues.has(m.tournament)));
        downloadIcsFile(icsContent, 'seven-sports-calendar-all.ics');
    });
}

/**
 * Event Listeners
 * Se ejecutan cuando el documento ha cargado completamente
 */
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar partidos al cargar la página
    renderMatches();
    
    // ===== Manejo de filtros de ligas =====
    const leagueCheckboxes = document.querySelectorAll('.league-checkbox');
    leagueCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const league = e.target.value;
            
            if (e.target.checked) {
                selectedLeagues.add(league);
                // Marcar todos los checkboxes del partido de esta liga
                document.querySelectorAll(`.match-checkbox[data-league="${league}"]`).forEach(cb => {
                    cb.checked = true;
                });
            } else {
                selectedLeagues.delete(league);
                // Desmarcar todos los checkboxes del partido de esta liga
                document.querySelectorAll(`.match-checkbox[data-league="${league}"]`).forEach(cb => {
                    cb.checked = false;
                });
            }
            
            renderMatches();
            console.log('Ligas seleccionadas:', Array.from(selectedLeagues));
        });
    });
    
    // ===== Manejo de botones de descarga por liga =====
    const downloadLeagueButtons = document.querySelectorAll('.btn-download');
    downloadLeagueButtons.forEach(button => {
        button.addEventListener('click', () => {
            const league = button.getAttribute('data-league');
            downloadLeagueCalendar(league);
        });
    });
    
    // ===== Manejo del botón de descargar todos =====
    const downloadAllButton = document.querySelector('.btn-download-all');
    if (downloadAllButton) {
        downloadAllButton.addEventListener('click', downloadAllCalendars);
    }
    
    // ===== Manejo del botón de suscripción =====
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', handleSubscribe);
    }
    
    console.log('🏆 Seven Sports Calendar cargado correctamente');
});
