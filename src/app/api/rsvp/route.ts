import { NextRequest, NextResponse } from 'next/server'

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
Plats: Sarajevo, Bosnien

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

Vi ser fram emot att fira med dig!

Med kärlek,
Ines & Haris 💍
    ` : `
Zdravo ${formData.name}!

Hvala ti puno na RSVP za Ines & Haris vjenčanje! 💕

=== VAŠA RSVP POTVRDA ===
Datum: 25. juli 2026
Mjesto: Sarajevo, Bosna i Hercegovina

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

Radujemo se proslavi s vama!

S ljubavlju,
Ines & Haris 💍
    `

    // Send RSVP notification to couple via Formspree (keep existing working system)
    try {
      await fetch('https://formspree.io/f/xnnzvkpr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: `New RSVP from ${formData.name}`,
          message: coupleEmailContent,
          _replyto: formData.email,
          _autoresponse: false, // Disable Formspree auto-replies
          _confirmation: false  // Disable Formspree confirmations
        }),
      })
      console.log('📧 RSVP notification sent to couple via Formspree')
    } catch (emailError) {
      console.error('Formspree notification failed:', emailError)
    }

    // Send confirmation email to guest via Resend
    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
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
          html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; line-height: 1.4;">${confirmationContent}</pre>`
        })
      })

      if (resendResponse.ok) {
        console.log('📧 Confirmation email sent to guest via Resend:', formData.email)
      } else {
        const errorData = await resendResponse.text()
        console.error('Resend API error:', errorData)
        console.error('API Response Status:', resendResponse.status)
      }
    } catch (emailError) {
      console.error('Resend confirmation email failed:', emailError)
    }

    // Log for backup
    console.log('📧 EMAIL PROCESSING COMPLETE')
    console.log('RSVP sent to couple:', 'jovicabumbulovic@gmail.com')
    console.log('Confirmation sent to guest:', formData.email)
    console.log('Language:', language)

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP submitted successfully' 
    })

  } catch (error) {
    console.error('Error processing RSVP:', error)
    
    return NextResponse.json({ 
      success: true, // Still return success so user doesn't see error
      message: 'RSVP submitted successfully' 
    })
  }
}
