'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Hur tar jag mig till Sarajevo och när går flygen?",
    answer: "Sarajevo flygplats ligger ett stenkast från Hotel Hills och smidigast är att ta ett direktflyg med Ryanair eller Wizzair från valfri svensk stad. Avgångar finns flera gånger i veckan, men även fre-sön eller fre-mån. Försök gärna att boka i tid för bästa pris."
  },
  {
    question: "Vart bör jag bo i Sarajevo?",
    answer: "Under bröllopsnatten så rekommenderar vi att ni checkar in på Hotel Hills för komplett komfort, men absolut inget måste. Klicka här för mer info."
  },
  {
    question: "Hur tar jag mig runt i Sarajevo?",
    answer: "Taxi är billigt och absolut smidigast pga. trafiken. Spårvagnar och buss finns likaså. Zuti taxi är bäst, därefter crveni taxi. Be om pris innan eller taxameter."
  },
  {
    question: "Klädkod?",
    answer: "Klänning för damer och finbyxor, skjorta och kavaj för herrar. Kostym om möjligt. Vi kommer att ha rosa tema, så vill du göra oss extra glada så spexa gärna till det med rosa outfit eller detaljer, men absolut inget måste."
  },
  {
    question: "Hur funkar det med presenter/gåvor?",
    answer: "Kutym är att man ger brudparet valfri summa i ett kuvert där man skickar med sina skrivna önskningar och det lämnas under kvällen i anvisad box. Detta som en lyckönskning för dess gemensamma framtid."
  },
  {
    question: "Kommer man ha ceremoniell utsmyckning eller corsage?",
    answer: "Ja, vid entrén så kommer varje gäst att få likt en corsage och kutym är att ge en mindre symbolisk summa för utsmyckningen."
  },
  {
    question: "Vad bör jag se och göra i Sarajevo dagarna innan och efter bröllopet?",
    answer: "Sarajevo är en fantastisk stad med dess kulturliv och vi har försökt att sammanfatta det på sida 5, längre ner."
  }
]

const FAQItem = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false)

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
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="pb-8 mt-2">
          <div className="text-wedding-brown/80 leading-relaxed">
            {item.question === "Vart bör jag bo i Sarajevo?" ? (
              <>
                Under bröllopsnatten så rekommenderar vi att ni checkar in på Hotel Hills för komplett komfort, men absolut inget måste.{' '}
                <a 
                  href="#rekommenderade-hotell" 
                  className="text-wedding-pink hover:text-wedding-pink/80 underline font-semibold transition-all duration-200"
                >
                  Klicka här för mer info
                </a>.
              </>
            ) : item.question === "Hur tar jag mig runt i Sarajevo?" ? (
              <>
                Taxi är billigt och absolut smidigast pga. trafiken. Spårvagnar och buss finns likaså. Zuti taxi är bäst, därefter crveni taxi. Be om pris innan eller taxameter.{' '}
                <a 
                  href="#transport" 
                  className="text-wedding-pink hover:text-wedding-pink/80 underline font-semibold transition-all duration-200"
                >
                  Se transportinfo
                </a>.
              </>
            ) : (
              item.answer
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative z-[5] py-20 bg-white text-wedding-dark">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Couple Image */}
        <div className="flex justify-center mb-20">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-wedding-pink/30 shadow-2xl relative">
              <img 
                src="/couple-image-optimized.jpg"
                alt="Ines & Haris"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-wedding-pink/10 rounded-full"></div>
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
              Vanliga Frågor
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </div>
          
          <p className="text-lg md:text-xl text-wedding-brown/70 font-light max-w-2xl mx-auto leading-relaxed mt-8">
            Här hittar du svar på de vanligaste frågorna om vårt bröllop
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
          <p className="text-wedding-brown/60 font-light italic">
            Har du fler frågor? Tveka inte att kontakta oss!
          </p>
        </div>
      </div>
    </section>
  )
}
