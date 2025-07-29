'use client'

import React, { useState, useEffect } from 'react'
import { translations, Language } from '@/lib/translations'

interface CountdownTimerProps {
  targetDate: Date
  language?: Language
}

export default function CountdownTimer({ targetDate, language = 'sv' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const t = translations[language]

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const target = new Date(targetDate)
      
      if (target > now) {
        // Calculate months and days more accurately
        let months = (target.getFullYear() - now.getFullYear()) * 12
        months += (target.getMonth() - now.getMonth())
        
        // Create a date that's 'months' months from now
        const monthsFromNow = new Date(now)
        monthsFromNow.setMonth(monthsFromNow.getMonth() + months)
        
        // If the target date is before this calculated date, reduce months by 1
        if (target < monthsFromNow) {
          months--
          monthsFromNow.setMonth(monthsFromNow.getMonth() - 1)
        }
        
        // Calculate remaining days
        const days = Math.floor((target.getTime() - monthsFromNow.getTime()) / (1000 * 60 * 60 * 24))
        
        // Calculate hours, minutes, seconds for the current day
        const difference = target.getTime() - now.getTime()
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ months, days, hours, minutes, seconds })
      } else {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000) // Update every second

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
              {t.months}
            </div>
          </div>

          {/* Days */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              {t.days}
            </div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              {t.hours}
            </div>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              {t.minutes}
            </div>
          </div>

          {/* Seconds - Hidden on mobile */}
          <div className="text-center hidden sm:block">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-wedding-dark mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-gray-600 font-light">
              {t.seconds}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
