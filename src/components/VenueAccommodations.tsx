"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { translations, Language } from "@/lib/translations";

interface VenueInfo {
  name: string;
  address: string;
  city: string;
  descriptionKey: string;
  mapUrl: string;
  directionsUrl: string;
  phone?: string;
  website?: string;
  image: string;
}

interface TaxiCompany {
  name: string;
  phone: string;
  description: string;
}

// Venue data with coordinates for Google Maps
const venues = [
  {
    name: "Vijecnica",
    position: { lat: 43.8591, lng: 18.4339 }, // Plus code: VC5M+MC
    type: "ceremony",
  },
  {
    name: "Hotel Hills",
    position: { lat: 43.8267, lng: 18.3135 }, // Plus code: R8G7+QC
    type: "reception",
  },
  {
    name: "Hotel Europe Sarajevo",
    position: { lat: 43.8583, lng: 18.4274 }, // Plus code: VC5G+8X
    type: "hotel",
  },
  {
    name: "Hotel President",
    position: { lat: 43.858, lng: 18.4305 }, // Plus code: VC5J+83
    type: "hotel",
  },
  {
    name: "Courtyard by Marriott Sarajevo",
    position: { lat: 43.8558, lng: 18.4156 }, // Plus code: VC48+73
    type: "hotel",
  },
  {
    name: "Swissôtel Sarajevo",
    position: { lat: 43.8558, lng: 18.4082 }, // Plus code: VC45+56
    type: "hotel",
  },
  {
    name: "Mövenpick Hotel Sarajevo",
    position: { lat: 43.8575, lng: 18.4196 }, // Plus code: V93Q+4V
    type: "hotel",
  },
  {
    name: "Malak Regency Hotel",
    position: { lat: 43.8231, lng: 18.3086 }, // Plus code: R8F5+7G
    type: "hotel",
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 43.843,
  lng: 18.368,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

const weddingVenue: VenueInfo = {
  name: "Vijecnica",
  address: "Obala Kulina bana bb",
  city: "71000 Sarajevo, Bosnia and Herzegovina",
  descriptionKey: "vijecnica",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sVijecnica!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
  directionsUrl: "https://maps.google.com/?q=Vijecnica,Sarajevo",
  image: "/unnamed.webp",
};

const receptionVenue: VenueInfo = {
  name: "Hotel Hills",
  address: "Butmirska cesta 18",
  city: "71000 Sarajevo, Bosnia and Herzegovina",
  descriptionKey: "hills",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+Hills+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
  directionsUrl: "https://maps.google.com/?q=Hotel+Hills+Sarajevo",
  website: "https://www.hotelhills.ba/",
  image: "/nocna-hotel-hills-1920x1080-1.jpg",
};

const recommendedHotels: VenueInfo[] = [
  {
    name: "Hotel Europe Sarajevo",
    address: "Vladislava Skarića 5",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    descriptionKey: "europe",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+Europe+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Hotel+Europe+Sarajevo",
    website: "https://www.hoteleuropegroup.ba/en/europe",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNBt8Ff96Huz8Dp5A8jun6-5Kf0pFF-AWq8JtmK=s680-w680-h510-rw",
  },
  {
    name: "Hotel President",
    address: "Bazardžani 1",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    descriptionKey: "president",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sHotel+President+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Hotel+President+Sarajevo",
    website: "https://hotelpresident.ba/",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNTKqnNJzDUF8768BG-iEZyUh0utevTeEMgrkpf=s680-w680-h510-rw",
  },
  {
    name: "Courtyard by Marriott Sarajevo",
    address: "Skenderija 43",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    descriptionKey: "courtyard",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sCourtyard+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Courtyard+by+Marriott+Sarajevo",
    website:
      "https://www.marriott.com/en-us/hotels/sjjcy-courtyard-sarajevo/overview/",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/627563262.jpg?k=dbf4c2e56d82348b632445007a341fcec260a6ebce2bb2e10b0808ee97dfb0a1&o=",
  },
  {
    name: "Swissôtel Sarajevo",
    address: "Vrbanja 1",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    descriptionKey: "swissotel",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sSwissotel+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Swissotel+Sarajevo",
    website: "https://www.swissotel.com/hotels/sarajevo/",
    image:
      "https://www.swissotel.com/assets/0/92/2119/6442451096/6442451139/6442451141/6442451931/27b70826-6f38-4c86-a57a-34adff38d841.jpg",
  },
  {
    name: "Mövenpick Hotel Sarajevo",
    address: "Trg djece Sarajeva 4",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    descriptionKey: "movenpick",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sMövenpick+Hotel+Sarajevo!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Mövenpick+Hotel+Sarajevo",
    website: "https://all.accor.com/hotel/B1F7/index.en.shtml",
    image: "https://www.ahstatic.com/photos/b1f7_ho_02_p_1024x768.jpg",
  },
  {
    name: "Malak Regency Hotel",
    address: "Butmirska Cesta 18",
    city: "71000 Sarajevo, Bosnia and Herzegovina",
    descriptionKey: "malak",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.885738659789!2d18.43408361578947!3d43.85907197911688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8f4c1b1a89f%3A0x5c1a9e8f4b5d6e7f!2sMalak+Regency!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus",
    directionsUrl: "https://maps.google.com/?q=Malak+Regency+Sarajevo",
    website: "https://www.malakregency.com/",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipOLWgN4NsEw9ewfkhHqeP28gkr8u16ORXz7JYrR=s680-w680-h510-rw",
  },
];

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
  },
];

