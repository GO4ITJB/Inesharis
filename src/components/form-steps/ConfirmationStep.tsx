import React, { useState } from 'react'
import { FormData } from '../RSVPForm'
import { translations, Language } from '@/lib/translations'

interface ConfirmationStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  resetForm: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
  language?: Language
}

export default function ConfirmationStep({ 
  formData, 
  prevStep,
  language = 'sv' 
}: ConfirmationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: language // Add language for confirmation email
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit RSVP')
      }

      const result = await response.json()
      console.log('RSVP submitted successfully:', result)
      
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError(language === 'sv' 
        ? 'Failed to submit RSVP. Please try again.'
        : 'Neuspješno slanje RSVP-a. Molimo pokušajte ponovo.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <div className="text-center p-12">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-4xl font-script text-wedding-dark mb-4">
            {language === 'sv' ? 'Något gick fel' : 'Nešto je pošlo po zlu'}
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
            {error}
          </p>
          <button 
            onClick={() => setError(null)}
            className="wedding-button-primary"
          >
            {language === 'sv' ? 'Försök igen' : 'Pokušaj ponovo'}
          </button>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-12">
        <div className="mb-8">
          <div className="w-20 h-20 bg-wedding-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-wedding-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-script text-wedding-dark mb-4">
            {language === 'sv' ? 'Tack så mycket!' : 'Hvala vam puno!'}
          </h2>
          <p className="text-xl text-wedding-dark font-light leading-relaxed mb-2">
            {language === 'sv' 
              ? 'Din RSVP har skickats till Ines & Haris'
              : 'Vaš RSVP je poslat Ines & Haris-u'
            }
          </p>
          <p className="text-gray-600 font-light mb-8">
            {language === 'sv' 
              ? 'Du kommer att få en bekräftelse via e-post inom kort.'
              : 'Uskoro ćete dobiti potvrdu na e-mail.'
            }
          </p>
          <p className="text-lg text-wedding-pink font-medium">
            {language === 'sv' 
              ? 'Vi ser fram emot att fira med dig! 🎉'
              : 'Radujemo se proslavi s vama! 🎉'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-script text-wedding-dark mb-2">
          {language === 'sv' ? 'Bekräfta din RSVP' : 'Potvrdite svoj RSVP'}
        </h2>
        <p className="text-gray-600 font-light">
          {language === 'sv' 
            ? 'Kontrollera att allt stämmer innan du skickar'
            : 'Provjerite da li je sve tačno prije slanja'
          }
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 mb-8">
        {/* Guest Information */}
        <div className="mb-6">
          <h3 className="font-medium text-wedding-dark mb-4">
            {language === 'sv' ? 'Gästinformation' : 'Informacije o gostu'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{language === 'sv' ? 'Namn:' : 'Ime:'}</span>
              <span className="ml-2 font-medium">{formData.name}</span>
            </div>
            <div>
              <span className="text-gray-600">E-post:</span>
              <span className="ml-2 font-medium">{formData.email}</span>
            </div>
            <div>
              <span className="text-gray-600">{language === 'sv' ? 'Telefon:' : 'Telefon:'}</span>
              <span className="ml-2 font-medium">{formData.phone || (language === 'sv' ? 'Ej angiven' : 'Nije navedeno')}</span>
            </div>
            <div className="flex justify-between items-center py-2 text-sm">
              <span className="text-gray-600">
                {language === 'sv' ? 'Tar med gäst:' : 'Dovodite gosta:'}
              </span>
              <span className="font-medium text-wedding-dark">
                {formData.numberOfGuests > 0 
                  ? formData.guestNames.filter(name => name.trim()).join(', ') || `${formData.numberOfGuests} ${language === 'sv' ? 'gäster' : 'gosta'}`
                  : (language === 'sv' ? 'Nej' : 'Ne')
                }
              </span>
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="mb-6">
          <h3 className="font-medium text-wedding-dark mb-4">
            {language === 'sv' ? 'Närvaro' : 'Prisustvo'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="text-gray-600">
                {language === 'sv' ? 'Bröllop (Hills 18:00):' : 'Svadba (Hills 18:00):'}
              </span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                formData.attendingReception 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {formData.attendingReception 
                  ? (language === 'sv' ? '✓ Ja, kommer' : '✓ Da, dolazim')
                  : (language === 'sv' ? '✗ Kommer ej' : '✗ Ne dolazim')
                }
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">
                {language === 'sv' ? 'Vigsel (Vijecnica 14:00):' : 'Vjenčanje (Vijecnica 14:00):'}
              </span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                formData.attendingCeremony 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {formData.attendingCeremony 
                  ? (language === 'sv' ? '✓ Ja, kommer' : '✓ Da, dolazim')
                  : (language === 'sv' ? '○ Bara bröllop' : '○ Samo svadba')
                }
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(formData.songRequests?.some(song => song) || formData.dietaryRequirements || formData.messageToCouple) && (
          <div>
            <h3 className="font-medium text-wedding-dark mb-4">
              {language === 'sv' ? 'Ytterligare information' : 'Dodatne informacije'}
            </h3>
            <div className="space-y-3">
              {formData.songRequests.some(song => song.trim()) && (
                <div>
                  <span className="font-medium">
                    {language === 'sv' ? 'Låtönskningar:' : 'Zahtjevi za pjesme:'}
                  </span>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {formData.songRequests.filter(song => song.trim()).map((song, index) => (
                      <li key={index} className="text-gray-700">{song}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {formData.dietaryRequirements && (
                <p>
                  <span className="font-medium">
                    {language === 'sv' ? 'Specialkost:' : 'Posebna ishrana:'}
                  </span> {formData.dietaryRequirements}
                </p>
              )}
              
              {formData.messageToCouple && (
                <div>
                  <span className="font-medium">
                    {language === 'sv' ? 'Meddelande:' : 'Poruka:'}
                  </span>
                  <p className="mt-1 italic text-gray-700">"{formData.messageToCouple}"</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 mt-8 border-t border-wedding-greige/40">
        <button
          onClick={prevStep}
          className="px-6 py-3 text-wedding-dark hover:text-wedding-pink transition-colors"
          disabled={isSubmitting}
        >
          {language === 'sv' ? '← Tillbaka' : '← Nazad'}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="wedding-button-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'sv' ? 'Skickar...' : 'Šalje se...'}
            </>
          ) : (
            language === 'sv' ? 'Skicka RSVP' : 'Pošalji RSVP'
          )}
        </button>
      </div>
    </div>
  )
} 
