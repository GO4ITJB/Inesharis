import React from 'react'
import { FormData } from '../RSVPForm'

interface AttendanceStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: number
  totalSteps: number
}

export default function AttendanceStep({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}: AttendanceStepProps) {
  const handleNext = () => {
    // Only proceed to celebration step if attending reception
    if (formData.attendingReception) {
      nextStep()
    } else {
      // Skip celebration step and go directly to confirmation
      nextStep()
      setTimeout(() => nextStep(), 0)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-script text-wedding-dark mb-2">
          Kommer du?
        </h2>
        <p className="text-gray-600 font-light">
          Vi hoppas verkligen att du kan vara med på vår stora dag
        </p>
      </div>

      {/* Event Options */}
      <div className="space-y-8">
        {/* Reception Attendance */}
        <div>
          <h3 className="text-xl font-medium text-wedding-dark mb-4 text-center">
            Kommer du på bröllopet 18:00 på Hills?
          </h3>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => updateFormData({ attendingReception: true })}
              className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                formData.attendingReception
                  ? 'bg-wedding-pink text-white border-wedding-pink shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-wedding-pink hover:bg-wedding-sand/20'
              }`}
            >
              <div className="text-lg font-medium">Ja, jag kommer!</div>
              <div className="text-sm opacity-75">Hills • 18:00</div>
            </button>
            <button
              type="button"
              onClick={() => updateFormData({ attendingReception: false, attendingCeremony: false })}
              className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                formData.attendingReception === false
                  ? 'bg-wedding-greige text-white border-wedding-greige shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-wedding-greige hover:bg-wedding-sand/20'
              }`}
            >
              <div className="text-lg font-medium">Nej tyvärr</div>
              <div className="text-sm opacity-75">Kan inte delta</div>
            </button>
          </div>
        </div>

        {/* Ceremony Attendance (Conditional) */}
        {formData.attendingReception && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-medium text-wedding-dark mb-4 text-center">
              Kommer du till vigseln i Vijecnica 14:00?
            </h3>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => updateFormData({ attendingCeremony: true })}
                className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                  formData.attendingCeremony
                    ? 'bg-wedding-pink text-white border-wedding-pink shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-wedding-pink hover:bg-wedding-sand/20'
                }`}
              >
                <div className="text-lg font-medium">Ja!</div>
                <div className="text-sm opacity-75">Vijecnica • 14:00</div>
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ attendingCeremony: false })}
                className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                  formData.attendingCeremony === false
                    ? 'bg-wedding-greige text-white border-wedding-greige shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-wedding-greige hover:bg-wedding-sand/20'
                }`}
              >
                <div className="text-lg font-medium">Bara bröllopet</div>
                <div className="text-sm opacity-75">Kommer till Hills</div>
              </button>
            </div>
          </div>
        )}

        {/* Thank you message for non-attendees */}
        {!formData.attendingReception && (
          <div className="text-center p-6 bg-wedding-sand/50 rounded-xl border border-wedding-greige/30">
            <p className="text-wedding-dark font-light">
              Vi förstår! Tack för att du lät oss veta. Vi kommer att sakna dig. ❤️
            </p>
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
          onClick={handleNext}
          className="wedding-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={formData.attendingReception === undefined}
        >
          {formData.attendingReception ? 'Nästa' : 'Skicka RSVP'}
        </button>
      </div>
    </div>
  )
} 
