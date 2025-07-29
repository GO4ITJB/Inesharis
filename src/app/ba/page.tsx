import React from 'react'
import Hero from '@/components/Hero'
import Header from '@/components/Header'

export default function BosnianHome() {
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
