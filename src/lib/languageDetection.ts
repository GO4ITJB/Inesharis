export type Language = 'sv' | 'ba'

export function detectBrowserLanguage(): Language {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'ba' // Default to Bosnian on server-side
  }

  // Check localStorage first for user preference
  const savedLanguage = localStorage.getItem('preferred-language') as Language
  if (savedLanguage && (savedLanguage === 'sv' || savedLanguage === 'ba')) {
    return savedLanguage
  }

  // Check browser language preferences
  const browserLanguages = navigator.languages || [navigator.language]
  
  // Check if any preferred language starts with 'sv' (Swedish)
  for (const lang of browserLanguages) {
    if (lang.toLowerCase().startsWith('sv')) {
      return 'sv'
    }
  }

  // Default to Bosnian for all other languages
  return 'ba'
}

export function saveLanguagePreference(language: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language)
  }
}

export function getLanguageFromPath(): Language | null {
  if (typeof window === 'undefined') return null
  
  const path = window.location.pathname
  if (path.startsWith('/ba')) {
    return 'ba'
  } else if (path === '/' || path.startsWith('/rsvp')) {
    return 'sv'
  }
  
  return null
} 
