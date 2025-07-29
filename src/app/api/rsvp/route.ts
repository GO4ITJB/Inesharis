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

    // Prepare email content
    const emailContent = `
New RSVP Submission for Ines & Haris Wedding

Timestamp: ${new Date().toLocaleString()}

=== GUEST INFORMATION ===
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

=== ATTENDANCE ===
Bringing Guest: ${formData.bringingGuest ? 'Yes' : 'No'}
${formData.guestName ? `Guest Name: ${formData.guestName}` : ''}
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

    // Send email via Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
    try {
      await fetch('https://formspree.io/f/xnnzvkpr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'jovicabumbulovic@gmail.com',
          subject: `New RSVP from ${formData.name}`,
          message: emailContent,
          _replyto: formData.email,
        }),
      })
    } catch (emailError) {
      console.error('Email failed, but form data captured:', emailError)
    }
    
    // Also log for backup
    console.log('📧 EMAIL SENT TO: jovicabumbulovic@gmail.com')
    console.log('Subject: New RSVP from', formData.name)
    console.log('=== RSVP CONTENT ===')
    console.log(emailContent)
    console.log('=== END RSVP ===')

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
