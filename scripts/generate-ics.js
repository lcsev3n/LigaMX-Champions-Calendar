/**
 * Script para generar archivos .ics desde data/matches.json
 * Se ejecuta automáticamente vía GitHub Actions diariamente
 */

const fs = require('fs');
const path = require('path');

// Rutas
const matchesFile = path.join(__dirname, '../data/matches.json');
const calendarDir = path.join(__dirname, '../calendar');

// Asegurar que la carpeta calendar existe
if (!fs.existsSync(calendarDir)) {
    fs.mkdirSync(calendarDir, { recursive: true });
}

/**
 * Lee los datos de partidos desde el JSON
 */
function loadMatches() {
    try {
        const data = fs.readFileSync(matchesFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Error leyendo matches.json:', error.message);
        return [];
    }
}

/**
 * Genera contenido ICS para un array de partidos
 */
function generateIcsContent(matchesToInclude, calendarName = 'Seven Sports Calendar') {
    let icsContent = 'BEGIN:VCALENDAR\n';
    icsContent += 'VERSION:2.0\n';
    icsContent += `PRODID:-//Seven Sports Calendar//${calendarName}//EN\n`;
    icsContent += 'CALSCALE:GREGORIAN\n';
    icsContent += 'METHOD:PUBLISH\n';
    icsContent += `X-WR-CALNAME:${calendarName}\n`;
    icsContent += 'X-WR-TIMEZONE:America/Mexico_City\n';
    
    matchesToInclude.forEach((match, index) => {
        const eventDate = match.date.replace(/-/g, '');
        const eventTime = match.time.replace(/:/g, '');
        
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `DTSTART:${eventDate}T${eventTime}00\n`;
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
 * Guarda un archivo .ics
 */
function saveIcsFile(filename, content) {
    const filepath = path.join(calendarDir, filename);
    try {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ Archivo creado: ${filename} (${content.length} bytes)`);
    } catch (error) {
        console.error(`❌ Error guardando ${filename}:`, error.message);
    }
}

/**
 * Ejecuta el script principal
 */
function main() {
    console.log('🏆 Generando calendarios .ics...\n');
    
    const matches = loadMatches();
    
    if (matches.length === 0) {
        console.warn('⚠️ No se encontraron partidos en matches.json');
        return;
    }
    
    console.log(`📊 Se encontraron ${matches.length} partidos\n`);
    
    // Generar calendario combinado (todos los partidos)
    const allContent = generateIcsContent(matches, 'Seven Sports Calendar - Todos');
    saveIcsFile('combined.ics', allContent);
    
    // Agrupar partidos por liga
    const leagues = {};
    matches.forEach(match => {
        if (!leagues[match.tournament]) {
            leagues[match.tournament] = [];
        }
        leagues[match.tournament].push(match);
    });
    
    // Generar archivo .ics para cada liga
    Object.entries(leagues).forEach(([leagueName, leagueMatches]) => {
        const filename = leagueName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '') + '.ics';
        
        const content = generateIcsContent(leagueMatches, leagueName);
        saveIcsFile(filename, content);
    });
    
    console.log('\n✨ ¡Calendarios generados exitosamente!');
    console.log(`📁 Archivos guardados en: ${calendarDir}`);
}

// Ejecutar
main();
