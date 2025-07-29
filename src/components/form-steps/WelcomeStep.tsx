import React from 'react'
import { FormData } from '../RSVPForm'
import { translations, Language } from '@/lib/translations'

interface WelcomeStepProps {
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

export default function WelcomeStep({ nextStep, language = 'sv' }: WelcomeStepProps) {
  return (
    <div className="text-center p-12">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-script text-wedding-dark mb-4">
          {language === 'sv' ? 'Välkommen!' : 'Dobrodošli!'}
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed">
          {language === 'sv' 
            ? 'Vi är så glada att du vill vara med och fira vår stora dag'
            : 'Tako smo sretni što želite biti s nama i proslaviti naš veliki dan'
          }
        </p>
      </div>

      {/* Couple Names */}
      <div className="mb-12">
        <h2 className="text-4xl font-script text-wedding-pink mb-2">
          Ines & Haris
        </h2>
        <div className="w-24 h-px bg-wedding-pink mx-auto"></div>
      </div>

      {/* Event Details */}
      <div className="bg-gradient-to-r from-wedding-sand/50 to-transparent p-8 rounded-xl mb-8 border border-wedding-greige/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-wedding-dark mb-2">
              {language === 'sv' ? 'Vigsel' : 'Vjenčanje'}
            </h3>
            <p className="text-gray-600 font-light">Vijecnica</p>
            <p className="text-gray-600 font-light">14:00</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-wedding-dark mb-2">
              {language === 'sv' ? 'Bröllop' : 'Svadba'}
            </h3>
            <p className="text-gray-600 font-light">Hills</p>
            <p className="text-gray-600 font-light">18:00</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={nextStep}
        className="wedding-button-primary shadow-lg"
      >
        {language === 'sv' ? 'Låt oss börja' : 'Hajde da počnemo'}
        <span className="ml-2">→</span>
      </button>
    </div>
  )
} 
