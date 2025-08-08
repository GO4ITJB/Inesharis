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
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl mb-8 border border-wedding-pink/20 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div className="text-center relative">
            {/* Decorative line above */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto mb-4"></div>
            
            {/* Icon */}
            <div className="w-12 h-12 bg-wedding-pink/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-heart text-wedding-pink text-lg"></i>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-script text-wedding-dark mb-3">
              {language === 'sv' ? 'Vigsel' : 'Vjenčanje'}
            </h3>
            
            {/* Location */}
            <div className="mb-2">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {language === 'sv' ? 'Plats' : 'Mjesto'}
              </p>
              <p className="text-lg font-medium text-wedding-dark">Vijecnica</p>
            </div>
            
            {/* Time */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {language === 'sv' ? 'Tid' : 'Vrijeme'}
              </p>
              <p className="text-2xl font-script text-wedding-pink">14:00</p>
            </div>
            
            {/* Decorative line below */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto mt-4"></div>
          </div>
          
          {/* Reception */}
          <div className="text-center relative">
            {/* Decorative line above */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto mb-4"></div>
            
            {/* Icon */}
            <div className="w-12 h-12 bg-wedding-pink/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-glass-cheers text-wedding-pink text-lg"></i>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-script text-wedding-dark mb-3">
              {language === 'sv' ? 'Bröllop' : 'Svadba'}
            </h3>
            
            {/* Location */}
            <div className="mb-2">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {language === 'sv' ? 'Plats' : 'Mjesto'}
              </p>
              <p className="text-lg font-medium text-wedding-dark">Hills</p>
            </div>
            
            {/* Time */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {language === 'sv' ? 'Tid' : 'Vrijeme'}
              </p>
              <p className="text-2xl font-script text-wedding-pink">18:00</p>
            </div>
            
            {/* Decorative line below */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto mt-4"></div>
          </div>
        </div>
        
        {/* Connecting line between events */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-wedding-pink to-transparent"></div>
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
