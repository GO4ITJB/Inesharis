"use client";

import React, { useState } from "react";
import WelcomeStep from "./form-steps/WelcomeStep";
import GuestInfoStep from "./form-steps/GuestInfoStep";
import AttendanceStep from "./form-steps/AttendanceStep";
import CelebrationStep from "./form-steps/CelebrationStep";
import ConfirmationStep from "./form-steps/ConfirmationStep";
import { Language } from "@/lib/translations";

export interface FormData {
  // Guest Information
  name: string;
  email: string;
  phone: string;
  numberOfGuests: number; // 0-5 additional guests
  guestNames: string[]; // Names for each additional guest

  // Attendance
  attendingReception: boolean;
  attendingCeremony: boolean;

  // Hotel booking
  wantsHotelRoom: boolean | undefined;

  // Celebration Details
  songRequests: string[];
  dietaryRequirements: string;
  messageToCouple: string;
}

interface RSVPFormProps {
  language?: Language;
}

export default function RSVPForm({ language = "sv" }: RSVPFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    numberOfGuests: 0,
    guestNames: [],
    attendingReception: false,
    attendingCeremony: false,
    wantsHotelRoom: undefined,
    songRequests: ["", "", ""],
    dietaryRequirements: "",
    messageToCouple: "",
  });

  const steps = [
    { id: "welcome", component: WelcomeStep },
    { id: "guest-info", component: GuestInfoStep },
    { id: "attendance", component: AttendanceStep },
    { id: "celebration", component: CelebrationStep },
    { id: "confirmation", component: ConfirmationStep },
  ];

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      name: "",
      email: "",
      phone: "",
      numberOfGuests: 0,
      guestNames: [],
      attendingReception: false,
      attendingCeremony: false,
      wantsHotelRoom: undefined,
      songRequests: ["", "", ""],
      dietaryRequirements: "",
      messageToCouple: "",
    });
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep].component;
    return (
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        nextStep={nextStep}
        prevStep={prevStep}
        resetForm={resetForm}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
        currentStep={currentStep}
        totalSteps={steps.length}
        language={language}
      />
    );
  };

  return (
    <section className="min-h-screen bg-warm-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-wedding-dark font-light">
              {language === "sv"
                ? `Steg ${currentStep} av ${steps.length - 1}`
                : `Korak ${currentStep} od ${steps.length - 1}`}
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
  );
}
