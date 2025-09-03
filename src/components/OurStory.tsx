'use client'

import React from 'react'
import { GiPartyPopper } from 'react-icons/gi'

interface TimelineEvent {
  time: string
  event: string
  description?: string
  iconType: 'guests' | 'groom' | 'bride' | 'rasams' | 'dinner' | 'dances'
  symbols?: string[]
}

const weddingSchedule: TimelineEvent[] = [
  {
    time: "",
    event: "VIGSEL",
    description: "14:00-15:00 – Vigsel vid Sarajevo City Hall",
    iconType: "bride"
  },
  {
    time: "",
    event: "FRI TID",
    description: "15:00-18:00 – Fri tid, förberedelse inför kvällen",
    iconType: "guests"
  },
  {
    time: "",
    event: "VÄLKOMNANDE",
    description: "18:00 – Välkomnande till bröllopslokalen – Hotel Hills Sarajevo, första våningen",
    iconType: "groom"
  },
  {
    time: "",
    event: "FEST & FIRANDE",
    description: "18:00-02:00 – Släpp loss med oss och fira in vår dag. Mat, glädje, dans och kärlek!",
    iconType: "dances"
  }
]

const FontAwesomeIcon = ({ type }: { type: string }) => {
  const getIconClass = () => {
    switch (type) {
      case 'guests':
        return 'fas fa-clock'
      case 'groom':
        return 'fas fa-building'
      case 'bride':
        return 'fas fa-heart'
      case 'rasams':
        return 'fas fa-star'
      case 'dinner':
        return 'fas fa-utensils'
      case 'dances':
        return 'fas fa-music'
      default:
        return 'fas fa-circle'
    }
  }

  return (
    <div className="w-12 h-12 bg-wedding-pink/20 rounded-full flex items-center justify-center border-2 border-wedding-pink/30">
      <i className={`${getIconClass()} text-lg text-wedding-pink`}></i>
    </div>
  )
}

const CelebrationDescription = () => {
  return (
    <div className="text-sm leading-relaxed text-wedding-brown/80 font-light">
      18:00-02:00 – Släpp loss med oss <i className="fas fa-champagne-glasses text-wedding-pink mx-1"></i> och fira in vår dag. 
      <i className="fas fa-utensils text-wedding-pink mx-1"></i> Mat, 
      <i className="fas fa-music text-wedding-pink mx-1"></i> musik, 
      <GiPartyPopper className="inline text-wedding-pink mx-1" style={{ fontSize: '1.2rem' }} /> dans och 
      <i className="fas fa-heart text-wedding-pink mx-1"></i> kärlek!
    </div>
  )
}

