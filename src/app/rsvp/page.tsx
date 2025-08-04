'use client'

import React, { useEffect } from 'react'
import RSVPForm from '@/components/RSVPForm'
import { saveLanguagePreference } from '@/lib/languageDetection'

export default function RSVPPage() {
  useEffect(() => {
    // Save Swedish as the user's language preference
    saveLanguagePreference('sv')
  }, [])

  return (
    <main>
      <RSVPForm language="sv" />
    </main>
  )
} 
