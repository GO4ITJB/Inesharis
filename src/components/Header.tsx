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
    <header className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
      isScrolled 
        ? 'bg-warm-background/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center py-6 relative">
          {/* Logo/Site Title */}
          <Link href={language === 'ba' ? '/ba' : '/'} className={`text-3xl font-script text-shadow transition-colors duration-300 ${
            isScrolled ? 'text-wedding-dark' : 'text-white'
          }`}>
            Ines & Haris
          </Link>
          
          {/* Navigation Links - Desktop (Centered) */}
          <div className="menu-desktop menu-none hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#our-story" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              {t.ourStory}
            </a>
            <a href="#run-of-show" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              {t.programNav}
            </a>
            <a href="#venue-accommodations" className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              {t.venueAccommodation}
            </a>
            <Link href={language === 'ba' ? '/ba/qa' : '/qa'} className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
            }`}>
              {t.questionsAnswers}
            </Link>
            <Link href={language === 'ba' ? '/ba/rsvp' : '/rsvp'} className={`text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
              isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
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
              className={`menu-none md:hidden transition-colors duration-300 ${
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 ${
            isScrolled 
              ? 'bg-warm-background/95 backdrop-blur-sm shadow-lg' 
              : 'bg-black/80 backdrop-blur-sm'
          }`}>
            <div className="px-6 py-4 space-y-4">
              <a href="#our-story" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
              }`} onClick={toggleMobileMenu}>
                {t.ourStory}
              </a>
              <a href="#run-of-show" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
              }`} onClick={toggleMobileMenu}>
                {t.programNav}
              </a>
              <a href="#venue-accommodations" className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
              }`} onClick={toggleMobileMenu}>
                {t.venueAccommodation}
              </a>
              <Link href={language === 'ba' ? '/ba/qa' : '/qa'} className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
              }`} onClick={toggleMobileMenu}>
                {t.questionsAnswers}
              </Link>
              <Link href={language === 'ba' ? '/ba/rsvp' : '/rsvp'} className={`block text-sm tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-wedding-dark hover:text-wedding-pink' : 'text-white'
              }`} onClick={toggleMobileMenu}>
                {t.rsvp}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 
