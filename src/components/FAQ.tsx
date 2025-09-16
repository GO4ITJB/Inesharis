"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { translations, Language } from "@/lib/translations";

interface FAQItem {
  question: string;
  answer: string;
  hasClickableLink?: boolean;
  linkText?: string;
  linkHref?: string;
}

interface FAQProps {
  language?: Language;
}

const FAQItem = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-wedding-pink/20 last:border-b-0">
      <button
        className="w-full text-left py-6 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-wedding-pink/20 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-wedding-brown pr-4">
          {item.question}
        </h3>
        <div className="flex-shrink-0 text-wedding-pink">
          {isOpen ? (
            <FaChevronUp className="w-5 h-5" />
          ) : (
            <FaChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="pb-8 mt-2">
          <div className="text-wedding-brown/80 leading-relaxed">
            {item.hasClickableLink ? (
              <>
                {item.answer}{" "}
                <a
                  href={item.linkHref}
                  className="text-wedding-pink hover:text-wedding-pink/80 underline font-semibold transition-all duration-200"
                >
                  {item.linkText}
                </a>
                .
              </>
            ) : (
              item.answer
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function FAQ({ language = "sv" }: FAQProps) {
  const t = translations[language];

  const faqData: FAQItem[] = [
    {
      question: t.faqQuestions.travel.question,
      answer: t.faqQuestions.travel.answer,
    },
    {
      question: t.faqQuestions.accommodation.question,
      answer: t.faqQuestions.accommodation.answer,
      hasClickableLink: true,
      linkText: t.clickHereForMoreInfo,
      linkHref: "#rekommenderade-hotell",
    },
    {
      question: t.faqQuestions.transport.question,
      answer: t.faqQuestions.transport.answer,
      hasClickableLink: true,
      linkText: t.seeTransportInfo,
      linkHref: "#transport",
    },
    {
      question: t.faqQuestions.payment.question,
      answer: t.faqQuestions.payment.answer,
    },
    {
      question: t.faqQuestions.dressCode.question,
      answer: t.faqQuestions.dressCode.answer,
    },
    {
      question: t.faqQuestions.gifts.question,
      answer: t.faqQuestions.gifts.answer,
    },
    {
      question: t.faqQuestions.corsage.question,
      answer: t.faqQuestions.corsage.answer,
    },
  ];
  return (
    <section
      id="faq"
      className="relative z-[5] py-20 bg-white text-wedding-dark"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Couple Image */}
        <div className="flex justify-center mb-20">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-wedding-pink/30 shadow-2xl relative">
              <img
                src="/IMG_6184.JPG"
                alt="Ines & Haris"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-wedding-pink/20 rounded-full"></div>
            </div>

            {/* Decorative hearts around image */}
            <div className="absolute top-4 -left-8 w-8 h-8 opacity-60 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/70 text-lg"></i>
            </div>
            <div className="absolute bottom-4 -right-8 w-8 h-8 opacity-60 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/70 text-lg"></i>
            </div>
            <div className="absolute -top-8 right-4 w-6 h-6 opacity-50 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/60 text-sm"></i>
            </div>
            <div className="absolute -bottom-8 left-4 w-6 h-6 opacity-50 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/60 text-sm"></i>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mb-6"></div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-brown mb-4">
              {t.faqTitle}
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </div>

          <p className="text-lg md:text-xl text-wedding-brown/70 font-light max-w-2xl mx-auto leading-relaxed mt-8">
            {t.faqDescription}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-wedding-sand/30 rounded-lg p-8 shadow-lg">
            {faqData.map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Additional Note */}
        <div className="text-center mt-12">
          <p className="text-wedding-brown/60 font-light italic">{t.faqNote}</p>
        </div>
      </div>
    </section>
  );
}
