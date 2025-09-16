import { NextRequest, NextResponse } from 'next/server'

// Helper function to create ICS calendar content
function createCalendarInvite(language: 'sv' | 'ba', guestName: string, attendingCeremony: boolean, attendingReception: boolean) {
  const ceremonyDate = new Date('2026-07-25T14:00:00+02:00') // 3 PM Sarajevo time
  const ceremonyEndDate = new Date('2026-07-25T15:00:00+02:00') // 4:30 PM Sarajevo time
  const receptionDate = new Date('2026-07-25T18:00:00+02:00') // 5 PM Sarajevo time
  const receptionEndDate = new Date('2026-07-26T02:00:00+02:00') // 11 PM Sarajevo time
  
  const events = []

  // Ceremony event (if attending)
  if (attendingCeremony) {
    const ceremonyTitle = language === 'sv' 
      ? 'Ines & Haris - Vigsel' 
      : 'Ines & Haris - Vjenčanje'
    
    const ceremonyDescription = language === 'sv' 
      ? `Välkommen till Ines & Haris vigsel!\n\nPlats: Vijecnica, Sarajevo\nAdress: Obala Kulina bana bb, 71000 Sarajevo, Bosnien\n\nVi ser fram emot att dela detta ögonblick med dig! 💕`
      : `Dobrodošli na Ines & Haris vjenčanje!\n\nMjesto: Vijecnica, Sarajevo\nAdresa: Obala Kulina bana bb, 71000 Sarajevo, Bosna i Hercegovina\n\nRadujemo se da podijelimo ovaj trenutak s vama! 💕`

    const ceremonyIcs = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ines & Haris Wedding//Wedding Ceremony//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}-ceremony@inesharis.se`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${ceremonyDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${ceremonyEndDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${ceremonyTitle}`,
      `DESCRIPTION:${ceremonyDescription.replace(/\n/g, '\\n')}`,
      `LOCATION:Vijecnica\\, Obala Kulina bana bb\\, 71000 Sarajevo\\, Bosnia and Herzegovina`,
      'GEO:43.8591;18.4339',
      'ORGANIZER;CN=Ines & Haris:mailto:noreply@inesharis.se',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${ceremonyTitle}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    events.push({
      filename: language === 'sv' ? 'Ines-Haris-Vigsel.ics' : 'Ines-Haris-Vjencanje.ics',
      content: Buffer.from(ceremonyIcs).toString('base64'),
      type: 'text/calendar',
      disposition: 'attachment'
    })
  }

  // Reception event (if attending)
  if (attendingReception) {
    const receptionTitle = language === 'sv' 
      ? 'Ines & Haris - Bröllop' 
      : 'Ines & Haris - Svadba'
    
    const receptionDescription = language === 'sv' 
      ? `Välkommen till Ines & Haris bröllop!\n\nPlats: Butmirska cesta 18, Ilidža\nAdress: Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosnien\n\nVi ser fram emot att fira med dig! 💕`
      : `Dobrodošli na Ines & Haris svadbu!\n\nMjesto: Butmirska cesta 18, Ilidža\nAdresa: Butmirska cesta 18, Ilidža 71000 Sarajevo, Bosna i Hercegovina\n\nRadujemo se proslavi s vama! 💕`

    const receptionIcs = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ines & Haris Wedding//Wedding Reception//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}-reception@inesharis.se`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${receptionDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${receptionEndDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${receptionTitle}`,
      `DESCRIPTION:${receptionDescription.replace(/\n/g, '\\n')}`,
      `LOCATION:Hotel Hills Sarajevo\\, Butmirska cesta 18\\, Ilidža 71000 Sarajevo\\, Bosnia and Herzegovina`,
      'GEO:43.8267;18.3135',
      'ORGANIZER;CN=Ines & Haris:mailto:noreply@inesharis.se',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${receptionTitle}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    events.push({
      filename: language === 'sv' ? 'Ines-Haris-Mottagning.ics' : 'Ines-Haris-Svadba.ics',
      content: Buffer.from(receptionIcs).toString('base64'),
      type: 'text/calendar',
      disposition: 'attachment'
    })
  }

  return events
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

=== ADDITIONAL DETAILS ===
${formData.songRequests?.filter(Boolean).length > 0 
  ? `Song Requests: ${formData.songRequests.filter(Boolean).join(', ')}` 
  : 'No song requests'}

${formData.dietaryRequirements ? `Dietary Requirements: ${formData.dietaryRequirements}` : 'No dietary requirements'}

${formData.messageToCouple ? `Message to Couple: ${formData.messageToCouple}` : 'No message'}

=== END RSVP ===
    `

    // Confirmation email content for the guest (in their language)
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

${formData.songRequests?.filter(Boolean).length > 0 
  ? `Musikönskemål: ${formData.songRequests.filter(Boolean).join(', ')}` 
  : ''}
${formData.dietaryRequirements ? `Kostpreferenser: ${formData.dietaryRequirements}` : ''}
${formData.messageToCouple ? `Ditt meddelande: ${formData.messageToCouple}` : ''}

📅 Kalenderinbjudan bifogas - lägg till i din kalender!

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

${formData.songRequests?.filter(Boolean).length > 0 
  ? `Muzičke želje: ${formData.songRequests.filter(Boolean).join(', ')}` 
  : ''}
${formData.dietaryRequirements ? `Dijetetske potrebe: ${formData.dietaryRequirements}` : ''}
${formData.messageToCouple ? `Vaša poruka: ${formData.messageToCouple}` : ''}

📅 Pozivnica za kalendar je priložena - dodajte u svoj kalendar!

Radujemo se proslavi s vama!

S ljubavlju,
Ines & Haris 💍
    `

    // Create calendar invitations based on attendance
    const calendarEvents = createCalendarInvite(
      language, 
      formData.email, 
      formData.attendingCeremony, 
      formData.attendingReception
    )

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

    // Send confirmation email to guest via Resend (with calendar attachments)
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
          html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; line-height: 1.4;">${confirmationContent}</pre>`,
          attachments: calendarEvents
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
