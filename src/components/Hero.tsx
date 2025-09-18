"use client";

import React from "react";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import { translations, Language } from "@/lib/translations";

interface HeroProps {
  language?: Language;
}

export default function Hero({ language = "sv" }: HeroProps) {
  const weddingDate = new Date("2026-07-25T14:00:00");
  const t = translations[language];

  return (
    <section className="fixed top-0 left-0 h-screen w-full z-[1] flex items-center justify-center text-white text-center">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Desktop YouTube Video */}
        <div className="hidden md:block absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/0hLBjYAhUzE?autoplay=1&mute=1&loop=1&playlist=0hLBjYAhUzE&start=1620&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            title="Wedding Video Desktop"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute w-full h-full object-cover"
            style={{
              pointerEvents: "none",
              width: "100vw",
              height: "100vh",
              transform: "scale(1.2)",
              transformOrigin: "center center",
              objectFit: "cover",
            }}
          ></iframe>
        </div>

        {/* Mobile YouTube Video */}
        <div className="md:hidden absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/jEcnNoHbnMQ?autoplay=1&mute=1&loop=1&playlist=jEcnNoHbnMQ&start=3&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            title="Wedding Video Mobile"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute w-full h-full object-cover"
            style={{
              pointerEvents: "none",
              width: "100vw",
              height: "100vh",
              transform: "scale(1.3)",
              transformOrigin: "center center",
              objectFit: "cover",
            }}
          ></iframe>
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Save Our Date */}
        <div className="mb-8">
          <p className="text-sm tracking-widest uppercase mb-4 font-light text-shadow">
            {t.saveTheDate}
          </p>
        </div>

        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-script mb-6 text-shadow-lg">
            {t.weAreGettingMarried}
          </h1>
        </div>

        {/* Wedding Date */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl font-light tracking-wide text-shadow">
            {t.weddingDate}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={language === "ba" ? "/ba/rsvp" : "/rsvp"}
            className="wedding-button-primary px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:scale-105"
          >
            {t.rsvpNow} →
          </Link>

          <a
            href="#rekommenderade-hotell"
            className="wedding-button-primary px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:scale-105"
          >
            {t.bookHotel}
          </a>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CountdownTimer targetDate={weddingDate} language={language} />
      </div>
    </section>
  );
}
