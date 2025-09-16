import { NextRequest, NextResponse } from 'next/server'

function generateIcsContent(title: string, description: string, location: string, startDate: Date, endDate: Date, geoCoordinates: string): string {
  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  // Escape special characters in ICS format
  const escapeIcsString = (str: string) => {
    return str.replace(/\\/g, '\\\\')
              .replace(/;/g, '\\;')
              .replace(/,/g, '\\,')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
  }
  
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ines & Haris Wedding//Wedding Ceremony//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-ceremony-wedding@inesharis.se`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeIcsString(title)}`,
    `DESCRIPTION:${escapeIcsString(description)}`,
    `LOCATION:${escapeIcsString(location)}`,
    ...(geoCoordinates ? [`GEO:${geoCoordinates}`] : []),
    ...(geoCoordinates ? [`X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-TITLE=${escapeIcsString(location)}:geo:${geoCoordinates}`] : []),
    'ORGANIZER;CN=Ines & Haris:mailto:noreply@inesharis.se',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcsString(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  return ics
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('lang') || 'sv'
  
  // Ceremony event details
  const ceremonyTitle = language === 'sv' ? 'Ines & Haris - Vigsel' : 'Ines & Haris - Vjenčanje'
  const ceremonyDescription = language === 'sv' 
    ? 'Välkommen till Ines & Haris vigsel!\n\nPlats: Vijecnica, Sarajevo\nAdress: Obala Kulina bana bb, 71000 Sarajevo, Bosnien\n\nVi ser fram emot att dela detta ögonblick med dig! 💕'
    : 'Dobrodošli na Ines & Haris vjenčanje!\n\nMjesto: Vijecnica, Sarajevo\nAdresa: Obala Kulina bana bb, 71000 Sarajevo, Bosna i Hercegovina\n\nRadujemo se da podijelimo ovaj trenutak s vama! 💕'
  const ceremonyLocation = 'Vijecnica, Obala Kulina bana bb, 71000 Sarajevo, Bosnia and Herzegovina'
  const ceremonyStart = new Date('2026-07-25T14:00:00+02:00')
  const ceremonyEnd = new Date('2026-07-25T15:00:00+02:00')
  const ceremonyGeo = '43.8591;18.4339'
  
  const icsContent = generateIcsContent(
    ceremonyTitle,
    ceremonyDescription,
    ceremonyLocation,
    ceremonyStart,
    ceremonyEnd,
    ceremonyGeo
  )
  
  const filename = language === 'sv' ? 'Ines-Haris-Vigsel.ics' : 'Ines-Haris-Vjencanje.ics'
  
  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600'
    }
  })
}