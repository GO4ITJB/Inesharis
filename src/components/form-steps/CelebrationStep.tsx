import React from "react";
import { FormData } from "../RSVPForm";
import { translations, Language } from "@/lib/translations";

interface CelebrationStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
  language?: Language;
}

export default function CelebrationStep({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  language = "sv",
}: CelebrationStepProps) {
  const updateSongRequest = (index: number, value: string) => {
    const newSongRequests = [...formData.songRequests];
    newSongRequests[index] = value;
    updateFormData({ songRequests: newSongRequests });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-script text-wedding-dark mb-2">
          {language === "sv" ? "Låt oss fira!" : "Hajde da slavimo!"}
        </h2>
        <p className="text-gray-600 font-light">
          {language === "sv"
            ? "Hjälp oss att göra kvällen perfekt med din input"
            : "Pomozite nam da učinimo veče savršenim s vašim savjetima"}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Song Requests */}
        <div>
          <label className="block text-lg font-medium text-wedding-dark mb-4 text-center">
            {language === "sv"
              ? "Vilka 3 låtar kommer få dig att dansa? 🎵"
              : "Koje 3 pjesme će vas dobiti da plešete? 🎵"}
          </label>
          <p className="text-sm text-gray-600 text-center mb-6">
            {language === "sv"
              ? "Berätta vilka låtar som garanterat får dig upp på dansgolvet!"
              : "Recite nam koje pjesme će vas garantovano izvesti na podij za ples!"}
          </p>
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <input
                  type="text"
                  value={formData.songRequests[index]}
                  onChange={(e) => updateSongRequest(index, e.target.value)}
                  className="form-input"
                  placeholder={
                    language === "sv"
                      ? `Låt ${index + 1} - Artist & låttitel`
                      : `Pjesma ${index + 1} - Izvođač i naziv`
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Requirements */}
        <div>
          <label className="block text-lg font-medium text-wedding-dark mb-4 text-center">
            {language === "sv" ? "Specialkost? 🍽️" : "Posebna ishrana? 🍽️"}
          </label>
          <p className="text-sm text-gray-600 text-center mb-4">
            {language === "sv"
              ? "Har du några allergier eller specialkost vi bör veta om?"
              : "Imate li neke alergije ili posebne prehrambene potrebe koje trebamo znati?"}
          </p>
          <textarea
            value={formData.dietaryRequirements}
            onChange={(e) =>
              updateFormData({ dietaryRequirements: e.target.value })
            }
            className="form-input resize-none"
            placeholder={
              language === "sv"
                ? "Vegetarian, glutenfri, allergier, etc..."
                : "Vegetarijanska, bezglutenska, alergije, itd..."
            }
            rows={3}
          />
        </div>

        {/* Message to Couple */}
        <div>
          <label className="block text-lg font-medium text-wedding-dark mb-4 text-center">
            {language === "sv"
              ? "Meddelande till paret? 💌"
              : "Poruka za par? 💌"}
          </label>
          <p className="text-sm text-gray-600 text-center mb-4">
            {language === "sv"
              ? "Vill du skicka ett särskilt meddelande till Ines & Haris?"
              : "Želite li poslati posebnu poruku za Ines i Haris?"}
          </p>
          <textarea
            value={formData.messageToCouple}
            onChange={(e) =>
              updateFormData({ messageToCouple: e.target.value })
            }
            className="form-input resize-none"
            placeholder={
              language === "sv"
                ? "Skriv ditt meddelande här..."
                : "Napišite svoju poruku ovdje..."
            }
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
          {language === "sv" ? "← Tillbaka" : "← Nazad"}
        </button>
        <button onClick={nextStep} className="wedding-button-primary">
          {language === "sv" ? "Nästa" : "Sljedeće"}
        </button>
      </div>
    </div>
  );
}
