'use client'

import React from 'react'

interface TimelineEvent {
  time: string
  event: string
  description?: string
  iconType: 'guests' | 'groom' | 'bride' | 'rasams' | 'dinner' | 'dances'
}

const weddingSchedule: TimelineEvent[] = [
  {
    time: "7:00 PM",
    event: "GROOM",
    description: "ARRIVAL",
    iconType: "groom"
  },
  {
    time: "",
    event: "GUESTS",
    description: "ARRIVAL TIME",
    iconType: "guests"
  },
  {
    time: "",
    event: "BRIDE",
    description: "ARRIVAL",
    iconType: "bride"
  },
  {
    time: "",
    event: "RASAMS",
    description: "",
    iconType: "rasams"
  },
  {
    time: "",
    event: "BUFFET",
    description: "DINNER",
    iconType: "dinner"
  },
  {
    time: "",
    event: "DANCES",
    description: "",
    iconType: "dances"
  }
]

const FontAwesomeIcon = ({ type }: { type: string }) => {
  const getIconClass = () => {
    switch (type) {
      case 'guests':
        return 'fas fa-users'
      case 'groom':
        return 'fas fa-user-tie'
      case 'bride':
        return 'fas fa-female'
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

  return <i className={`${getIconClass()} text-xl`}></i>
}

export default function RunOfShow() {
  return (
    <section id="run-of-show" className="relative z-[5] py-20 bg-wedding-sand text-wedding-dark shadow-lg">

      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div 
          className="text-center mb-24"
        >
          <div
            className="inline-block mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mb-6"></div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-dark mb-4">
              Program
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </div>
          
          <p 
            className="text-lg md:text-xl text-wedding-dark/70 font-light max-w-2xl mx-auto leading-relaxed mb-4"
          >
            Här är allt du behöver veta om vår speciella dags program.
          </p>
          
          <div 
            className="text-wedding-pink font-medium text-lg tracking-wider"
          >
            September 21, 2024
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Center vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-wedding-pink h-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {weddingSchedule.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="relative flex items-center"
                  >
                    {/* Center connecting dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-wedding-pink rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    {isLeft ? (
                      <>
                        {/* Left side - Event name with icon */}
                        <div className="w-1/2 pr-8 text-right flex items-center justify-end">
                          <div className="mr-4">
                            <div className="text-sm font-medium tracking-widest text-wedding-dark uppercase">
                              {event.event}
                            </div>
                            {event.description && (
                              <div className="text-xs tracking-wide text-wedding-dark/60 uppercase mt-1">
                                {event.description}
                              </div>
                            )}
                          </div>
                          <div className="text-wedding-pink">
                            <FontAwesomeIcon type={event.iconType} />
                          </div>
                        </div>
                        
                        {/* Right side - Time */}
                        <div className="w-1/2 pl-8">
                          {event.time && (
                            <div className="text-base font-medium text-wedding-dark">
                              {event.time}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left side - Time */}
                        <div className="w-1/2 pr-8 text-right">
                          {event.time && (
                            <div className="text-base font-medium text-wedding-dark">
                              {event.time}
                            </div>
                          )}
                        </div>
                        
                        {/* Right side - Event name with icon */}
                        <div className="w-1/2 pl-8 text-left flex items-center justify-start">
                          <div className="text-wedding-pink mr-4">
                            <FontAwesomeIcon type={event.iconType} />
                          </div>
                          <div>
                            <div className="text-sm font-medium tracking-widest text-wedding-dark uppercase">
                              {event.event}
                            </div>
                            {event.description && (
                              <div className="text-xs tracking-wide text-wedding-dark/60 uppercase mt-1">
                                {event.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
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
