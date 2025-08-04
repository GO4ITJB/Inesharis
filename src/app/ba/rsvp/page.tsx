'use client'

import React, { useEffect } from 'react'
import RSVPForm from '@/components/RSVPForm'
import { saveLanguagePreference } from '@/lib/languageDetection'

export default function BosnianRSVPPage() {
  useEffect(() => {
    // Save Bosnian as the user's language preference
    saveLanguagePreference('ba')
  }, [])

  return (
    <main>
      <RSVPForm language="ba" />
    </main>
  )
} 
