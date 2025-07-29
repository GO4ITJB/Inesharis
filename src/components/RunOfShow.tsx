'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="run-of-show" ref={ref} className="relative z-[5] py-20 bg-wedding-sand text-wedding-dark shadow-lg">

      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mb-6"></div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-dark mb-4">
              Program
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-wedding-dark/70 font-light max-w-2xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Här är allt du behöver veta om vår speciella dags program.
          </motion.p>
          
          <motion.div 
            className="text-wedding-pink font-medium text-lg tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            September 21, 2024
          </motion.div>
        </motion.div>

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
                  <motion.div
                    key={index}
                    className="relative flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
