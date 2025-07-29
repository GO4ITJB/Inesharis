'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSelector() {
  const pathname = usePathname()
  const isBosnian = pathname.startsWith('/ba')

  return (
    <div className="flex items-center space-x-3">
      <Link 
        href="/" 
        className={`text-2xl transition-all duration-300 hover:scale-110 ${
          !isBosnian 
            ? 'opacity-100' 
            : 'opacity-60 hover:opacity-80'
        }`}
      >
        🇸🇪
      </Link>
      <Link 
        href="/ba" 
        className={`text-2xl transition-all duration-300 hover:scale-110 ${
          isBosnian 
            ? 'opacity-100' 
            : 'opacity-60 hover:opacity-80'
        }`}
      >
        🇧🇦
      </Link>
    </div>
  )
} 
