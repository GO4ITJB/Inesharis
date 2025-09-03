'use client'

import React from 'react'

interface Attraction {
  id: number
  name: string
  description: string
  mapUrl?: string
}

interface Restaurant {
  id: number
  name: string
  description: string
}

interface ShoppingCenter {
  id: number
  name: string
  description: string
  mapUrl: string
}

const attractions: Attraction[] = [
  {
    id: 1,
    name: "Bascarsija",
    description: "Den gamla delen av staden där öst möter väst. Delen och historian härstammar från det turkiska kungadömmet som erövrade Bosnien på 1500-talet.",
    mapUrl: "https://maps.google.com/?q=Baščaršija,Sarajevo"
  },
  {
    id: 2,
    name: "Sebilj",
    description: "En av de 300 vattenkranar i trä som finns kvar, byggd 1753 och härstammar från Isak Beg Isakovic som på 1500-talet grundade staden undan kriget under otomanska riket.",
    mapUrl: "https://maps.google.com/?q=Sebilj,Baščaršija,Sarajevo"
  },
  {
    id: 3,
    name: "Småbutikerna i Bascarsija",
    description: "Butiker som bibehållit kunskapen från flera generationer och manuellt formar prylar i koppar och brons med hjälp av hammare och verktyg.",
    mapUrl: "https://maps.google.com/?q=Baščaršija+shops,Sarajevo"
  },
  {
    id: 4,
    name: "Gazi Huzrev Begova",
    description: "En av de mest välkända moskéerna byggd 1531 under otomanska riket. Skapad efter Gazi Huzrev Beg som styrde Sarajevo under 1521-1541 och där han senare begravdes vid sin död 1541. Den första moskén i världen att få el, 1891. Är sedan 2004 en skyddad nationalsymbol.",
    mapUrl: "https://maps.google.com/?q=Gazi+Husrev-beg+Mosque,Sarajevo"
  },
  {
    id: 5,
    name: "Katedrala Srce Isusova",
    description: "Ortodox katedral som ligger mitt i gamla stan och byggdes 1889. Byggd av en ungrare som fick sin inspiration från Notre Damme. Ligger en ärkesbiskop begravd från 1820. Utanför en staty av dåvarande biskop den andre som 1997 besökte Sarajevo efter krigets slut.",
    mapUrl: "https://maps.google.com/?q=Sacred+Heart+Cathedral,Sarajevo"
  },
  {
    id: 6,
    name: "Synagogoa Askinaca",
    description: "Tredje största synagogan i Europa.",
    mapUrl: "https://maps.google.com/?q=Ashkenazi+Synagogue,Sarajevo"
  },
  {
    id: 7,
    name: "Saborna crkva",
    description: "Den största katolska kyrkan i Sarajevo.",
    mapUrl: "https://maps.google.com/?q=Cathedral+Church+of+the+Nativity+of+the+Theotokos,Sarajevo"
  },
  {
    id: 8,
    name: "Sarajevska vijecnica",
    description: "Byggd 1894 under Österrike-Ungern epoken med inspiration hämtad från Kairo. Är idag ett stadshus men var från början ett stadsbibliotek som brändes ner under kriget men har byggts upp.",
    mapUrl: "https://maps.google.com/?q=Sarajevo+City+Hall,Viječnica,Sarajevo"
  },
  {
    id: 9,
    name: "Vijecna vatra",
    description: "Översatt \"evig eld\". Är ett minnesmonument för fritagningen av Sarajevo i andra världskriget, 6 april 1945. Texten är skriven i färgerna av den då jugoslaviska flaggans färger. Elden är konstant på som ett minne för de som fritog staden.",
    mapUrl: "https://maps.google.com/?q=Eternal+Flame,Sarajevo"
  },
  {
    id: 10,
    name: "Zuta tabija",
    description: "Utsiktsplats över staden som är väldigt fin att besöka. Har under historian utkämpats många kamper på platser. Nu en av alla utsiktsplatser över staden. Under ramadan signalerar uppskjutet från kanonen solnedgången och tid för middag.",
    mapUrl: "https://maps.google.com/?q=Yellow+Fortress,Žuta+tabija,Sarajevo"
  },
  {
    id: 11,
    name: "Sarajevska zicara",
    description: "Stadens linbana som öppnades 3 maj 1959 och tog upp till 800 passagerare i timmen från stadskärnan till OS-byn Trebevic på 12 min på 2100 m höjd. Förstördes i kriget men byggdes upp på nytt och invigdes på stadens dag, 6 april 2018.",
    mapUrl: "https://maps.app.goo.gl/1c8xNzwFj6oRbSBR8"
  },
  {
    id: 12,
    name: "Olimpijski muzej",
    description: "I anslutningen olympiska spelens muséeum med minne från spelen i Sarajevo 1984 där Gunde Svan vann sitt första guld. Gå gärna in och se minnena från evenemanget i regionen.",
    mapUrl: "https://maps.google.com/?q=Olympic+Museum,Sarajevo"
  },
  {
    id: 13,
    name: "Latinska cuprija",
    description: "Bron som då i tiden gick till den kroatiska befolkningen. Intill finns ett monument där Gavrilo Princip dödades som blev \"skottet i Sarajevo\" och startade första världskriget.",
    mapUrl: "https://maps.google.com/?q=Latin+Bridge,Sarajevo"
  },
  {
    id: 14,
    name: "Spårvagnarna",
    description: "Finns eldrivna sedan 1895 och var före många andra ex. Wien. Idag något nedgångna, men glöm inte att köpa biljetter innan påstigning.",
    mapUrl: "https://maps.google.com/?q=Sarajevo+Tram,Sarajevo"
  },
  {
    id: 15,
    name: "Gavrilov Princip",
    description: "Platsen där skotten avlossades 1914 ligger vid Latinska bron i Sarajevo, där Museum of Sarajevo 1878–1918 idag berättar om attentatet och tiden under österrikisk-ungerskt styre. Bilen som användes var en öppen Gräf & Stift Double Phaeton, med registreringsnummer A III‑118, körd av Leopold Lojka. Originalbilen finns inte i Sarajevo, utan visas på militärhistoriska museet i Wien. Vid särskilda tillfällen har en replika av bilen visats utanför museet i Sarajevo.",
    mapUrl: "https://maps.google.com/?q=Museum+of+Sarajevo+1878-1918,Gavrilo+Princip,Sarajevo"
  }
]

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Kod Zelje",
    description: "Stans bästa cevapi och som funnits där i alla tider. Av 3 restauranger, välj helst Zeljo 1 eller 2. Be om kajmak till maten."
  },
  {
    id: 2,
    name: "Buregdzinica Bosna",
    description: "Stans bästa burek/pita kända för sin traditionella smaker. Lagras inte utan görs konstant färska gjord i stenugn med brasa. Be om pavlaka om man önskar på."
  },
  {
    id: 3,
    name: "Slasticarna Sarajbosna",
    description: "Ett av de bästa ställena att prova riktig baklava gjord från grunden."
  },
  {
    id: 4,
    name: "Slasticarna Badem",
    description: "Ett av alla bra konditorerier i Bascarsija som rekommenderas av lokalborna."
  },
  {
    id: 5,
    name: "Bosniskt kaffe",
    description: "Sätt er på något av fiken i närheten och beställ \"bosansku kafu\" och ni får avnjuta klassiskt bosniskt kaffe i förhoppningsvis små koppar gjorde i porslin och koppar enligt traditionellt vis. Kaffet sippas då det hamnar på botten och ska inte drickas upp. Leta efter de traditionella låga sofforna i mönstrat tyg."
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

export default function ThingsToDoSarajevo() {
  return (
    <section id="things-to-do" className="relative z-[5] py-20 bg-wedding-sand text-wedding-dark shadow-lg">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-brown mb-4">
            Att göra i Sarajevo
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Sevärdheter i staden som ibland kallas för Europas Jerusalem. Där finns moskéer, kyrkor, katedraler och synagogor sida vid sida.
          </p>
        </div>

        {/* Attractions Section */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-script text-wedding-brown mb-8 text-center">
            <i className="fas fa-map-marker-alt text-wedding-pink mr-3"></i>
            Sevärdheter
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
                          title="Öppna i Google Maps"
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
            Klassiska matställen att testa i Bascarsija
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
            Köpcenter
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
