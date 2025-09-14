import React from "react";
import { FormData } from "../RSVPForm";
import { translations, Language } from "@/lib/translations";

interface AttendanceStepProps {
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

export default function AttendanceStep({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  language = "sv",
}: AttendanceStepProps) {
  const t = translations[language];

  const handleNext = () => {
    // Only proceed to celebration step if attending reception
    if (formData.attendingReception) {
      nextStep();
    } else {
      // Skip celebration step and go directly to confirmation
      nextStep();
      setTimeout(() => nextStep(), 0);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-script text-wedding-dark mb-2">
          {t.comeToWedding}
        </h2>
        <p className="text-gray-600 font-light">{t.hopeYouCanJoin}</p>
      </div>

      {/* Event Options */}
      <div className="space-y-8">
        {/* Reception Attendance */}
        <div>
          <h3 className="text-xl font-medium text-wedding-dark mb-4 text-center">
            {t.weddingReceptionQuestion}
          </h3>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => updateFormData({ attendingReception: true })}
              className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                formData.attendingReception
                  ? "bg-wedding-pink text-white border-wedding-pink shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-wedding-pink hover:bg-wedding-sand/20"
              }`}
            >
              <div className="text-lg font-medium">{t.yesImComing}</div>
              <div className="text-sm opacity-75">Hills • 18:00</div>
            </button>
            <button
              type="button"
              onClick={() =>
                updateFormData({
                  attendingReception: false,
                  attendingCeremony: false,
                })
              }
              className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                formData.attendingReception === false
                  ? "bg-wedding-greige text-white border-wedding-greige shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-wedding-greige hover:bg-wedding-sand/20"
              }`}
            >
              <div className="text-lg font-medium">{t.noSorry}</div>
              <div className="text-sm opacity-75">{t.cantAttend}</div>
            </button>
          </div>
        </div>

        {/* Ceremony Attendance (Conditional) */}
        {formData.attendingReception && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-medium text-wedding-dark mb-4 text-center">
              {t.ceremonyQuestion}
            </h3>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => updateFormData({ attendingCeremony: true })}
                className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                  formData.attendingCeremony
                    ? "bg-wedding-pink text-white border-wedding-pink shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-wedding-pink hover:bg-wedding-sand/20"
                }`}
              >
                <div className="text-lg font-medium">
                  {language === "sv" ? "Ja!" : "Da!"}
                </div>
                <div className="text-sm opacity-75">Vijecnica • 14:00</div>
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ attendingCeremony: false })}
                className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                  formData.attendingCeremony === false
                    ? "bg-wedding-greige text-white border-wedding-greige shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-wedding-greige hover:bg-wedding-sand/20"
                }`}
              >
                <div className="text-lg font-medium">{t.justWedding}</div>
                <div className="text-sm opacity-75">{t.comingToHills}</div>
              </button>
            </div>
          </div>
        )}

        {/* Hotel Booking Question (Conditional) */}
        {formData.attendingReception && (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-medium text-wedding-dark mb-4 text-center">
              {t.hotelBookingQuestion}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              {t.hotelDiscountInfo}
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => updateFormData({ wantsHotelRoom: true })}
                className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                  formData.wantsHotelRoom === true
                    ? "bg-wedding-pink text-white border-wedding-pink shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-wedding-pink hover:bg-wedding-sand/20"
                }`}
              >
                <div className="text-lg font-medium">{t.yesPleaseBook}</div>
                <div className="text-sm opacity-75">{t.bookDoubleRoom}</div>
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ wantsHotelRoom: false })}
                className={`flex-1 py-4 px-6 rounded-lg border transition-all text-center ${
                  formData.wantsHotelRoom === false
                    ? "bg-wedding-greige text-white border-wedding-greige shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-wedding-greige hover:bg-wedding-sand/20"
                }`}
              >
                <div className="text-lg font-medium">{t.noThanksHotel}</div>
                <div className="text-sm opacity-75">{t.arrangeMyself}</div>
              </button>
            </div>
          </div>
        )}

        {/* Thank you message for non-attendees */}
        {!formData.attendingReception && (
          <div className="text-center p-6 bg-wedding-sand/50 rounded-xl border border-wedding-greige/30">
            <p className="text-wedding-dark font-light">
              {language === "sv"
                ? "Vi förstår! Tack för att du lät oss veta. Vi kommer att sakna dig. ❤️"
                : "Razumijemo! Hvala što ste nam javili. Nedostajat ćete nam. ❤️"}
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
          {language === "sv" ? "← Tillbaka" : "← Nazad"}
        </button>
        <button
          onClick={handleNext}
          className="wedding-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={formData.attendingReception === undefined}
        >
          {formData.attendingReception
            ? language === "sv"
              ? "Nästa"
              : "Sljedeće"
            : language === "sv"
            ? "Skicka RSVP"
            : "Pošalji RSVP"}
        </button>
      </div>
    </div>
  );
}
