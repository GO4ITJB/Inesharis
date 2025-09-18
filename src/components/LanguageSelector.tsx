'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { saveLanguagePreference } from '@/lib/languageDetection'
import { SE, BA } from 'country-flag-icons/react/3x2'

export default function LanguageSelector() {
  const pathname = usePathname()
  const isBosnian = pathname.startsWith('/ba')

  const handleLanguageChange = (language: 'sv' | 'ba') => {
    // Save the user's manual language preference
    saveLanguagePreference(language)
  }

  return (
    <div className="flex items-center space-x-2">
      <Link 
        href="/" 
        onClick={() => handleLanguageChange('sv')}
        className={`text-2xl transition-all duration-200 hover:scale-110 ${
          !isBosnian ? 'opacity-100' : 'opacity-60 hover:opacity-80'
        }`}
        title="Svenska"
      >
        <SE className="w-6 h-4" />
      </Link>
      <Link 
        href="/ba" 
        onClick={() => handleLanguageChange('ba')}
        className={`text-2xl transition-all duration-200 hover:scale-110 ${
          isBosnian ? 'opacity-100' : 'opacity-60 hover:opacity-80'
        }`}
        title="Bosanski"
      >
        <BA className="w-6 h-4" />
      </Link>
    </div>
  )
} 
