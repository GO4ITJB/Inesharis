'use client'

import React, { useEffect } from 'react'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import { saveLanguagePreference } from '@/lib/languageDetection'

export default function BosnianHome() {
  useEffect(() => {
    // Save Bosnian as the user's language preference
    saveLanguagePreference('ba')
  }, [])

  return (
    <>
      <Header language="ba" />
      <main>
        <Hero language="ba" />
        {/* Other components will be added with language support soon */}
      </main>
    </>
  )
} 
