'use client'

import React from 'react'
import Link from 'next/link'
import CountdownTimer from './CountdownTimer'

export default function Hero() {
  const weddingDate = new Date('2026-07-25T18:00:00')

  return (
    <section 
      className="fixed top-0 left-0 h-screen w-full z-[1] flex items-center justify-center text-white text-center"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Desktop Video */}
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block absolute w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        >
          <source src="/sarajevo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mobile YouTube Video */}
        <div className="md:hidden absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/jEcnNoHbnMQ?autoplay=1&mute=1&loop=1&playlist=jEcnNoHbnMQ&start=3&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            title="Wedding Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute w-full h-full object-cover"
            style={{ 
              pointerEvents: 'none',
              width: '100vw',
              height: '100vh',
              transform: 'scale(1.3)',
              transformOrigin: 'center center',
              objectFit: 'cover'
            }}
          ></iframe>
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Save Our Date */}
        <div className="mb-8">
          <p className="text-sm tracking-widest uppercase mb-4 font-light text-shadow">
            Spara Datumet
          </p>
        </div>

        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-script mb-6 text-shadow-lg">
            Vi Ska
          </h1>
          <h1 className="text-6xl md:text-8xl font-script text-shadow-lg">
            Gifta Oss!
          </h1>
        </div>

        {/* Wedding Date */}
        <div className="mb-12">
          <p className="text-lg tracking-wider uppercase font-light text-shadow">
            Lördag, 21 Augusti 2026
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/rsvp" className="wedding-button-primary">
            OSA NU
            <span className="ml-2 text-xs">→</span>
          </Link>
          <button className="wedding-button-secondary">
            BOKA HOTELL
            <span className="ml-2 text-xs">→</span>
          </button>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CountdownTimer targetDate={weddingDate} />
      </div>
    </section>
  )
}
