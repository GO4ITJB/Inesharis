'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import LanguageSelector from './LanguageSelector'
import { translations, Language } from '@/lib/translations'

interface HeaderProps {
  language?: Language
}

export default function Header({ language = 'sv' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = translations[language]

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
    <>
      <header className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        isScrolled 
          ? 'bg-wedding-sand/95 backdrop-blur-sm shadow-lg' 
          : isMobileMenuOpen 
            ? 'bg-transparent backdrop-blur-3xl'
            : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6">
          <div className="flex justify-between items-center py-6 relative">
            {/* Logo/Site Title */}
            <Link href={language === 'ba' ? '/ba' : '/'} className={`text-3xl font-script text-shadow transition-colors duration-300 ${
              isScrolled ? 'text-wedding-brown' : 'text-white'
            }`}>
              Ines & Haris
            </Link>
            
            {/* Navigation Links - Desktop (Centered) */}
            <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <a href="#run-of-show" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
              }`}>
                {t.ourStory}
              </a>
              <a href="#faq" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
              }`}>
                {t.questionsAnswers}
              </a>
              <a href="#venue-accommodations" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
              }`}>
                {t.venueAccommodation}
              </a>
              <a href="#things-to-do" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
              }`}>
                {t.thingsToDoSarajevo}
              </a>
              <Link href={language === 'ba' ? '/ba/rsvp' : '/rsvp'} className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
              }`}>
                {t.rsvp}
              </Link>
            </div>

            {/* Right side: Language Selector + Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* Mobile menu button */}
              <button 
                className={`block md:hidden p-2 transition-colors duration-300 relative z-30 ${
                  isScrolled ? 'text-wedding-brown' : 'text-white'
                }`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
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
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Outside of header to avoid backdrop-blur conflicts */}
      {isMobileMenuOpen && (
        <div className={`md:hidden fixed top-[88px] left-0 right-0 z-10 ${
          isScrolled 
            ? 'bg-wedding-sand/90 backdrop-blur-3xl shadow-lg border-b border-wedding-pink/20' 
            : 'backdrop-blur-3xl'
        }`}>
          <div className="px-6 py-4 space-y-4">
            <a href="#run-of-show" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
            }`} onClick={toggleMobileMenu}>
              {t.ourStory}
            </a>
            <a href="#faq" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
            }`} onClick={toggleMobileMenu}>
              {t.questionsAnswers}
            </a>
            <a href="#venue-accommodations" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
            }`} onClick={toggleMobileMenu}>
              {t.venueAccommodation}
            </a>
            <a href="#things-to-do" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
            }`} onClick={toggleMobileMenu}>
              {t.thingsToDoSarajevo}
            </a>
            <Link href={language === 'ba' ? '/ba/rsvp' : '/rsvp'} className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-brown hover:text-wedding-pink' : 'text-white'
            }`} onClick={toggleMobileMenu}>
              {t.rsvp}
            </Link>
          </div>
        </div>
      )}
    </>
  )
} 