const VenueCard = ({
  venue,
  language,
  isReversed = false,
}: {
  venue: VenueInfo;
  language: Language;
  isReversed?: boolean;
}) => {
  const t = translations[language];
  return (
    <div
      className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative h-full flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(254, 245, 242, 0.9))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(214, 169, 163, 0.2)",
      }}
    >
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
            {venue.name === "Vijecnica"
              ? t.ceremonyVenue
              : venue.name === "Hotel Hills"
              ? t.hotelAndWeddingVenue
              : t.hotel}
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
          {
            t.hotelDescriptions[
              venue.descriptionKey as keyof typeof t.hotelDescriptions
            ]
          }
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
              title={t.getDirections}
            >
              <i className="fas fa-directions text-xs mr-1"></i>
              {t.getDirections}
            </a>
          </div>

          {/* Visit Website */}
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wedding-pink hover:bg-wedding-pink/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              {t.viewWebsite}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface VenueAccommodationsProps {
  language?: Language;
}

export default function VenueAccommodations({
  language = "sv",
}: VenueAccommodationsProps) {
  const t = translations[language];
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = false; // Removed framer-motion useInView
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [zoom, setZoom] = useState(13);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyBCd9Wmf8uE3SlvuE1pb4yjWvDE-MrIRbw",
  });

  // Set responsive zoom based on screen size
  React.useEffect(() => {
    const updateZoom = () => {
      setZoom(window.innerWidth >= 768 ? 13 : 11); // 13 for desktop, 11 for mobile
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
  }

  return (
    <section
      id="venue-accommodations"
      ref={ref}
      className="relative z-[5] py-20 bg-wedding-beige text-wedding-brown shadow-lg"
    >
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
              {t.venueTitle}
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-pink to-transparent mx-auto"></div>
          </div>

          <p
            className="text-lg md:text-xl text-wedding-brown/70 font-light max-w-2xl mx-auto leading-relaxed"
            // Removed framer-motion motion components
          >
            {t.venueDescription}
          </p>
        </div>

        {/* Venue Cards Grid */}

        <div className="max-w-6xl mx-auto px-6">
          {/* Venue Cards Grid - Same width as hotel cards */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <VenueCard venue={weddingVenue} language={language} />
              <VenueCard venue={receptionVenue} language={language} />
            </div>
          </div>

          {/* Hotels Section */}
          <div id="rekommenderade-hotell" className="mb-16">
            <h3 className="text-3xl md:text-4xl font-script text-wedding-brown mb-8 text-center">
              {t.recommendedHotels}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedHotels.map((hotel, index) => (
                <VenueCard key={index} venue={hotel} language={language} />
              ))}
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-script text-wedding-brown mb-4">
              {language === "sv"
                ? "Karta över alla platser"
                : "Mapa svih lokacija"}
            </h3>
            <p className="text-wedding-brown/70 max-w-2xl mx-auto">
              {language === "sv"
                ? "Se alla våra rekommenderade hotell, bröllopslokalen och vigselplatsen på samma karta"
                : "Pogledajte sve naše preporučene hotele, svadbene lokacije i ceremonijalno mjesto na mapi"}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-wedding-pink/10">
            <div className="relative w-full h-96 md:h-[400px] rounded-xl overflow-hidden">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={zoom}
                  center={center}
                  options={mapOptions}
                >
                  {venues.map((venue, index) => (
                    <Marker
                      key={index}
                      position={venue.position}
                      onClick={() => setSelectedMarker(venue)}
                      icon={{
                        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" fill="white" stroke="#D6A9A3" stroke-width="3"/>
                            <text x="20" y="26" font-size="16" text-anchor="middle" font-family="Arial, sans-serif">
                              ${
                                venue.type === "ceremony"
                                  ? "💒"
                                  : venue.type === "reception"
                                  ? "🥂"
                                  : "🏨"
                              }
                            </text>
                          </svg>
                        `)}`,
                        scaledSize: new window.google.maps.Size(40, 40),
                        anchor: new window.google.maps.Point(20, 20),
                      }}
                      zIndex={
                        venue.type === "ceremony"
                          ? 3
                          : venue.type === "reception"
                          ? 2
                          : 1
                      }
                    />
                  ))}

                  {selectedMarker && (
                    <InfoWindow
                      position={selectedMarker.position}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div className="p-2 min-w-[200px]">
                        {/* Header row with emoji and title */}
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-2">
                            {selectedMarker.type === "ceremony"
                              ? "💒"
                              : selectedMarker.type === "reception"
                              ? "🥂"
                              : "🏨"}
                          </span>
                          <h3 className="font-semibold text-wedding-brown text-sm">
                            {selectedMarker.name}
                          </h3>
                        </div>

                        {/* Content section */}
                        <div className="mb-1">
                          <p className="text-xs text-wedding-pink font-medium mb-1">
                            {selectedMarker.type === "ceremony"
                              ? language === "sv"
                                ? "Ceremoni"
                                : "Ceremonija"
                              : selectedMarker.type === "reception"
                              ? language === "sv"
                                ? "Bröllopslokal"
                                : "Svadbena proslava"
                              : language === "sv"
                              ? "Hotell"
                              : "Hotel"}
                          </p>

                          {/* Get venue details */}
                          {(() => {
                            let venueDetails = null;
                            if (selectedMarker.name === "Vijecnica") {
                              venueDetails = weddingVenue;
                            } else if (selectedMarker.name === "Hotel Hills") {
                              venueDetails = receptionVenue;
                            } else {
                              // Find in recommendedHotels
                              venueDetails = recommendedHotels.find(
                                (h) => h.name === selectedMarker.name
                              );
                            }

                            return venueDetails ? (
                              <div className="space-y-2">
                                <p className="text-xs text-wedding-brown/80 flex items-center">
                                  <i className="fas fa-map-marker-alt text-wedding-pink mr-1"></i>
                                  {venueDetails.address}
                                </p>
                                <a
                                  href={venueDetails.directionsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-xs bg-wedding-pink hover:bg-wedding-pink/90 text-white px-2 py-1 rounded transition-all duration-300"
                                >
                                  <i className="fas fa-directions text-xs mr-1"></i>
                                  {language === "sv" ? "Väg" : "Upute"}
                                </a>
                              </div>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-full bg-wedding-sand/20">
                  <p className="text-wedding-brown/70">Loading map...</p>
                </div>
              )}
            </div>

            {/* Global styles for InfoWindow close button - moved outside */}
            <style jsx global>{`
              .gm-style-iw-chr {
                height: 24px !important;
              }
            `}</style>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg">💒</span>
                <span className="text-wedding-brown/80">
                  {language === "sv" ? "Vigsel" : "Ceremonija"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🥂</span>
                <span className="text-wedding-brown/80">
                  {language === "sv" ? "Bröllopslokal" : "Svadbena proslava"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏨</span>
                <span className="text-wedding-brown/80">
                  {language === "sv" ? "Hotell" : "Hoteli"}
                </span>
              </div>
              <div className="text-xs text-wedding-brown/60">
                {language === "sv"
                  ? "Klicka på markörer för info"
                  : "Kliknite na markere za info"}
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Section */}
        {/* Removed framer-motion motion components */}
        <div
          className="max-w-4xl mx-auto px-6 mt-20"
          // Removed framer-motion motion components
        >
          {/* Transportation Header */}
          {/* Removed framer-motion motion components */}
          <div
            className="text-center mb-16"
            // Removed framer-motion motion components
          >
            <h3
              id="transport"
              className="text-4xl lg:text-5xl font-script text-wedding-brown mb-4"
            >
              {t.transportation}
            </h3>
            <div className="w-16 h-px bg-wedding-pink mx-auto mb-6"></div>
            <p className="text-wedding-brown/70 max-w-lg mx-auto">
              {t.transportDescription}
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
                {t.travelTips}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-car text-wedding-pink mr-3"></i>
                    <span className="font-medium text-wedding-brown">
                      {t.parking}
                    </span>
                  </div>
                  <div className="text-wedding-brown/70 text-sm">
                    {Array.isArray(t.parkingInfo)
                      ? t.parkingInfo.map((item, idx) => (
                          <div key={idx}>
                            <strong>{item.label}</strong>
                            {item.text}
                          </div>
                        ))
                      : t.parkingInfo}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-clock text-wedding-pink mr-3"></i>
                    <span className="font-medium text-wedding-brown">
                      {t.travelTime}
                    </span>
                  </div>
                  <p className="text-wedding-brown/70 text-sm">
                    {t.travelTimeInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