export default function RunOfShow() {
  return (
    <section id="run-of-show" className="relative z-[5] mt-[100vh] py-20 bg-wedding-sand text-wedding-dark shadow-lg">

      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Couple Image */}
        <div className="flex justify-center mb-24 mt-16">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-wedding-pink/30 shadow-2xl relative">
              <img 
                src="/couple-image-optimized.jpg"
                alt="Ines & Haris"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-wedding-pink/20 rounded-full"></div>
            </div>
            {/* Organic watercolor heart cluster */}
            {/* Large hearts - distributed around entire circumference */}
            <div className="absolute top-4 -left-8 w-12 h-12 opacity-80 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/90 text-lg"></i>
            </div>
            <div className="absolute bottom-4 -right-8 w-10 h-10 opacity-70 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/80 text-base"></i>
            </div>
            <div className="absolute -top-8 right-4 w-8 h-8 opacity-60 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/70 text-sm"></i>
            </div>
            <div className="absolute -bottom-8 left-4 w-9 h-9 opacity-75 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/85 text-sm"></i>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 w-7 h-7 opacity-65 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/75 text-xs"></i>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-8 h-8 opacity-70 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/80 text-sm"></i>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 opacity-60 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/70 text-xs"></i>
            </div>
            <div className="absolute -bottom-4 right-1/2 -translate-x-1/2 w-7 h-7 opacity-65 animate-pulse">
              <i className="fas fa-heart text-wedding-pink/75 text-xs"></i>
            </div>
            
            {/* Medium hearts - distributed around entire circumference */}
            <div className="absolute top-1/4 -left-6 w-6 h-6 opacity-50">
              <i className="fas fa-heart text-wedding-pink/60 text-xs"></i>
            </div>
            <div className="absolute top-3/4 -right-6 w-5 h-5 opacity-45">
              <i className="fas fa-heart text-wedding-pink/55 text-xs"></i>
            </div>
            <div className="absolute -top-6 left-1/4 w-6 h-6 opacity-55">
              <i className="fas fa-heart text-wedding-pink/65 text-xs"></i>
            </div>
            <div className="absolute -bottom-6 right-1/4 w-5 h-5 opacity-40">
              <i className="fas fa-heart text-wedding-pink/50 text-xs"></i>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-7 h-7 opacity-60">
              <i className="fas fa-heart text-wedding-pink/70 text-xs"></i>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-4 h-4 opacity-35">
              <i className="fas fa-heart text-wedding-pink/45 text-xs"></i>
            </div>
            <div className="absolute top-1/3 -left-8 w-5 h-5 opacity-50">
              <i className="fas fa-heart text-wedding-pink/60 text-xs"></i>
            </div>
            <div className="absolute top-2/3 -right-16 w-6 h-6 opacity-55">
              <i className="fas fa-heart text-wedding-pink/65 text-xs"></i>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 opacity-45">
              <i className="fas fa-heart text-wedding-pink/55 text-xs"></i>
            </div>
            <div className="absolute -bottom-3 right-1/2 -translate-x-1/2 w-6 h-6 opacity-50">
              <i className="fas fa-heart text-wedding-pink/60 text-xs"></i>
            </div>
            
            {/* Small hearts */}
            <div className="absolute top-12 left-2 w-3 h-3 opacity-30">
              <i className="fas fa-heart text-wedding-pink/40 text-xs"></i>
            </div>
            <div className="absolute -top-8 right-4 w-4 h-4 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute bottom-4 right-16 w-3 h-3 opacity-35">
              <i className="fas fa-heart text-wedding-pink/45 text-xs"></i>
            </div>
            <div className="absolute top-20 -left-4 w-4 h-4 opacity-20">
              <i className="fas fa-heart text-wedding-pink/30 text-xs"></i>
            </div>
            <div className="absolute -bottom-8 left-6 w-3 h-3 opacity-40">
              <i className="fas fa-heart text-wedding-pink/50 text-xs"></i>
            </div>
            <div className="absolute top-6 right-20 w-4 h-4 opacity-30">
              <i className="fas fa-heart text-wedding-pink/40 text-xs"></i>
            </div>
            <div className="absolute bottom-16 -right-6 w-3 h-3 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute -top-2 left-20 w-4 h-4 opacity-45">
              <i className="fas fa-heart text-wedding-pink/55 text-xs"></i>
            </div>
            <div className="absolute top-14 right-8 w-3 h-3 opacity-35">
              <i className="fas fa-heart text-wedding-pink/45 text-xs"></i>
            </div>
            <div className="absolute bottom-2 -left-12 w-4 h-4 opacity-30">
              <i className="fas fa-heart text-wedding-pink/40 text-xs"></i>
            </div>
            
            {/* Tiny scattered hearts */}
            <div className="absolute top-8 left-10 w-2 h-2 opacity-20">
              <i className="fas fa-heart text-wedding-pink/30 text-xs"></i>
            </div>
            <div className="absolute -top-10 right-16 w-2 h-2 opacity-15">
              <i className="fas fa-heart text-wedding-pink/25 text-xs"></i>
            </div>
            <div className="absolute bottom-10 left-18 w-2 h-2 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute top-18 -right-10 w-2 h-2 opacity-18">
              <i className="fas fa-heart text-wedding-pink/28 text-xs"></i>
            </div>
            <div className="absolute -bottom-10 right-10 w-2 h-2 opacity-22">
              <i className="fas fa-heart text-wedding-pink/32 text-xs"></i>
            </div>
            <div className="absolute top-4 left-14 w-2 h-2 opacity-20">
              <i className="fas fa-heart text-wedding-pink/30 text-xs"></i>
            </div>
            <div className="absolute bottom-14 -left-6 w-2 h-2 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute -top-6 left-12 w-2 h-2 opacity-15">
              <i className="fas fa-heart text-wedding-pink/25 text-xs"></i>
            </div>
            <div className="absolute top-22 right-6 w-2 h-2 opacity-18">
              <i className="fas fa-heart text-wedding-pink/28 text-xs"></i>
            </div>
            <div className="absolute bottom-6 right-22 w-2 h-2 opacity-20">
              <i className="fas fa-heart text-wedding-pink/30 text-xs"></i>
            </div>
            
            {/* Additional scattered hearts */}
            <div className="absolute top-10 left-6 w-3 h-3 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute -top-12 right-8 w-2 h-2 opacity-18">
              <i className="fas fa-heart text-wedding-pink/28 text-xs"></i>
            </div>
            <div className="absolute bottom-12 left-8 w-3 h-3 opacity-30">
              <i className="fas fa-heart text-wedding-pink/40 text-xs"></i>
            </div>
            <div className="absolute top-16 -right-12 w-2 h-2 opacity-22">
              <i className="fas fa-heart text-wedding-pink/32 text-xs"></i>
            </div>
            <div className="absolute -bottom-12 left-4 w-3 h-3 opacity-28">
              <i className="fas fa-heart text-wedding-pink/38 text-xs"></i>
            </div>
            <div className="absolute top-2 right-14 w-2 h-2 opacity-20">
              <i className="fas fa-heart text-wedding-pink/30 text-xs"></i>
            </div>
            <div className="absolute bottom-18 -left-4 w-2 h-2 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute -top-8 left-10 w-3 h-3 opacity-32">
              <i className="fas fa-heart text-wedding-pink/42 text-xs"></i>
            </div>
            <div className="absolute top-24 right-4 w-2 h-2 opacity-16">
              <i className="fas fa-heart text-wedding-pink/26 text-xs"></i>
            </div>
            <div className="absolute bottom-4 right-18 w-3 h-3 opacity-27">
              <i className="fas fa-heart text-wedding-pink/37 text-xs"></i>
            </div>
            <div className="absolute top-6 left-16 w-2 h-2 opacity-23">
              <i className="fas fa-heart text-wedding-pink/33 text-xs"></i>
            </div>
            <div className="absolute -bottom-14 right-14 w-2 h-2 opacity-19">
              <i className="fas fa-heart text-wedding-pink/29 text-xs"></i>
            </div>
            <div className="absolute top-12 -left-10 w-3 h-3 opacity-26">
              <i className="fas fa-heart text-wedding-pink/36 text-xs"></i>
            </div>
            <div className="absolute -top-14 left-6 w-2 h-2 opacity-17">
              <i className="fas fa-heart text-wedding-pink/27 text-xs"></i>
            </div>
            <div className="absolute bottom-20 right-8 w-2 h-2 opacity-21">
              <i className="fas fa-heart text-wedding-pink/31 text-xs"></i>
            </div>
            <div className="absolute top-8 right-24 w-3 h-3 opacity-24">
              <i className="fas fa-heart text-wedding-pink/34 text-xs"></i>
            </div>
            <div className="absolute -bottom-16 left-14 w-2 h-2 opacity-18">
              <i className="fas fa-heart text-wedding-pink/28 text-xs"></i>
            </div>
            <div className="absolute top-20 left-12 w-2 h-2 opacity-22">
              <i className="fas fa-heart text-wedding-pink/32 text-xs"></i>
            </div>
            <div className="absolute -top-4 right-18 w-3 h-3 opacity-29">
              <i className="fas fa-heart text-wedding-pink/39 text-xs"></i>
            </div>
            <div className="absolute bottom-8 left-20 w-2 h-2 opacity-20">
              <i className="fas fa-heart text-wedding-pink/30 text-xs"></i>
            </div>
            
            {/* Additional 10 hearts */}
            <div className="absolute top-1/6 -left-14 w-4 h-4 opacity-45">
              <i className="fas fa-heart text-wedding-pink/55 text-xs"></i>
            </div>
            <div className="absolute top-5/6 -right-14 w-3 h-3 opacity-35">
              <i className="fas fa-heart text-wedding-pink/45 text-xs"></i>
            </div>
            <div className="absolute -top-14 left-1/6 w-5 h-5 opacity-50">
              <i className="fas fa-heart text-wedding-pink/60 text-xs"></i>
            </div>
            <div className="absolute -bottom-14 right-1/6 w-4 h-4 opacity-40">
              <i className="fas fa-heart text-wedding-pink/50 text-xs"></i>
            </div>
            <div className="absolute top-1/3 left-20 w-3 h-3 opacity-30">
              <i className="fas fa-heart text-wedding-pink/40 text-xs"></i>
            </div>
            <div className="absolute top-2/3 -right-20 w-4 h-4 opacity-35">
              <i className="fas fa-heart text-wedding-pink/45 text-xs"></i>
            </div>
            <div className="absolute -top-16 right-1/3 w-3 h-3 opacity-25">
              <i className="fas fa-heart text-wedding-pink/35 text-xs"></i>
            </div>
            <div className="absolute -bottom-16 left-1/3 w-5 h-5 opacity-45">
              <i className="fas fa-heart text-wedding-pink/55 text-xs"></i>
            </div>
            <div className="absolute top-1/4 -left-18 w-4 h-4 opacity-40">
              <i className="fas fa-heart text-wedding-pink/50 text-xs"></i>
            </div>
            <div className="absolute top-3/4 right-18 w-3 h-3 opacity-30">
              <i className="fas fa-heart text-wedding-pink/40 text-xs"></i>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div 
          className="text-center mb-32"
        >
          <div
            className="inline-block mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mb-6"></div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-brown mb-4">
              Program
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </div>
          
          <p 
            className="text-lg md:text-xl text-wedding-brown/70 font-light max-w-2xl mx-auto leading-relaxed mb-4"
          >
            Tidslinje för dagen lördagen 25 juli 2026
          </p>
          
          <div 
            className="text-wedding-pink font-medium text-lg tracking-wider mb-4"
          >
            Lördag 25 juli 2026
          </div>
          
          <div 
            className="text-sm text-wedding-brown/60 font-light max-w-3xl mx-auto leading-relaxed"
          >
            <p className="mb-2">Klänning för damer, finbyxor, skjorta och kavaj för herrar.</p>
            {/* <p>Släpp loss med oss och fira in vår dag. Mat, glädje, dans och kärlek!</p> */}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Desktop: Center vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-wedding-pink h-full"></div>
            
            {/* Mobile: Left vertical line */}
            <div className="md:hidden absolute left-6 w-0.5 bg-wedding-pink h-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {weddingSchedule.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center">
                      {/* Center connecting dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-wedding-pink rounded-full border-4 border-white shadow-lg z-10"></div>
                      
                      {isLeft ? (
                        <>
                          {/* Left side - Event name with icon */}
                          <div className="w-1/2 pr-12 text-right flex items-center justify-end">
                            <div className="mr-6">
                              <div className="text-xl font-semibold tracking-wide text-wedding-brown uppercase mb-2">
                                {event.event}
                              </div>
                              {event.description && (
                                event.event === "FEST & FIRANDE" ? (
                                  <CelebrationDescription />
                                ) : (
                                  <div className="text-sm leading-relaxed text-wedding-brown/80 font-light">
                                    {event.description}
                                  </div>
                                )
                              )}
                            </div>
                            <div className="text-wedding-pink">
                              <FontAwesomeIcon type={event.iconType} />
                            </div>
                          </div>
                          {/* Right side - Empty space */}
                          <div className="w-1/2 pl-12"></div>
                        </>
                      ) : (
                        <>
                          {/* Left side - Empty space */}
                          <div className="w-1/2 pr-12"></div>
                          {/* Right side - Event name with icon */}
                          <div className="w-1/2 pl-12 text-left flex items-center justify-start">
                            <div className="text-wedding-pink mr-6">
                              <FontAwesomeIcon type={event.iconType} />
                            </div>
                            <div>
                              <div className="text-xl font-semibold tracking-wide text-wedding-brown uppercase mb-2">
                                {event.event}
                              </div>
                              {event.description && (
                                event.event === "FEST & FIRANDE" ? (
                                  <CelebrationDescription />
                                ) : (
                                  <div className="text-sm leading-relaxed text-wedding-brown/80 font-light">
                                    {event.description}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile layout - all items aligned left */}
                    <div className="md:hidden flex items-start">
                      {/* Left connecting dot */}
                      <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-wedding-pink rounded-full border-3 border-white shadow-lg z-10 mt-1"></div>
                      
                      {/* Content - always on the right side of the line */}
                      <div className="ml-12 flex-1">
                        <div className="flex items-start gap-4">
                          <div className="text-wedding-pink flex-shrink-0 mt-1">
                            <FontAwesomeIcon type={event.iconType} />
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-semibold tracking-wide text-wedding-brown uppercase mb-2">
                              {event.event}
                            </div>
                            {event.description && (
                              event.event === "FEST & FIRANDE" ? (
                                <CelebrationDescription />
                              ) : (
                                <div className="text-sm leading-relaxed text-wedding-brown/80 font-light">
                                  {event.description}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
