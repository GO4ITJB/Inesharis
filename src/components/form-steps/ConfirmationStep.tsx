import React, { useState } from 'react'
import { FormData } from '../RSVPForm'

interface ConfirmationStepProps {
  formData: FormData
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
}

export default function ConfirmationStep({ 
  formData, 
  prevStep 
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
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit RSVP')
      }

      const result = await response.json()
      console.log('RSVP submitted successfully:', result)
      
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError('Failed to submit RSVP. Please try again.')
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
            Något gick fel
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
            {error}
          </p>
          <button 
            onClick={() => setError(null)}
            className="wedding-button-primary"
          >
            Försök igen
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
            Tack så mycket!
          </h2>
          <p className="text-xl text-wedding-dark font-light leading-relaxed mb-2">
            Din RSVP har skickats till Ines & Haris
          </p>
          <p className="text-gray-600 font-light mb-8">
            Du kommer att få en bekräftelse via e-post inom kort.
          </p>
          <p className="text-lg text-wedding-pink font-medium">
            Vi ser fram emot att fira med dig! 🎉
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
          Bekräfta din RSVP
        </h2>
        <p className="text-gray-600 font-light">
          Kontrollera att allt stämmer innan du skickar
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 mb-8">
        {/* Guest Information */}
        <div className="mb-6">
          <h3 className="font-medium text-wedding-dark mb-4">Gästinformation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Namn:</span>
              <span className="ml-2 font-medium">{formData.name}</span>
            </div>
            <div>
              <span className="text-gray-600">E-post:</span>
              <span className="ml-2 font-medium">{formData.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Telefon:</span>
              <span className="ml-2 font-medium">{formData.phone || 'Ej angiven'}</span>
            </div>
            <div>
              <span className="text-gray-600">Medföljande gäst:</span>
              <span className="ml-2 font-medium">{formData.bringingGuest ? formData.guestName : 'Nej'}</span>
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="mb-6">
          <h3 className="font-medium text-wedding-dark mb-4">Närvaro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="text-gray-600">Bröllop (Hills 18:00):</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                formData.attendingReception 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {formData.attendingReception ? '✓ Ja, kommer' : '✗ Kommer ej'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Vigsel (Vijecnica 14:00):</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                formData.attendingCeremony 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {formData.attendingCeremony ? '✓ Ja, kommer' : '○ Bara bröllop'}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(formData.songRequests?.some(song => song) || formData.dietaryRequirements || formData.messageToCouple) && (
          <div>
            <h3 className="font-medium text-wedding-dark mb-4">Ytterligare information</h3>
            <div className="space-y-3">
              {formData.songRequests.some(song => song.trim()) && (
                <div>
                  <span className="font-medium">Låtönskningar:</span>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {formData.songRequests.filter(song => song.trim()).map((song, index) => (
                      <li key={index} className="text-gray-700">{song}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {formData.dietaryRequirements && (
                <p>
                  <span className="font-medium">Specialkost:</span> {formData.dietaryRequirements}
                </p>
              )}
              
              {formData.messageToCouple && (
                <div>
                  <span className="font-medium">Meddelande:</span>
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
          ← Tillbaka
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
              Skickar...
            </>
          ) : (
            'Skicka RSVP'
          )}
        </button>
      </div>
    </div>
  )
} 
