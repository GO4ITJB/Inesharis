import React from 'react'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import OurStory from '@/components/OurStory'
import RunOfShow from '@/components/RunOfShow'
import VenueAccommodations from '@/components/VenueAccommodations'

export default function Home() {
  return (
    <>
      <Header language="sv" />
      <main>
        <Hero language="sv" />
        {/* <OurStory />
        <RunOfShow />
        <VenueAccommodations /> */}
      </main>
    </>
  )
} 
