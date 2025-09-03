'use client'

import React, { useEffect } from 'react'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import AnimatedTravelSchedule from '@/components/OurStory'
import FAQ from '@/components/FAQ'
import VenueAccommodations from '@/components/VenueAccommodations'
import ThingsToDoSarajevo from '@/components/ThingsToDoSarajevo'
import Footer from '@/components/BackToTop'
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
        <AnimatedTravelSchedule />
        <FAQ />
        <VenueAccommodations />
        <ThingsToDoSarajevo />
      </main>
      <Footer />
    </>
  )
} 
