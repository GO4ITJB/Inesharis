'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const heroHeight = window.innerHeight * 0.8 // Show header after scrolling past 80% of viewport
      setIsScrolled(scrollTop > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
      isScrolled 
        ? 'bg-warm-background/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex justify-center items-center py-6 relative">
          {/* Logo/Site Title */}
          <Link href="/" className={`absolute left-0 text-3xl font-script text-shadow transition-colors duration-300 ${
            isScrolled ? 'text-wedding-dark' : 'text-white'
          }`}>
            Ines & Haris
          </Link>
          
          {/* Navigation Links - Desktop (Centered) */}
          <div className="hidden md:flex space-x-8">
            <a href="#our-story" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              Vår Historia
            </a>
            <a href="#run-of-show" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              Program
            </a>
            <a href="#venue-accommodations" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              Plats & Boende
            </a>
            <Link href="/qa" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              Frågor & Svar
            </Link>
            <Link href="/rsvp" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              OSA
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className={`md:hidden absolute right-0 transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark' : 'text-white'
            }`}
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-warm-background/95 backdrop-blur-sm rounded-lg mt-4 p-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              <a 
                href="#our-story" 
                className="text-wedding-dark text-sm tracking-[0.1em] uppercase font-light py-2 hover:text-wedding-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vår Historia
              </a>
              <a 
                href="#run-of-show" 
                className="text-wedding-dark text-sm tracking-[0.1em] uppercase font-light py-2 hover:text-wedding-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Program
              </a>
              <a 
                href="#venue-accommodations" 
                className="text-wedding-dark text-sm tracking-[0.1em] uppercase font-light py-2 hover:text-wedding-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Plats & Boende
              </a>
              <Link 
                href="/qa" 
                className="text-wedding-dark text-sm tracking-[0.1em] uppercase font-light py-2 hover:text-wedding-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Frågor & Svar
              </Link>
              <Link 
                href="/rsvp" 
                className="border border-wedding-pink text-wedding-pink px-4 py-3 text-sm tracking-[0.1em] uppercase font-light text-center mt-4 hover:bg-wedding-pink hover:text-white transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                OSA SENAST 1/8 →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 
