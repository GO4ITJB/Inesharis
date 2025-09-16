import { NextRequest, NextResponse } from 'next/server'

// Helper functions for generating calendar URLs
function generateGoogleCalendarUrl(title: string, description: string, location: string, startDate: Date, endDate: Date): string {
  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: description,
    location: location,
    ctz: 'Europe/Sarajevo'
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function generateOutlookUrl(title: string, description: string, location: string, startDate: Date, endDate: Date): string {
  const formatDate = (date: Date) => date.toISOString()
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    startdt: formatDate(startDate),
    enddt: formatDate(endDate),
    body: description,
    location: location
  })

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

function generateIcsContent(title: string, description: string, location: string, startDate: Date, endDate: Date): string {
  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ines & Haris Wedding//Wedding Event//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${title.replace(/\s/g, '')}-wedding@inesharis.se`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'ORGANIZER;CN=Ines & Haris:mailto:noreply@inesharis.se',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  return ics
}

function generateCalendarButtonsHTML(language: 'sv' | 'ba', attendingCeremony: boolean, attendingReception: boolean): string {
  const events = []
  
  // Ceremony event
  if (attendingCeremony) {
    const ceremonyTitle = language === 'sv' ? 'Ines & Haris - Vigsel' : 'Ines & Haris - Vjenčanje'
    const ceremonyDescription = language === 'sv' 
      ? 'Välkommen till Ines & Haris vigsel! Vi ser fram emot att dela detta ögonblick med dig! 💕'
      : 'Dobrodošli na Ines & Haris vjenčanje! Radujemo se da podijelimo ovaj trenutak s vama! 💕'
    const ceremonyLocation = 'Vijecnica, Obala Kulina bana bb, 71000 Sarajevo, Bosnia and Herzegovina'
    const ceremonyStart = new Date('2026-07-25T14:00:00+02:00')
    const ceremonyEnd = new Date('2026-07-25T15:00:00+02:00')
    
    events.push({
      title: ceremonyTitle,
      description: ceremonyDescription,
      location: ceremonyLocation,
      startDate: ceremonyStart,
      endDate: ceremonyEnd,
      googleUrl: generateGoogleCalendarUrl(ceremonyTitle, ceremonyDescription, ceremonyLocation, ceremonyStart, ceremonyEnd),
      outlookUrl: generateOutlookUrl(ceremonyTitle, ceremonyDescription, ceremonyLocation, ceremonyStart, ceremonyEnd)
    })
  }
  
  // Reception event
  if (attendingReception) {
    const receptionTitle = language === 'sv' ? 'Ines & Haris - Mottagning' : 'Ines & Haris - Svadba'
    const receptionDescription = language === 'sv' 
      ? 'Välkommen till Ines & Haris mottagning! Vi ser fram emot att fira med dig! 💕'
      : 'Dobrodošli na Ines & Haris svadbu! Radujemo se proslavi s vama! 💕'
    const receptionLocation = 'Hotel Hills Sarajevo, Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosnia and Herzegovina'
    const receptionStart = new Date('2026-07-25T18:00:00+02:00')
    const receptionEnd = new Date('2026-07-26T02:00:00+02:00')
    
    events.push({
      title: receptionTitle,
      description: receptionDescription,
      location: receptionLocation,
      startDate: receptionStart,
      endDate: receptionEnd,
      googleUrl: generateGoogleCalendarUrl(receptionTitle, receptionDescription, receptionLocation, receptionStart, receptionEnd),
      outlookUrl: generateOutlookUrl(receptionTitle, receptionDescription, receptionLocation, receptionStart, receptionEnd)
    })
  }
  
  if (events.length === 0) return ''
  
  const labels = language === 'sv' 
    ? { title: 'Lägg till i kalender', google: 'Google Kalender', outlook: 'Outlook', apple: 'Apple Kalender' }
    : { title: 'Dodaj u kalendar', google: 'Google Kalendar', outlook: 'Outlook', apple: 'Apple Kalendar' }
  
  const buttonsHTML = events.map(event => `
    <div style="margin: 20px 0; padding: 15px; border: 1px solid #e5e5e5; border-radius: 8px; background-color: #f9f9f9;">
      <h4 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">${event.title}</h4>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${event.googleUrl}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #4285f4; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; margin-bottom: 8px;">${labels.google}</a>
        <a href="${event.outlookUrl}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; margin-bottom: 8px;">${labels.outlook}</a>
        <a href="data:text/calendar;charset=utf8,${encodeURIComponent(generateIcsContent(event.title, event.description, event.location, event.startDate, event.endDate))}" download="wedding-${event.title.toLowerCase().replace(/\s/g, '-')}.ics" style="display: inline-block; padding: 8px 16px; background-color: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; margin-bottom: 8px;">${labels.apple}</a>
      </div>
    </div>
  `).join('')
  
  return `
    <div style="margin: 30px 0;">
      <h3 style="color: #333; margin-bottom: 15px;">${labels.title}</h3>
      ${buttonsHTML}
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Detect language from form data or default to Swedish
    const language = formData.language || 'sv'

    // Prepare guest list string
    const guestList = formData.numberOfGuests > 0 
      ? formData.guestNames.filter((name: string) => name.trim()).join(', ')
      : (language === 'sv' ? 'Inga gäster' : 'Nema gostiju')

    // Email content for the couple (always in English)
    const coupleEmailContent = `
New RSVP Submission for Ines & Haris Wedding

Timestamp: ${new Date().toLocaleString()}
Language: ${language === 'sv' ? 'Swedish' : 'Bosnian'}

=== GUEST INFORMATION ===
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

=== ATTENDANCE ===
Number of Guests: ${formData.numberOfGuests} additional guest${formData.numberOfGuests !== 1 ? 's' : ''}
Guest Names: ${guestList}
Attending Ceremony: ${formData.attendingCeremony ? 'Yes' : 'No'}
Attending Reception: ${formData.attendingReception ? 'Yes' : 'No'}
Hotel Room Booking: ${formData.wantsHotelRoom === true ? 'Yes - wants booking' : formData.wantsHotelRoom === false ? 'No - will arrange themselves' : 'Not specified'}

=== ADDITIONAL DETAILS ===
${formData.songRequests?.filter(Boolean).length > 0 
  ? `Song Requests: ${formData.songRequests.filter(Boolean).join(', ')}` 
  : 'No song requests'}

${formData.dietaryRequirements ? `Dietary Requirements: ${formData.dietaryRequirements}` : 'No dietary requirements'}

${formData.messageToCouple ? `Message to Couple: ${formData.messageToCouple}` : 'No message'}

=== END RSVP ===
    `

    // Confirmation email content for the guest (in their language) with calendar buttons
    const calendarButtonsHTML = generateCalendarButtonsHTML(language, formData.attendingCeremony, formData.attendingReception)
    
    const confirmationContent = language === 'sv' ? `
Hej ${formData.name}!

Tack så mycket för din RSVP till Ines & Haris bröllop! 💕

=== DIN RSVP BEKRÄFTELSE ===
Datum: 25 Juli 2026

Din information:
• Namn: ${formData.name}
• E-post: ${formData.email}
${formData.phone ? `• Telefon: ${formData.phone}` : ''}

Antal gäster: ${formData.numberOfGuests + 1} person${formData.numberOfGuests === 0 ? '' : 'er'} totalt
${formData.numberOfGuests > 0 ? `Gäster: ${guestList}` : ''}

Närvaro:
• Vigsel: ${formData.attendingCeremony ? 'Ja' : 'Nej'}
• Mottagning: ${formData.attendingReception ? 'Ja' : 'Nej'}
• Hotellrum på Hills: ${formData.wantsHotelRoom === true ? 'Ja - vill att vi bokar' : formData.wantsHotelRoom === false ? 'Nej - ordnar själva' : 'Ej specificerat'}

${formData.songRequests?.filter(Boolean).length > 0 
  ? `Musikönskemål: ${formData.songRequests.filter(Boolean).join(', ')}` 
  : ''}
${formData.dietaryRequirements ? `Kostpreferenser: ${formData.dietaryRequirements}` : ''}
${formData.messageToCouple ? `Ditt meddelande: ${formData.messageToCouple}` : ''}

Vi ser fram emot att fira med dig!

Med kärlek,
Ines & Haris 💍
    ` : `
Zdravo ${formData.name}!

Hvala ti puno na RSVP za Ines & Haris vjenčanje! 💕

=== VAŠA RSVP POTVRDA ===
Datum: 25. juli 2026

Vaše informacije:
• Ime: ${formData.name}
• E-mail: ${formData.email}
${formData.phone ? `• Telefon: ${formData.phone}` : ''}

Broj gostiju: ${formData.numberOfGuests + 1} osob${formData.numberOfGuests === 0 ? 'a' : 'e'} ukupno
${formData.numberOfGuests > 0 ? `Gosti: ${guestList}` : ''}

Prisustvo:
• Vjenčanje: ${formData.attendingCeremony ? 'Da' : 'Ne'}
• Svadba: ${formData.attendingReception ? 'Da' : 'Ne'}
• Hotelska soba u Hills: ${formData.wantsHotelRoom === true ? 'Da - želimo da rezervišete' : formData.wantsHotelRoom === false ? 'Ne - riješavamo sami' : 'Nije specificirano'}

${formData.songRequests?.filter(Boolean).length > 0 
  ? `Muzičke želje: ${formData.songRequests.filter(Boolean).join(', ')}` 
  : ''}
${formData.dietaryRequirements ? `Dijetetske potrebe: ${formData.dietaryRequirements}` : ''}
${formData.messageToCouple ? `Vaša poruka: ${formData.messageToCouple}` : ''}

Radujemo se proslavi s vama!

S ljubavlju,
Ines & Haris 💍
    `

    const confirmationHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8b7355; margin-bottom: 10px;">Ines & Haris</h1>
          <p style="font-size: 18px; color: #d4a574;">${language === 'sv' ? 'Bröllop 25 Juli 2026' : 'Vjenčanje 25. juli 2026'}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <pre style="white-space: pre-wrap; line-height: 1.6; margin: 0; font-family: Arial, sans-serif;">${confirmationContent}</pre>
        </div>
        
        ${calendarButtonsHTML}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <p style="color: #666; font-size: 14px;">
            ${language === 'sv' 
              ? 'Har du frågor? Kontakta oss på denna e-post.' 
              : 'Imate pitanja? Kontaktirajte nas na ovom e-mail-u.'}
          </p>
        </div>
      </div>
    `

    // Create calendar invitations based on attendance - removed as we're now using HTML buttons
    // const calendarEvents = createCalendarInvite(
    //   language, 
    //   formData.email, 
    //   formData.attendingCeremony, 
    //   formData.attendingReception
    // )

    // Send RSVP notification to couple via Resend
    try {
      const coupleResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ines & Haris <noreply@inesharis.se>',
          to: 'harismehmedagic@live.se', // Couple's email
          subject: `New RSVP from ${formData.name}`,
          text: coupleEmailContent,
          html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; line-height: 1.4;">${coupleEmailContent}</pre>`
        })
      })

      if (!coupleResponse.ok) {
        // Silent fail for couple notification
      }
    } catch (emailError) {
      // Silent fail for couple notification
    }

    // Send confirmation email to guest via Resend (with calendar buttons)
    try {
      const guestResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ines & Haris <noreply@inesharis.se>',
          to: formData.email,
          subject: language === 'sv' 
            ? 'RSVP Bekräftelse - Ines & Haris Bröllop 💕' 
            : 'RSVP Potvrda - Ines & Haris Vjenčanje 💕',
          text: confirmationContent,
          html: confirmationHTML
        })
      })

      if (!guestResponse.ok) {
        // Silent fail for guest confirmation
      }
    } catch (emailError) {
      // Silent fail for guest confirmation
    }

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP submitted successfully' 
    })

  } catch (error) {
    return NextResponse.json({ 
      success: true, // Still return success so user doesn't see error
      message: 'RSVP submitted successfully' 
    })
  }
}
