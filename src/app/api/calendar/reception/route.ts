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
    'PRODID:-//Ines & Haris Wedding//Wedding Reception//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-reception-wedding@inesharis.se`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeIcsString(title)}`,
    `DESCRIPTION:${escapeIcsString(description)}`,
    `LOCATION:${escapeIcsString(location)}`,
    `GEO:${geoCoordinates}`,
    `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-APPLE-MAPKIT-HANDLE=${Buffer.from(JSON.stringify({
      "name": "Hotel Hills Sarajevo",
      "address": "Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosnia and Herzegovina",
      "latitude": 43.8267,
      "longitude": 18.3135
    })).toString('base64')}:geo:${geoCoordinates}`,
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
  
  // Reception event details
  const receptionTitle = language === 'sv' ? 'Ines & Haris - Mottagning' : 'Ines & Haris - Svadba'
  const receptionDescription = language === 'sv' 
    ? 'Välkommen till Ines & Haris mottagning!\n\nPlats: Hotel Hills Sarajevo\nAdress: Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosnien\n\nVi ser fram emot att fira med dig! 💕'
    : 'Dobrodošli na Ines & Haris svadbu!\n\nMjesto: Hotel Hills Sarajevo\nAdresa: Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosna i Hercegovina\n\nRadujemo se proslavi s vama! 💕'
  const receptionLocation = 'Hotel Hills Sarajevo, Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosnia and Herzegovina'
  const receptionStart = new Date('2026-07-25T18:00:00+02:00')
  const receptionEnd = new Date('2026-07-26T02:00:00+02:00')
  const receptionGeo = '43.8267;18.3135'
  
  const icsContent = generateIcsContent(
    receptionTitle,
    receptionDescription,
    receptionLocation,
    receptionStart,
    receptionEnd,
    receptionGeo
  )
  
  const filename = language === 'sv' ? 'Ines-Haris-Mottagning.ics' : 'Ines-Haris-Svadba.ics'
  
  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600'
    }
  })
}