'use client'

import React from 'react'
import { translations, Language } from '@/lib/translations'

interface FooterProps {
  language?: Language
}

export default function Footer({ language = 'sv' }: FooterProps) {
  const t = translations[language]
  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative z-[5] py-12 bg-wedding-sand border-t border-wedding-pink/20 text-wedding-brown">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Wedding Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-script mb-3">
              Ines & Haris
            </h3>
            <p className="text-sm leading-relaxed opacity-70">
              {t.footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-3">
              {t.quickLinks}
            </h4>
            <div className="space-y-2">
              <a href="#faq" className="block opacity-70 hover:opacity-100 transition-opacity text-sm">
                {t.faqLink}
              </a>
              <a href="#rekommenderade-hotell" className="block opacity-70 hover:opacity-100 transition-opacity text-sm">
                {t.hotellLink}
              </a>
              <a href="#transport" className="block opacity-70 hover:opacity-100 transition-opacity text-sm">
                {t.transportLink}
              </a>
            </div>
          </div>

          {/* Wedding Date */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-3">
              {t.weddingDateFooter}
            </h4>
            <p className="text-sm mb-1 opacity-70">
              {t.weddingDateText}
            </p>
            <p className="text-sm opacity-70">
              {t.weddingLocation}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-wedding-pink/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs text-center md:text-left opacity-60">
              {t.copyrightText}
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-wedding-pink hover:bg-wedding-pink/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg text-sm"
            >
              <i className="fas fa-arrow-up text-xs"></i>
              {t.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
