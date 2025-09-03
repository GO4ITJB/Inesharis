'use client'

import React, { useEffect, useRef, useState } from 'react'

const AnimatedTravelSchedule = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeItems, setActiveItems] = useState(new Set<number>())

  // Wedding journey data adapted from travel theme
  const journeyData = [
    {
      id: 1,
      coordinates: "October 7, 2017",
      location: "First Meeting",
      date: "When Our Eyes First Met",
      image: "https://kaatdm.com/sites/default/files/styles/text_media_desktop_large/public/uploads/images/Brecht%20%26%20Lisa%20-%20065.webp?itok=ICjyUf9O",
      alt: "Couple meeting for the first time",
      pathData: "M622 1C619 7 611.1 19.2 603.5 20C595.9 20.8 588.667 29 586 33C582 33 573.1 33 569.5 33C565 33 566.5 22.5 554 33C541.5 43.5 518 44 505 42.5C492 41 489.5 47 493 50.5C496.5 54 516 50.5 510.5 55C505 59.5 500 67.5 493 66C486 64.5 434 57 429.5 66C425 75 389 103 379.5 95C370 87 355.593 95 350.547 95C339.569 95 345 101.5 345 109C345 110.446 405 129.5 364.5 138.5C336 129.5 329.776 174.752 313.5 180C303.5 187 292.136 173.744 273 180C251.266 187.105 224.398 180.013 204 187C190.731 191.545 198.084 198.791 186.5 203C174.967 207.191 156.489 199.365 147.5 203C126.28 211.582 128.368 222.602 129.5 226C110 248 72.223 257.5 69.954 257.5C60.954 257.5 19.954 267.5 24.454 278.5C28.954 289.5 81.5004 299.5 81.5004 310.5C81.5004 321.5 78.954 327.5 69.954 326C62.7539 324.8 42.2872 325.5 32.9539 326C25.7872 322.333 27.0472 321.5 14.0005 326C5.96367 328.772 -3.04608 329.5 2.45392 333C6.85392 335.8 18.954 338.167 24.454 339C30.1207 339.333 42.4541 340.7 46.4541 343.5C51.4541 347 78.9539 361.5 69.954 365.5C60.9541 369.5 46.4541 379 46.4541 383C46.4541 386.2 46.4541 395.333 46.4541 399.5",
      viewBox: "0 0 623 400",
      itemClass: "c-schedule__item--repeating-2"
    },
    {
      id: 2,
      coordinates: "July 7, 2018",
      location: "Adventures Together",
      date: "Fishing & Finding Forever",
      image: "https://kaatdm.com/sites/default/files/styles/text_media_desktop_large/public/uploads/images/Brecht%20%26%20Lisa%20-%20065.webp?itok=ICjyUf9O",
      alt: "Couple fishing together",
      pathData: "M1 1C6.5 2.5 18 6.3 20 9.5C22.5 13.5 13 24 20 28.5C25.6 32.1 33.6667 31.6667 37 31C41.3333 32.6667 50 36.7 50 39.5C50 43 51 50 55.5 54C60 58 71 56 77 57C83 58 89.5 58.5 91 62C92.5 65.5 85.5 77.5 91 88.5C96.5 99.5 116 97.5 125 102C132.2 105.6 143 103.5 147.5 102C155.167 104.667 169.8 111 167 115C163.5 120 156 126 159 130.5C162 135 167 139 173.5 137C180 135 198.5 130.5 206 130.5C213.5 130.5 230.5 132.5 235.5 137C240.5 141.5 253.5 147.5 266 144.5C278.5 141.5 329.5 157 329 164C328.5 171 319.5 166.5 319 169.5C318.5 172.5 326.5 173 332 174.5C337.5 176 342 174.5 350 174.5C358 174.5 352.852 185 358 185C428.5 185 415.933 189.833 410.1 192C406.1 194.5 415.7 197.5 424.1 197.5C434.6 197.5 542.5 206 546 214.5C548.8 221.3 562.5 218.5 562.5 227.5L558.5 236C548.5 245 652.015 250 660.5 250C666 250 682 241.5 679 258C679.5 261 682.8 266.9 692 266.5C701.167 266.833 720.4 268.5 724 272.5C728.5 277.5 734 284 743 282.5C752 281 768.5 285.5 768.5 320",
      viewBox: "0 0 769 320",
      itemClass: "c-schedule__item--repeating mt-[-8rem]"
    },
    {
      id: 3,
      coordinates: "December 21, 2019",
      location: "Faith Together",
      date: "Proclaiming Our Love for the Lord",
      image: "https://kaatdm.com/sites/default/files/styles/text_media_desktop_large/public/uploads/images/Brecht%20%26%20Lisa%20-%20065.webp?itok=ICjyUf9O",
      alt: "Couple in spiritual moment",
      pathData: "M622 1C619 7 611.1 19.2 603.5 20C595.9 20.8 588.667 29 586 33C582 33 573.1 33 569.5 33C565 33 566.5 22.5 554 33C541.5 43.5 518 44 505 42.5C492 41 489.5 47 493 50.5C496.5 54 516 50.5 510.5 55C505 59.5 500 67.5 493 66C486 64.5 434 57 429.5 66C425 75 389 103 379.5 95C370 87 355.593 95 350.547 95C339.569 95 345 101.5 345 109C345 110.446 405 129.5 364.5 138.5C336 129.5 329.776 174.752 313.5 180C303.5 187 292.136 173.744 273 180C251.266 187.105 224.398 180.013 204 187C190.731 191.545 198.084 198.791 186.5 203C174.967 207.191 156.489 199.365 147.5 203C126.28 211.582 128.368 222.602 129.5 226C110 248 72.223 257.5 69.954 257.5C60.954 257.5 19.954 267.5 24.454 278.5C28.954 289.5 81.5004 299.5 81.5004 310.5C81.5004 321.5 78.954 327.5 69.954 326C62.7539 324.8 42.2872 325.5 32.9539 326C25.7872 322.333 27.0472 321.5 14.0005 326C5.96367 328.772 -3.04608 329.5 2.45392 333C6.85392 335.8 18.954 338.167 24.454 339C30.1207 339.333 42.4541 340.7 46.4541 343.5C51.4541 347 78.9539 361.5 69.954 365.5C60.9541 369.5 46.4541 379 46.4541 383C46.4541 386.2 46.4541 395.333 46.4541 399.5",
      viewBox: "0 0 623 400",
      itemClass: "c-schedule__item--last-2 mt-[-8rem]"
    },
    {
      id: 4,
      coordinates: "January 24, 2023",
      location: "Engaged!",
      date: "The Proposal - Forever Begins",
      image: "https://kaatdm.com/sites/default/files/styles/text_media_desktop/public/uploads/images/Jens%20%26%20Margot%20-%201692%20-%20by%20Kaat%20DM.webp?itok=dlVDOgng",
      alt: "Couple engaged in beautiful landscape",
      pathData: "M1.50001 1C1.16668 8.16667 3.80001 22.9 17 24.5C33.5 26.5 72 18.5 84 30C96 41.5 126.5 47.5 136.5 44.5C146.5 41.5 156 34.5 163 44.5C170 54.5 182 75.5 163 80C144 84.5 117 111 131 113.5C145 116 148 104.5 160 109C172 113.5 188 107.5 194.5 113.5C201 119.5 210.5 129.5 194.5 130.5C178.5 131.5 149.5 152 147.5 162.5C145.5 173 173.5 171.5 179.5 180.5C185.5 189.5 194.5 207 194.5 216C194.5 223.2 194.5 237 194.5 243",
      viewBox: "0 0 204 243",
      itemClass: "c-schedule__item--last mt-[-8rem]"
    }
  ]

  const finalText = {
    title: "And now, our greatest adventure begins... September 21, 2024!"
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const items = containerRef.current.querySelectorAll('[data-schedule-item]')
      const windowHeight = window.innerHeight
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        
        const startTrigger = windowHeight * 0.5
        const endTrigger = windowHeight * 0.5
        
        const shouldBeActive = rect.top <= startTrigger && rect.bottom >= endTrigger
        
        if (shouldBeActive) {
          setActiveItems(prev => new Set(Array.from(prev).concat(index)))
        } else {
          setActiveItems(prev => {
            const newSet = new Set(Array.from(prev))
            newSet.delete(index)
            return newSet
          })
        }

        const pathElement = item.querySelector('[data-schedule-path]') as SVGPathElement
        if (pathElement) {
          const progress = Math.max(0, Math.min(1, 
            (startTrigger - rect.top) / (rect.bottom - rect.top)
          ))
          
          const totalLength = pathElement.getTotalLength()
          const drawnLength = totalLength * progress
          
          pathElement.style.strokeDasharray = `${drawnLength}px, ${totalLength}px`
          pathElement.style.strokeDashoffset = '0px'
        }
      })
    }

    const initializePaths = () => {
      const paths = containerRef.current?.querySelectorAll('[data-schedule-path]')
      paths?.forEach(path => {
        const svgPath = path as SVGPathElement
        const totalLength = svgPath.getTotalLength()
        svgPath.style.strokeDasharray = `0px, ${totalLength}px`
        svgPath.style.strokeDashoffset = '0px'
      })
    }

    initializePaths()
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="our-story" className="relative z-[5] mt-[100vh] py-24 bg-warm-background overflow-hidden shadow-lg px-8">
      <div className="max-w-6xl mx-auto py-16" ref={containerRef}>
        
        {/* Schedule Component */}
        <div className="c-schedule text-center" data-schedule="">
          
          {/* Title */}
          <div className="c-schedule__title mb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-script text-wedding-dark font-light mb-8">
              Vår Kärlekshistoria
            </h2>
            <p className="text-lg md:text-xl text-wedding-dark/70 font-light max-w-2xl mx-auto leading-relaxed">
              Varje kärlekshistoria är vacker, men vår känns som en saga. Här är stunderna som ledde oss till för alltid.
            </p>
          </div>
          
          {/* Schedule Items */}
          <div className="c-schedule__items flex flex-col gap-24">
            
            {journeyData.map((item, index) => (
              <div key={item.id} className={`c-schedule__item ${item.itemClass}`}>
                
                <div data-schedule-item="">
                                     <div className={`paragraph pg-schedule-item pg--view-mode--default flex flex-col items-center md:gap-12 justify-around
                    ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}
                    ${activeItems.has(index) ? 'is-active' : ''}
                    `} data-schedule-content="">
                    
                    {/* Content */}
                                         <div className={`pg-schedule-item__content text-center mb-4 md:mb-0 ${index % 2 === 0 ? 'md:text-center' : 'md:text-center'}`}>
                      <div className="h-margin-children-none">
                        <h2 className="pg-schedule-item__coordinates text-sm md:text-base font-light text-wedding-pink mb-2">
                          {item.coordinates}
                        </h2>
                        <h3 className="pg-schedule-item__location text-2xl md:text-4xl font-script text-wedding-dark font-light my-2">
                          {item.location}
                        </h3>
                      </div>
                      <div className="pg-schedule-item__date text-xl md:text-2xl font-script text-wedding-dark font-light">
                        {item.date}
                      </div>
                    </div>

                    {/* Media */}
                    <div className="pg-schedule-item__media w-full max-w-md mt-6 md:mt-0 md:flex-1">
                      <div className="field field--name-field-media-single field--type-entity-reference field--label-hidden field__item">
                        <article className="media media--type-image media--view-mode-text-media">
                          <div className="field field--name-field-media-image field--type-image field--label-visually_hidden">
                            <div className="field__item">
                              <picture>
                                <img 
                                  loading="eager" 
                                  width="450" 
                                  height="400" 
                                  src={item.image}
                                  alt={item.alt}
                                  className="w-full h-auto block"
                                />
                              </picture>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>

                  </div>
                </div>

                {/* SVG Path */}
                <div className="c-schedule__item__svg c-schedule__item__svg--last mt-[-2rem]" data-schedule-item="">
                  <svg 
                    width={item.viewBox.split(' ')[2]} 
                    height={item.viewBox.split(' ')[3]} 
                    viewBox={item.viewBox} 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    preserveAspectRatio="xMidYMid meet"
                    className="block max-w-full h-auto mx-auto"
                  >
                    {/* Background placeholder path */}
                    <path 
                      className="c-schedule__svg-placeholder" 
                      d={item.pathData} 
                      stroke="#D6A9A3" 
                      strokeDasharray="5 5" 
                      vectorEffect="non-scaling-stroke"
                      fill="none"
                      opacity="0.2"
                    />
                    
                    {/* Mask definition */}
                    <defs>
                      <mask id={`pathMask_${item.id}`}>
                        <path 
                          data-schedule-path 
                          d={item.pathData} 
                          stroke="#ffffff" 
                          strokeWidth="2" 
                          vectorEffect="non-scaling-stroke"
                          fill="none"
                        />
                      </mask>
                    </defs>
                    
                    {/* Masked path group */}
                    <g mask={`url(#pathMask_${item.id})`}>
                      <path 
                        d={item.pathData} 
                        stroke="#D6A9A3" 
                        strokeDasharray="5 5" 
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            ))}

            {/* Final Text */}
            <div data-schedule-item="">
              <div className={`
                c-schedule__text max-w-3xl mx-auto mt-[-2rem]
                ${activeItems.has(journeyData.length) ? 'is-active' : ''}
              `} data-schedule-content="">
                <h3 className="text-xl md:text-2xl font-script text-wedding-dark font-light leading-relaxed">
                  {finalText.title}
                </h3>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedTravelSchedule

