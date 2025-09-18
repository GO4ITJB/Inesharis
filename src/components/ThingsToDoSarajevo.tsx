"use client";

import React, { useState } from "react";
import { translations, Language } from "@/lib/translations";

interface Attraction {
  id: number;
  key: string;
  mapUrl?: string;
}

interface Restaurant {
  id: number;
  key: string;
  mapUrl?: string;
}

interface ShoppingCenter {
  id: number;
  key: string;
  mapUrl: string;
}

const attractionsStructure: Attraction[] = [
  {
    id: 1,
    key: "bascarsija",
    mapUrl: "https://maps.google.com/?q=Baščaršija,Sarajevo",
  },
  {
    id: 2,
    key: "sebilj",
    mapUrl: "https://maps.google.com/?q=Sebilj,Baščaršija,Sarajevo",
  },
  {
    id: 3,
    key: "shops",
    mapUrl: "https://maps.google.com/?q=Baščaršija+shops,Sarajevo",
  },
  {
    id: 4,
    key: "mosque",
    mapUrl: "https://maps.google.com/?q=Gazi+Husrev-beg+Mosque,Sarajevo",
  },
  {
    id: 5,
    key: "cathedral",
    mapUrl: "https://maps.google.com/?q=Sacred+Heart+Cathedral,Sarajevo",
  },
];

const restaurantsStructure: Restaurant[] = [
  {
    id: 1,
    key: "zeljo",
    mapUrl: "https://maps.google.com/?q=Željo+Ćevapi,Sarajevo",
  },
  {
    id: 2,
    key: "burek",
    mapUrl: "https://maps.google.com/?q=Buregdžinica+Bosna,Sarajevo",
  },
  {
    id: 3,
    key: "baklava",
    mapUrl: "https://maps.google.com/?q=Slastičarna+Sarajbosna,Sarajevo",
  },
  {
    id: 4,
    key: "badem",
    mapUrl: "https://maps.google.com/?q=Slastičarna+Badem,Baščaršija,Sarajevo",
  },
  {
    id: 5,
    key: "coffee",
    mapUrl: "https://maps.google.com/?q=Bosnian+coffee+Baščaršija,Sarajevo",
  },
];

const shoppingCentersStructure: ShoppingCenter[] = [
  {
    id: 1,
    key: "alta",
    mapUrl: "https://maps.google.com/?q=Alta+Shopping+Centar,Sarajevo",
  },
  {
    id: 2,
    key: "importanne",
    mapUrl: "https://maps.google.com/?q=Importanne+Shopping+Centar,Sarajevo",
  },
];

interface ThingsToDoSarajevoProps {
  language?: Language;
}

// Accordion Card Component
const AccordionCard = ({
  id,
  name,
  description,
  mapUrl,
  isOpen,
  onToggle,
  openInGoogleMapsText,
}: {
  id: number;
  name: string;
  description: string;
  mapUrl?: string;
  isOpen: boolean;
  onToggle: () => void;
  openInGoogleMapsText: string;
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="w-full p-6 flex-shrink-0">
        <div className="flex items-center justify-center gap-4 md:justify-start">
          <div className="flex-shrink-0 w-8 h-8 bg-wedding-pink text-white rounded-full flex items-center justify-center text-sm font-semibold">
            {id}
          </div>
          <div className="flex-grow md:flex-grow-0 md:flex md:items-center md:justify-between md:w-full">
            <button
              onClick={onToggle}
              className="flex items-center justify-between md:flex-grow focus:outline-none"
            >
              <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
              <i
                className={`fas ${
                  isOpen ? "fa-chevron-up" : "fa-chevron-down"
                } text-wedding-pink text-sm transition-transform duration-300 ml-4 block md:!hidden`}
              ></i>
            </button>
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center justify-center w-8 h-8 bg-wedding-pink hover:bg-wedding-pink/90 text-white rounded-full transition-all duration-300 ml-4"
                title={openInGoogleMapsText}
              >
                <i className="fas fa-map-marker-alt text-xs"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 flex-grow flex flex-col ${
          isOpen
            ? "px-6 pb-6 max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden md:px-6 md:pb-6 md:max-h-none md:opacity-100 md:overflow-visible"
        }`}
      >
        <div className="text-center md:ml-12 md:text-left flex-grow flex flex-col justify-between">
          <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-grow">
            {description}
          </p>
          {mapUrl && (
            <div className="flex-shrink-0">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wedding-pink hover:bg-wedding-pink/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 md:hidden"
                title={openInGoogleMapsText}
              >
                <i className="fas fa-map-marker-alt text-xs"></i>
                <span>{openInGoogleMapsText}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ThingsToDoSarajevo({
  language = "sv",
}: ThingsToDoSarajevoProps) {
  const t = translations[language];

  // State to track which cards are open
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardId: string) => {
    const newOpenCards = new Set(openCards);
    if (newOpenCards.has(cardId)) {
      newOpenCards.delete(cardId);
    } else {
      newOpenCards.add(cardId);
    }
    setOpenCards(newOpenCards);
  };

  // Generate attractions data from translations
  const attractions = attractionsStructure.map((item) => ({
    id: item.id,
    name: t.attractionsData[item.key as keyof typeof t.attractionsData].name,
    description:
      t.attractionsData[item.key as keyof typeof t.attractionsData].description,
    mapUrl: item.mapUrl,
  }));

  // Generate restaurants data from translations
  const restaurants = restaurantsStructure.map((item) => ({
    id: item.id,
    name: t.restaurantsData[item.key as keyof typeof t.restaurantsData].name,
    description:
      t.restaurantsData[item.key as keyof typeof t.restaurantsData].description,
    mapUrl: item.mapUrl,
  }));

  // Generate shopping centers data from translations
  const shoppingCenters = shoppingCentersStructure.map((item) => ({
    id: item.id,
    name: t.attractionsData[item.key as keyof typeof t.attractionsData].name,
    description:
      t.attractionsData[item.key as keyof typeof t.attractionsData].description,
    mapUrl: item.mapUrl,
  }));
  return (
    <section
      id="things-to-do"
      className="relative z-[5] py-20 bg-wedding-sand text-wedding-dark shadow-lg"
    >
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
                className={
                  index === attractions.length - 1 ? "md:col-span-2" : ""
                }
              >
                <AccordionCard
                  id={attraction.id}
                  name={attraction.name}
                  description={attraction.description}
                  mapUrl={attraction.mapUrl}
                  isOpen={openCards.has(`attraction-${attraction.id}`)}
                  onToggle={() => toggleCard(`attraction-${attraction.id}`)}
                  openInGoogleMapsText={t.openInGoogleMaps}
                />
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
                className={
                  index === restaurants.length - 1 ? "md:col-span-2" : ""
                }
              >
                <AccordionCard
                  id={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description}
                  mapUrl={restaurant.mapUrl}
                  isOpen={openCards.has(`restaurant-${restaurant.id}`)}
                  onToggle={() => toggleCard(`restaurant-${restaurant.id}`)}
                  openInGoogleMapsText={t.openInGoogleMaps}
                />
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
              <AccordionCard
                key={center.id}
                id={center.id}
                name={center.name}
                description={center.description}
                mapUrl={center.mapUrl}
                isOpen={openCards.has(`shopping-${center.id}`)}
                onToggle={() => toggleCard(`shopping-${center.id}`)}
                openInGoogleMapsText={t.openInGoogleMaps}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
