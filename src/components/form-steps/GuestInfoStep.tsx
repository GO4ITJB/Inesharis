import React, { useState } from 'react'
import { FormData } from '../RSVPForm'
import { translations, Language } from '@/lib/translations'

interface GuestInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
  language?: Language
}

export default function GuestInfoStep({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep,
  language = 'sv' 
}: GuestInfoStepProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const t = translations[language]

  const validateAndNext = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = language === 'sv' ? 'Namn krävs' : 'Ime je obavezno'
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'sv' ? 'E-postadress krävs' : 'E-mail adresa je obavezna'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'sv' ? 'Ogiltig e-postadress' : 'Neispravna e-mail adresa'
    }

    if (formData.bringingGuest && !formData.guestName?.trim()) {
      newErrors.guestName = language === 'sv' ? 'Gästens namn krävs' : 'Ime gosta je obavezno'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      nextStep()
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-script text-wedding-dark mb-2">
          {language === 'sv' ? 'Vem är du?' : 'Ko ste vi?'}
        </h2>
        <p className="text-gray-600 font-light">
          {language === 'sv' 
            ? 'Berätta lite om dig själv så vi vet vem som kommer'
            : 'Recite nam nešto o sebi tako da znamo ko dolazi'
          }
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-2">
            {language === 'sv' ? 'Ditt namn *' : 'Vaše ime *'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder={language === 'sv' ? 'Förnamn Efternamn' : 'Ime Prezime'}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-2">
            {language === 'sv' ? 'E-postadress *' : 'E-mail adresa *'}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder={language === 'sv' ? 'din@email.se' : 'vas@email.ba'}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-2">
            {language === 'sv' ? 'Telefonnummer (valfritt)' : 'Broj telefona (opcionalno)'}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="form-input"
            placeholder={language === 'sv' ? '070-123 45 67' : '061-123-456'}
          />
        </div>

        {/* Guest Selection */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-4">
            {language === 'sv' ? 'Kommer du med någon?' : 'Dovodite li nekoga?'}
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => updateFormData({ bringingGuest: false, guestName: '' })}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                !formData.bringingGuest
                  ? 'bg-wedding-pink text-white border-wedding-pink'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-wedding-pink'
              }`}
            >
              {language === 'sv' ? 'Nej, bara jag' : 'Ne, samo ja'}
            </button>
            <button
              type="button"
              onClick={() => updateFormData({ bringingGuest: true })}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                formData.bringingGuest
                  ? 'bg-wedding-pink text-white border-wedding-pink'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-wedding-pink'
              }`}
            >
              {language === 'sv' ? 'Ja, med gäst' : 'Da, sa gostom'}
            </button>
          </div>
        </div>

        {/* Guest Name (conditional) */}
        {formData.bringingGuest && (
          <div>
            <label className="block text-sm font-medium text-wedding-dark mb-2">
              {language === 'sv' ? 'Gästens namn *' : 'Ime gosta *'}
            </label>
            <input
              type="text"
              value={formData.guestName || ''}
              onChange={(e) => updateFormData({ guestName: e.target.value })}
              className={`form-input ${errors.guestName ? 'error' : ''}`}
              placeholder={language === 'sv' ? 'Gästens förnamn och efternamn' : 'Ime i prezime gosta'}
            />
            {errors.guestName && <p className="text-red-500 text-sm mt-1">{errors.guestName}</p>}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 mt-8 border-t border-wedding-greige/40">
        <button
          onClick={prevStep}
          className="px-6 py-3 text-wedding-dark hover:text-wedding-pink transition-colors"
        >
          {language === 'sv' ? '← Tillbaka' : '← Nazad'}
        </button>
        <button
          onClick={validateAndNext}
          className="wedding-button-primary"
        >
          {language === 'sv' ? 'Nästa' : 'Sljedeće'}
        </button>
      </div>
    </div>
  )
} 
