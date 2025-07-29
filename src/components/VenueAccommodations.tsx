'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface VenueInfo {
  name: string
  address: string
  city: string
  description: string
  mapUrl: string
  directionsUrl: string
  phone?: string
  website?: string
  image: string
}

interface TaxiCompany {
  name: string
  phone: string
  description: string
}

const weddingVenue: VenueInfo = {
  name: "Vijecnica",
  address: "Obala Kulina bana bb",
  city: "71000 Sarajevo, Bosnia and Herzegovina", 
  description: "Historic city hall where our ceremony will take place. A beautiful symbol of love and heritage.",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sVijecnica!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
  directionsUrl: "https://maps.google.com/?q=Vijecnica,Sarajevo",
  image: "/images/vijecnica.jpg"
}

const recommendedHotel: VenueInfo = {
  name: "Hotel Europe Sarajevo",
  address: "Vladislava Skarića 5",
  city: "71000 Sarajevo, Bosnia and Herzegovina",
  description: "Our recommended hotel for out-of-town guests. Elegant accommodations in the heart of the city.",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+Europe+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
  directionsUrl: "https://maps.google.com/?q=Hotel+Europe+Sarajevo",
  phone: "+387 33 580 400",
  website: "https://hoteleuropesarajevo.com",
  image: "/images/hotel-europe.jpg"
}

const taxiCompanies: TaxiCompany[] = [
  {
    name: "Sarajevo Taxi",
    phone: "+387 33 663 555", 
    description: "Reliable 24/7 taxi service"
  },
  {
    name: "Yellow Taxi",
    phone: "+387 33 663 777",
    description: "Professional drivers, card payment accepted"
  },
  {
    name: "Red Taxi",
    phone: "+387 33 663 888",
    description: "Quick response time, English speaking drivers"
  }
]

const VenueCard = ({ venue, isReversed = false }: { venue: VenueInfo; isReversed?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Map Card */}
      <motion.div
        className="bg-white rounded-3xl shadow-xl overflow-hidden relative"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Google Maps - Larger Height */}
        <motion.div
          className="relative h-[32rem] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            src={venue.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
          
          {/* Gradient overlay for glassmorphism readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
        </motion.div>

        {/* Pink Only Glassmorphism Location Info Card - Overlaid */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-xl rounded-t-3xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(214, 169, 163, 0.9), rgba(214, 169, 163, 0.8))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Header with pin icon */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start space-x-3">
              <div className="mt-1 text-white drop-shadow-lg">
                <i className="fas fa-map-marker-alt text-base"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-script text-white mb-1 drop-shadow-sm">
                  {venue.name}
                </h3>
                <p className="text-xs text-white/90 uppercase tracking-wide font-medium">
                  {venue.name === "Vijecnica" ? "Wedding Venue" : "Recommended Hotel"}
                </p>
              </div>
            </div>
            
            {/* Share/Directions button */}
            <motion.a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              whileHover={{ 
                scale: 1.1,
                background: 'rgba(255, 255, 255, 0.25)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-external-link-alt text-xs text-white"></i>
            </motion.a>
          </div>

          {/* Address */}
          <div className="mb-2">
            <p className="text-white font-medium text-sm leading-tight drop-shadow-sm">
              {venue.address}
            </p>
            <p className="text-white/90 text-xs">
              {venue.city}
            </p>
          </div>

          {/* Description */}
          <p className="text-white/95 text-xs leading-relaxed mb-3">
            {venue.description}
          </p>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <motion.a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-white py-2 px-3 rounded-lg font-medium text-xs tracking-wider transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              whileHover={{
                background: 'rgba(255, 255, 255, 0.3)',
                scale: 1.02
              }}
            >
              Directions
            </motion.a>

            {venue.phone && (
              <motion.a
                href={`tel:${venue.phone}`}
                className="flex-1 text-center text-white py-2 px-2 rounded-lg text-xs font-medium transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
                whileHover={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  scale: 1.02
                }}
              >
                Call
              </motion.a>
            )}

            {venue.website && (
              <motion.a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-white py-2 px-2 rounded-lg text-xs font-medium transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
                whileHover={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  scale: 1.02
                }}
              >
                Website
              </motion.a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function VenueAccommodations() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="venue-accommodations" ref={ref} className="relative z-[5] py-20 bg-wedding-beige text-wedding-dark shadow-lg">


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
              Plats & Boende
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-wedding-dark/70 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Allt du behöver veta om vår plats och var du kan bo i vackra Sarajevo.
          </motion.p>
        </motion.div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 mb-24">
          {/* Wedding Venue */}
          <VenueCard venue={weddingVenue} />
          
          {/* Recommended Hotel */}
          <VenueCard venue={recommendedHotel} />
        </div>

        {/* Transportation Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Transportation Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl lg:text-5xl font-script text-wedding-dark mb-4">
              Getting Around
            </h3>
            <div className="w-16 h-px bg-wedding-pink mx-auto mb-6"></div>
            <p className="text-wedding-dark/70 max-w-lg mx-auto">
              Reliable transportation options to get you to and from our celebration.
            </p>
          </motion.div>

          {/* Taxi Companies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taxiCompanies.map((taxi, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-wedding-pink/10 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-wedding-pink text-2xl mb-4">
                  <i className="fas fa-taxi"></i>
                </div>
                <h4 className="text-xl font-medium text-wedding-dark mb-2">
                  {taxi.name}
                </h4>
                <p className="text-wedding-dark/60 text-sm mb-4">
                  {taxi.description}
                </p>
                <a
                  href={`tel:${taxi.phone}`}
                  className="inline-block bg-wedding-pink text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-wedding-pink/90 transition-all duration-300"
                >
                  {taxi.phone}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Additional Transportation Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-wedding-sand/30 rounded-2xl p-8 border border-wedding-pink/20">
              <h4 className="text-xl font-script text-wedding-dark mb-4">
                Transportation Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-car text-wedding-pink mr-3"></i>
                    <span className="font-medium text-wedding-dark">Parking</span>
                  </div>
                  <p className="text-wedding-dark/70 text-sm">
                    Limited parking available near the venue. We recommend using taxi services.
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-clock text-wedding-pink mr-3"></i>
                    <span className="font-medium text-wedding-dark">Travel Time</span>
                  </div>
                  <p className="text-wedding-dark/70 text-sm">
                    Hotel to venue is approximately 10-15 minutes by car.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Travel Tips */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-wedding-sand/30 rounded-2xl p-8 border border-wedding-pink/20">
            <h4 className="text-xl font-script text-wedding-dark mb-4">
              Travel Tips
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <i className="fas fa-car text-wedding-pink mr-3"></i>
                <div>
                  <span className="font-medium text-wedding-dark">Parking</span>
                  <br />
                  <p className="text-wedding-dark/70 text-sm">
                    Free parking available at all venues
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-clock text-wedding-pink mr-3"></i>
                <div>
                  <span className="font-medium text-wedding-dark">Travel Time</span>
                  <br />
                  <p className="text-wedding-dark/70 text-sm">
                    15 minutes between venues by car
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
