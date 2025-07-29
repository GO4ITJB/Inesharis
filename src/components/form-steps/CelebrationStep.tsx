import React from 'react'
import { FormData } from '../RSVPForm'

interface CelebrationStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
}

export default function CelebrationStep({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}: CelebrationStepProps) {
  const updateSongRequest = (index: number, value: string) => {
    const newSongRequests = [...formData.songRequests]
    newSongRequests[index] = value
    updateFormData({ songRequests: newSongRequests })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-script text-wedding-dark mb-2">
          Låt oss fira!
        </h2>
        <p className="text-gray-600 font-light">
          Hjälp oss att göra kvällen perfekt med din input
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Song Requests */}
        <div>
          <label className="block text-lg font-medium text-wedding-dark mb-4 text-center">
            Vilka 3 låtar kommer få dig att dansa? 🎵
          </label>
          <p className="text-sm text-gray-600 text-center mb-6">
            Berätta vilka låtar som garanterat får dig upp på dansgolvet!
          </p>
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <input
                  type="text"
                  value={formData.songRequests[index]}
                  onChange={(e) => updateSongRequest(index, e.target.value)}
                  className="form-input"
                  placeholder={`Låt ${index + 1} - Artist & låttitel`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Requirements */}
        <div>
          <label className="block text-lg font-medium text-wedding-dark mb-4 text-center">
            Specialkost? 🍽️
          </label>
          <p className="text-sm text-gray-600 text-center mb-4">
            Har du några allergier eller specialkost vi bör veta om?
          </p>
          <textarea
            value={formData.dietaryRequirements}
            onChange={(e) => updateFormData({ dietaryRequirements: e.target.value })}
            className="form-input resize-none"
            placeholder="Vegetarian, glutenfri, allergier, etc..."
            rows={3}
          />
        </div>

        {/* Message to Couple */}
        <div>
          <label className="block text-lg font-medium text-wedding-dark mb-4 text-center">
            Meddelande till paret? 💌
          </label>
          <p className="text-sm text-gray-600 text-center mb-4">
            Vill du skicka ett särskilt meddelande till Ines & Haris?
          </p>
          <textarea
            value={formData.messageToCouple}
            onChange={(e) => updateFormData({ messageToCouple: e.target.value })}
            className="form-input resize-none"
            placeholder="Skriv ditt meddelande här..."
            rows={4}
          />
        </div>
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
          onClick={nextStep}
          className="wedding-button-primary"
        >
          Nästa
        </button>
      </div>
    </div>
  )
} 
