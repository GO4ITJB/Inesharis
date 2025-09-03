'use client'

import React from 'react'

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
  description: "Historiskt stadshus där vår vigsel kommer att äga rum. En vacker symbol för kärlek och kulturarv.",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sVijecnica!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
  directionsUrl: "https://maps.google.com/?q=Vijecnica,Sarajevo",
  image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npjFpKweuDrWMXOALLOJsbLXni6ZEshC5Jv7H4niKzuDOpA5zYGOpSHpS-Uy4UoojFBi6arGDOzij6JVjY09X4APosAZNy03ZL94JJfogbnh4Rw2iSgpm__I0W4IKjU_02Y2KPT=s294-w294-h220-n-k-no"
}

const recommendedHotels: VenueInfo[] = [
  {
    name: "Hotel Europe Sarajevo",
    address: "Vladislava Skarića 5",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    description: "Centralt precis i stadskärnan. Eleganta boenden i hjärtat av staden.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+Europe+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Hotel+Europe+Sarajevo",
    website: "https://www.hoteleuropegroup.ba/en/europe",
    image: "https://lh3.googleusercontent.com/p/AF1QipNBt8Ff96Huz8Dp5A8jun6-5Kf0pFF-AWq8JtmK=s680-w680-h510-rw"
  },
  {
    name: "Hotel President",
    address: "Bazardžani 1",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    description: "Centralt och bra hotell i stadskärnan. Modern komfort i stadens centrum.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+President+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Hotel+President+Sarajevo",
    website: "https://hotelpresident.ba/",
    image: "https://lh3.googleusercontent.com/p/AF1QipNTKqnNJzDUF8768BG-iEZyUh0utevTeEMgrkpf=s680-w680-h510-rw"
  },
  {
    name: "Courtyard by Marriott Sarajevo",
    address: "Skenderija 43",
    city: "71000 Sarajevo, Bosnia and Herzegovina", 
    description: "5-6 min bilfärd från stadskärnan. Internationell standard med utmärkta bekvämligheter.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sCourtyard+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Courtyard+by+Marriott+Sarajevo",
    website: "https://www.marriott.com/en-us/hotels/sjjcy-courtyard-sarajevo/overview/",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/627563262.jpg?k=dbf4c2e56d82348b632445007a341fcec260a6ebce2bb2e10b0808ee97dfb0a1&o="
  },
  {
    name: "Swissôtel Sarajevo",
    address: "Vrbanja 1",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    description: "7 min från stadskärnan. Lyxhotell med förstklassiga bekvämligheter och service.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sSwissotel+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Swissotel+Sarajevo",
    website: "https://www.swissotel.com/hotels/sarajevo/",
    image: "https://www.swissotel.com/assets/0/92/2119/6442451096/6442451139/6442451141/6442451931/27b70826-6f38-4c86-a57a-34adff38d841.jpg"
  },
  {
    name: "Mövenpick Hotel Sarajevo",
    address: "Trg djece Sarajeva 4",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    description: "Ligger strax efter Swissôtel. Förstklassigt läge med exceptionell service.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sMövenpick+Hotel+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Mövenpick+Hotel+Sarajevo",
    website: "https://all.accor.com/hotel/B1F7/index.en.shtml",
    image: "https://www.ahstatic.com/photos/b1f7_ho_02_p_1024x768.jpg"
  },
  {
    name: "Hotel Hills Sarajevo",
    address: "Butmirska Cesta bb",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    description: "Där bröllopet kommer vara. Ligger 20 min utanför stadskärnan, men bo gärna där under bröllopsnatten.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+Hills+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Hotel+Hills+Sarajevo",
    website: "https://hotelhills.ba/",
    image: "/nocna-hotel-hills-1920x1080-1.jpg"
  },
  {
    name: "Malak Regency",
    address: "Butmirska Cesta 18",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    description: "En bit utanför stan ut mot bröllopet. Bekvämt läge nära bröllopslokalen.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sMalak+Regency!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Malak+Regency+Sarajevo",
    website: "https://www.malakregency.com/",
    image: "https://lh3.googleusercontent.com/p/AF1QipOLWgN4NsEw9ewfkhHqeP28gkr8u16ORXz7JYrR=s680-w680-h510-rw"
  }
]

const taxiCompanies: TaxiCompany[] = [
  {
    name: "Žuti Taxi",
    phone: "+387 33 663 555",
    description: "",
  },
  {
    name: "Crveni Taxi",
    phone: "+387 33 468 728",
    description: "",
  }
]

