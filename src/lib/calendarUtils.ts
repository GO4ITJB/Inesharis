import { Language } from './translations'

export interface CalendarEvent {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  address: string
  geoCoordinates?: string
}

export function generateCalendarEvents(language: Language, attendingCeremony: boolean, attendingReception: boolean): CalendarEvent[] {
  const events: CalendarEvent[] = []

  // Ceremony event
  if (attendingCeremony) {
    const ceremonyEvent: CalendarEvent = {
      title: language === 'sv' ? 'Ines & Haris - Vigsel' : 'Ines & Haris - Vjenčanje',
      description: language === 'sv' 
        ? 'Välkommen till Ines & Haris vigsel! Vi ser fram emot att dela detta ögonblick med dig! 💕'
        : 'Dobrodošli na Ines & Haris vjenčanje! Radujemo se da podijelimo ovaj trenutak s vama! 💕',
      location: 'Vijecnica, Obala Kulina bana bb, 71000 Sarajevo, Bosnia and Herzegovina',
      startDate: new Date('2026-07-25T14:00:00+02:00'),
      endDate: new Date('2026-07-25T15:00:00+02:00'),
      address: 'Obala Kulina bana bb, 71000 Sarajevo, Bosnia and Herzegovina',
      geoCoordinates: '43.8591,18.4339'
    }
    events.push(ceremonyEvent)
  }

  // Reception event
  if (attendingReception) {
    const receptionEvent: CalendarEvent = {
      title: language === 'sv' ? 'Ines & Haris - Mottagning' : 'Ines & Haris - Svadba',
      description: language === 'sv' 
        ? 'Välkommen till Ines & Haris mottagning! Vi ser fram emot att fira med dig! 💕'
        : 'Dobrodošli na Ines & Haris svadbu! Radujemo se proslavi s vama! 💕',
      location: 'Butmirska cesta 18, 71210 Ilidža, Bosnia and Herzegovina',
      startDate: new Date('2026-07-25T18:00:00+02:00'),
      endDate: new Date('2026-07-26T02:00:00+02:00'),
      address: 'Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosnia and Herzegovina',
      geoCoordinates: '43.8267,18.3135'
    }
    events.push(receptionEvent)
  }

  return events
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDate(event.startDate)}/${formatDate(event.endDate)}`,
    details: event.description,
    location: event.location,
    ctz: 'Europe/Sarajevo'
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function generateOutlookUrl(event: CalendarEvent): string {
  const formatDate = (date: Date) => date.toISOString()
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: formatDate(event.startDate),
    enddt: formatDate(event.endDate),
    body: event.description,
    location: event.location
  })

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function generateIcsContent(event: CalendarEvent): string {
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
  'PRODID:-//Ines & Haris Wedding//Wedding Event//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  `UID:${Date.now()}-${event.title.replace(/\s/g, '')}-wedding@inesharis.se`,
  `DTSTAMP:${formatDate(new Date())}`,
  `DTSTART:${formatDate(event.startDate)}`,
  `DTEND:${formatDate(event.endDate)}`,
  `SUMMARY:${escapeIcsString(event.title)}`,
  `DESCRIPTION:${escapeIcsString(event.description)}`,
  `LOCATION:${escapeIcsString(event.location)}`,
  ...(event.geoCoordinates ? [`GEO:${event.geoCoordinates}`] : []),
  ...(event.geoCoordinates ? [`X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-TITLE=${escapeIcsString(event.location)}:geo:${event.geoCoordinates}`] : []),
  'ORGANIZER;CN=Ines & Haris:mailto:noreply@inesharis.se',
  'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcsString(event.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  return ics
}

export function downloadIcsFile(event: CalendarEvent, filename: string) {
  const icsContent = generateIcsContent(event)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}