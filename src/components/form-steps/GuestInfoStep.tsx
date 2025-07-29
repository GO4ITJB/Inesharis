import React, { useState } from 'react'
import { FormData } from '../RSVPForm'

interface GuestInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
}

export default function GuestInfoStep({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}: GuestInfoStepProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateAndNext = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Namn krävs'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-postadress krävs'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer krävs'
    }

    if (formData.bringingGuest && !formData.guestName?.trim()) {
      newErrors.guestName = 'Gästens namn krävs'
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
          Vem är du?
        </h2>
        <p className="text-gray-600 font-light">
          Berätta lite om dig själv så vi vet vem som kommer
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-2">
            Ditt namn *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Förnamn Efternamn"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-2">
            E-postadress *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="din@email.se"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-2">
            Telefonnummer (valfritt)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="form-input"
            placeholder="070-123 45 67"
          />
        </div>

        {/* Guest Selection */}
        <div>
          <label className="block text-sm font-medium text-wedding-dark mb-4">
            Kommer du med någon?
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
              Nej, bara jag
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
              Ja, med gäst
            </button>
          </div>
        </div>

        {/* Guest Name (conditional) */}
        {formData.bringingGuest && (
          <div>
            <label className="block text-sm font-medium text-wedding-dark mb-2">
              Gästens namn *
            </label>
            <input
              type="text"
              value={formData.guestName || ''}
              onChange={(e) => updateFormData({ guestName: e.target.value })}
              className={`form-input ${errors.guestName ? 'error' : ''}`}
              placeholder="Gästens förnamn och efternamn"
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
          ← Tillbaka
        </button>
        <button
          onClick={validateAndNext}
          className="wedding-button-primary"
        >
          Nästa
        </button>
      </div>
    </div>
  )
} 