const VenueCard = ({ venue, isReversed = false }: { venue: VenueInfo; isReversed?: boolean }) => {
  return (
    <div className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative h-full flex flex-col"
         style={{
           background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(254, 245, 242, 0.9))',
           backdropFilter: 'blur(20px)',
           WebkitBackdropFilter: 'blur(20px)',
           border: '1px solid rgba(214, 169, 163, 0.2)',
         }}>
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Venue type badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-wedding-pink/90 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
            {venue.name === "Vijecnica" ? "Vigsellokal" : "Hotell"}
          </span>
        </div>

        {/* Website link button */}
        {venue.website && (
          <div className="absolute top-4 right-4">
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white text-wedding-brown w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <i className="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Hotel Name */}
        <h3 className="text-xl font-semibold text-wedding-brown mb-2 group-hover:text-wedding-pink transition-colors">
          {venue.name}
        </h3>

        {/* Location */}
        <div className="flex items-start text-wedding-brown/70 text-sm mb-3">
          <i className="fas fa-map-marker-alt text-wedding-pink mt-0.5 mr-2 flex-shrink-0"></i>
          <div>
            <div>{venue.address}</div>
            <div className="text-xs opacity-75">{venue.city}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-wedding-brown/80 text-sm leading-relaxed mb-4 flex-grow">
          {venue.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-wedding-sand/50 mt-auto">
          {/* Contact Info */}
          <div className="flex items-center space-x-3">
            {venue.phone && (
              <a
                href={`tel:${venue.phone}`}
                className="text-wedding-pink hover:text-wedding-brown text-sm transition-colors"
                title="Ring hotellet"
              >
                <i className="fas fa-phone text-xs mr-1"></i>
                <span className="sr-only">Phone</span>
              </a>
            )}
            
            <a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wedding-pink hover:text-wedding-brown text-sm transition-colors"
                              title="Få vägbeskrivning"
            >
              <i className="fas fa-directions text-xs mr-1"></i>
              Vägbeskrivning
            </a>
          </div>

          {/* Besök Webbsida */}
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wedding-pink hover:bg-wedding-pink/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              Besök Webbsida
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VenueAccommodations() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = false // Removed framer-motion useInView

  return (
    <section id="venue-accommodations" ref={ref} className="relative z-[5] py-20 bg-wedding-beige text-wedding-brown shadow-lg">


      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        {/* Removed framer-motion motion components */}
        <div 
          className="text-center mb-24"
          // Removed framer-motion motion components
        >
          <div
            className="inline-block mb-8"
            // Removed framer-motion motion components
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mb-6"></div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-brown mb-4">
              Plats & Boende
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </div>
          
          <p 
            className="text-lg md:text-xl text-wedding-brown/70 font-light max-w-2xl mx-auto leading-relaxed"
            // Removed framer-motion motion components
          >
            Allt du behöver veta om vår plats och var du kan bo i vackra Sarajevo.
          </p>
        </div>

        {/* Venue Cards Grid */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-16">
            <div className="w-full lg:w-1/2">
              <VenueCard venue={weddingVenue} />
            </div>
          </div>

          {/* Hotels Section */}
          <div id="rekommenderade-hotell" className="mb-16">
            <h3 className="text-3xl md:text-4xl font-script text-wedding-brown mb-8 text-center">
              Rekommenderade Hotell
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedHotels.map((hotel, index) => (
                <VenueCard key={index} venue={hotel} />
              ))}
            </div>
          </div>
        </div>

        {/* Transportation Section */}
        {/* Removed framer-motion motion components */}
        <div
          className="max-w-4xl mx-auto px-6"
          // Removed framer-motion motion components
        >
          {/* Transportation Header */}
          {/* Removed framer-motion motion components */}
          <div 
            className="text-center mb-16"
            // Removed framer-motion motion components
          >
            <h3 id="transport" className="text-4xl lg:text-5xl font-script text-wedding-brown mb-4">
              Transport
            </h3>
            <div className="w-16 h-px bg-wedding-pink mx-auto mb-6"></div>
            <p className="text-wedding-brown/70 max-w-lg mx-auto">
              Pålitliga transportalternativ för att ta dig till och från vårt firande.
            </p>
          </div>

          {/* Taxi Companies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taxiCompanies.map((taxi, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-wedding-pink/10 text-center"
                // Removed framer-motion motion components
              >
                <div className="text-wedding-pink text-2xl mb-4">
                  <i className="fas fa-taxi"></i>
                </div>
                <h4 className="text-xl font-medium text-wedding-brown mb-2">
                  {taxi.name}
                </h4>
                <p className="text-wedding-brown/60 text-sm mb-4">
                  {taxi.description}
                </p>
                <a
                  href={`tel:${taxi.phone}`}
                  className="inline-block bg-wedding-pink text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-wedding-pink/90 transition-all duration-300"
                >
                  {taxi.phone}
                </a>
              </div>
            ))}
          </div>

          {/* Additional Transportation Info */}
          {/* Removed framer-motion motion components */}
          <div
            className="mt-12 text-center"
            // Removed framer-motion motion components
          >
            <div className="bg-wedding-sand/30 rounded-2xl p-8 border border-wedding-pink/20">
              <h4 className="text-xl font-script text-wedding-brown mb-4">
                Resetips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-car text-wedding-pink mr-3"></i>
                    <span className="font-medium text-wedding-brown">Parkering</span>
                  </div>
                  <p className="text-wedding-brown/70 text-sm">
                    Begränsad parkering nära lokalen. Vi rekommenderar att använda taxi.
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-clock text-wedding-pink mr-3"></i>
                    <span className="font-medium text-wedding-brown">Restid</span>
                  </div>
                  <p className="text-wedding-brown/70 text-sm">
                    Hotell till lokal är ungefär 10-15 minuter med bil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
} 
