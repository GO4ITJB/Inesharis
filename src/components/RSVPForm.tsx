'use client'

import React, { useState } from 'react'
import WelcomeStep from './form-steps/WelcomeStep'
import GuestInfoStep from './form-steps/GuestInfoStep'
import AttendanceStep from './form-steps/AttendanceStep'
import CelebrationStep from './form-steps/CelebrationStep'
import ConfirmationStep from './form-steps/ConfirmationStep'

export interface FormData {
  // Guest Information
  name: string
  email: string
  phone: string
  bringingGuest: boolean
  guestName?: string
  
  // Attendance
  attendingReception: boolean
  attendingCeremony: boolean
  
  // Celebration Details
  songRequests: string[]
  dietaryRequirements: string
  messageToCouple: string
}

export default function RSVPForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    bringingGuest: false,
    guestName: '',
    attendingReception: false,
    attendingCeremony: false,
    songRequests: ['', '', ''],
    dietaryRequirements: '',
    messageToCouple: ''
  })

  const steps = [
    { id: 'welcome', component: WelcomeStep },
    { id: 'guest-info', component: GuestInfoStep },
    { id: 'attendance', component: AttendanceStep },
    { id: 'celebration', component: CelebrationStep },
    { id: 'confirmation', component: ConfirmationStep }
  ]

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep].component
    return (
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        nextStep={nextStep}
        prevStep={prevStep}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
    )
  }

  return (
    <section className="min-h-screen bg-warm-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-wedding-dark font-light">
              Steg {currentStep} av {steps.length - 1}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="form-container">
          <div className="relative">
            {/* Step Content */}
            <div className="transform transition-all duration-500 ease-in-out">
              {getCurrentStepComponent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
