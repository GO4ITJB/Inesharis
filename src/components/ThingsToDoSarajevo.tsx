'use client'

import React from 'react'
import { translations, Language } from '@/lib/translations'

interface Attraction {
  id: number
  key: string
  mapUrl?: string
}

interface Restaurant {
  id: number
  key: string
}

interface ShoppingCenter {
  id: number
  name: string
  description: string
  mapUrl: string
}

const attractionsStructure: Attraction[] = [
  {
    id: 1,
    key: "bascarsija",
    mapUrl: "https://maps.google.com/?q=Baščaršija,Sarajevo"
  },
  {
    id: 2,
    key: "sebilj",
    mapUrl: "https://maps.google.com/?q=Sebilj,Baščaršija,Sarajevo"
  },
  {
    id: 3,
    key: "shops",
    mapUrl: "https://maps.google.com/?q=Baščaršija+shops,Sarajevo"
  },
  {
    id: 4,
    key: "mosque",
    mapUrl: "https://maps.google.com/?q=Gazi+Husrev-beg+Mosque,Sarajevo"
  },
  {
    id: 5,
    key: "cathedral",
    mapUrl: "https://maps.google.com/?q=Sacred+Heart+Cathedral,Sarajevo"
  }
]

const restaurantsStructure: Restaurant[] = [
  {
    id: 1,
    key: "zeljo"
  },
  {
    id: 2,
    key: "burek"
  },
  {
    id: 3,
    key: "baklava"
  },
  {
    id: 4,
    key: "badem"
  },
  {
    id: 5,
    key: "coffee"
  }
]

const shoppingCenters: ShoppingCenter[] = [
  {
    id: 1,
    name: "BBI Centar (Aria Centar)",
    description: "Sarajevos största och modernaste köpcentrum med över 130 butiker fördelade på 6 våningar. Här hittar du internationella märken som H&M, Zara, Reserved samt lokala butiker. Centrumet har också restauranger, kaféer och en biograf. Ligger centralt och är lätt att nå med kollektivtrafik.",
    mapUrl: "https://maps.google.com/?q=BBI+Centar,Sarajevo"
  },
  {
    id: 2,
    name: "SCC Sarajevo (Sarajevo City Center)",
    description: "Ett populärt köpcentrum med bra utbud av mode, elektronik och vardagsvaror. Mindre än BBI men fortfarande mycket välutrustat med kända märken och en bra matavdelning. Har även kafé och restauranger. Bra parkeringsmöjligheter och centralt beläget.",
    mapUrl: "https://maps.google.com/?q=SCC+Sarajevo,Sarajevo"
  }
]

interface ThingsToDoSarajevoProps {
  language?: Language
}

export default function ThingsToDoSarajevo({ language = 'sv' }: ThingsToDoSarajevoProps) {
  const t = translations[language]
  
  // Generate attractions data from translations
  const attractions = attractionsStructure.map(item => ({
    id: item.id,
    name: t.attractionsData[item.key as keyof typeof t.attractionsData].name,
    description: t.attractionsData[item.key as keyof typeof t.attractionsData].description,
    mapUrl: item.mapUrl
  }))
  
  // Generate restaurants data from translations  
  const restaurants = restaurantsStructure.map(item => ({
    id: item.id,
    name: t.restaurantsData[item.key as keyof typeof t.restaurantsData].name,
    description: t.restaurantsData[item.key as keyof typeof t.restaurantsData].description
  }))
  return (
    <section id="things-to-do" className="relative z-[5] py-20 bg-wedding-sand text-wedding-dark shadow-lg">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-brown mb-4">
            {t.thingsToDoTitle}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t.thingsToDoDescription}
          </p>
        </div>

        {/* Attractions Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-script text-wedding-brown mb-8 text-center">
            <i className="fas fa-map-marker-alt text-wedding-pink mr-3"></i>
            {t.attractions}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((attraction, index) => (
              <div 
                key={attraction.id} 
                className={`bg-white/80 backdrop-blur-sm border border-wedding-pink/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-wedding-pink/30 ${
                  index === attractions.length - 1 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-wedding-pink text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {attraction.id}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {attraction.name}
                      </h4>
                      {attraction.mapUrl && (
                        <a
                          href={attraction.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-wedding-pink/90 hover:bg-wedding-pink text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ml-3 flex-shrink-0"
                          title={t.openInGoogleMaps}
                        >
                          <i className="fas fa-map-marker-alt text-xs"></i>
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-script text-wedding-brown mb-8 text-center">
            <i className="fas fa-utensils text-wedding-pink mr-3"></i>
            {t.restaurants}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.id} 
                className={`bg-white/80 backdrop-blur-sm border border-wedding-pink/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-wedding-pink/30 ${
                  index === restaurants.length - 1 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-wedding-pink text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {restaurant.id}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {restaurant.name}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {restaurant.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-script text-wedding-brown mb-8 text-center">
            <i className="fas fa-shopping-bag text-wedding-pink mr-3"></i>
            {t.shopping}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shoppingCenters.map((center) => (
              <div key={center.id} className="bg-white/80 backdrop-blur-sm border border-wedding-pink/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-wedding-pink/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-wedding-pink text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {center.id}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {center.name}
                      </h4>
                      <a
                        href={center.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-wedding-pink/90 hover:bg-wedding-pink text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ml-3 flex-shrink-0"
                        title="Öppna i Google Maps"
                      >
                        <i className="fas fa-map-marker-alt text-xs"></i>
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {center.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
