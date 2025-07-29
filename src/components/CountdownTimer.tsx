'use client'

import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeLeft {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      
      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))
        const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30)
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ months, days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="flex justify-center items-center space-x-3 sm:space-x-6 md:space-x-8 lg:space-x-16">
          {/* Months */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.months.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              Månader
            </div>
          </div>

          {/* Days */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              Dagar
            </div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              Timmar
            </div>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              Minuter
            </div>
          </div>

          {/* Seconds - Hidden on mobile */}
          <div className="text-center hidden sm:block">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              Sekunder
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
