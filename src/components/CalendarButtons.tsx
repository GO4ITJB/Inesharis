import React from 'react'
import { FaCalendarAlt, FaGoogle, FaWindows, FaApple } from 'react-icons/fa'
import { CalendarEvent, generateGoogleCalendarUrl, generateOutlookUrl, downloadIcsFile } from '../lib/calendarUtils'
import { Language } from '../lib/translations'

interface CalendarButtonsProps {
  events: CalendarEvent[]
  language: Language
  className?: string
}

export default function CalendarButtons({ events, language, className = '' }: CalendarButtonsProps) {
  const getLabels = () => {
    if (language === 'sv') {
      return {
        title: 'Lägg till i kalender',
        google: 'Google Kalender',
        outlook: 'Outlook',
        apple: 'Apple Kalender',
        downloadIcs: 'Ladda ner (.ics)'
      }
    } else {
      return {
        title: 'Dodaj u kalendar',
        google: 'Google Kalendar',
        outlook: 'Outlook',
        apple: 'Apple Kalendar',
        downloadIcs: 'Preuzmi (.ics)'
      }
    }
  }

  const labels = getLabels()

  const handleAppleCalendar = (event: CalendarEvent, index: number) => {
    const filename = `wedding-${event.title.toLowerCase().replace(/\s/g, '-')}-${index + 1}.ics`
    downloadIcsFile(event, filename)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-sage-600 font-medium">
        <FaCalendarAlt className="w-5 h-5" />
        <h3 className="text-lg">{labels.title}</h3>
      </div>
      
      {events.map((event, index) => (
        <div key={index} className="border border-sage-200 rounded-lg p-4 bg-sage-50/30">
          <h4 className="font-medium text-sage-700 mb-3 flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4" />
            {event.title}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Google Calendar */}
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <FaGoogle className="w-4 h-4 mr-2" />
              {labels.google}
            </a>

            {/* Outlook */}
            <a
              href={generateOutlookUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              <FaWindows className="w-4 h-4 mr-2" />
              {labels.outlook}
            </a>

            {/* Apple Calendar (Download .ics) */}
            <button
              onClick={() => handleAppleCalendar(event, index)}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              <FaApple className="w-4 h-4 mr-2" />
              {labels.apple}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}