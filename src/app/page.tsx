'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import OurStory from '@/components/OurStory'
import RunOfShow from '@/components/RunOfShow'
import VenueAccommodations from '@/components/VenueAccommodations'
import { detectBrowserLanguage, getLanguageFromPath, saveLanguagePreference } from '@/lib/languageDetection'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if we have a saved language preference first
    const savedLanguage = localStorage.getItem('preferred-language') as 'sv' | 'ba'
    
    if (savedLanguage) {
      // User has a saved preference, respect it
      if (savedLanguage === 'ba' && window.location.pathname === '/') {
        router.push('/ba')
      }
      return
    }

    // No saved preference, check browser language only on root path
    if (window.location.pathname === '/') {
      const detectedLanguage = detectBrowserLanguage()
      
      if (detectedLanguage === 'ba') {
        // Redirect to Bosnian version
        router.push('/ba')
        return
      }
      // If Swedish, stay on current page and save preference
      saveLanguagePreference('sv')
    }
  }, [router])

  return (
    <>
      <Header language="sv" />
      <main>
        <Hero language="sv" />
        {/* <OurStory language="sv" />
        <RunOfShow language="sv" />
        <VenueAccommodations language="sv" /> */}
      </main>
    </>
  )
} 
