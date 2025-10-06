"use client";

export default function InbjudanPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
        
        @font-face {
          font-family: 'Bickham Script Pro';
          src: url('/bickham-script-pro-3-regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        
        body {
          margin: 0;
          padding: 20px;
          font-family: 'Georgia', serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .invitation-container {
          perspective: 1000px;
          width: 100%;
          max-width: 500px;
        }

        .invitation {
          width: 100%;
          background: #f8f6f0;
          padding: 6%;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          position: relative;
          transition: transform 0.3s ease;
          box-sizing: border-box;
        }

        /* Textured paper effect */
        .invitation::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px);
          pointer-events: none;
          opacity: 0.5;
        }

        /* Bevel container */
        .bevel-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 40px;
          box-sizing: border-box;
        }

        /* Outer embossed bevel */
        .bevel-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 5px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.8),
            inset 0 -1px 2px rgba(0, 0, 0, 0.15);
          pointer-events: none;
        }

        /* Inner embossed bevel - 5px inward */
        .bevel-container::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.8),
            inset 0 -1px 2px rgba(0, 0, 0, 0.15);
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #c0c0c0;
        }

        .embossed-text {
          text-shadow: 
            1px 1px 2px rgba(255, 255, 255, 0.9),
            -1px -1px 1px rgba(0, 0, 0, 0.1);
          letter-spacing: 3px;
        }

        .header {
          font-size: 14px;
          text-transform: uppercase;
          margin-bottom: 30px;
          font-weight: normal;
        }

        .names {
          font-size: 75px;
          font-weight: normal;
          margin: 10px 0;
          font-family: 'Bickham Script Pro', 'Garamond', 'Georgia', serif;
          line-height: 1.3;
          letter-spacing: 2px;
          transform: scaleX(0.8);
        }

        .fancy {
          font-family: "Pinyon Script", cursive;
          font-weight: 400;
          font-style: normal;
          text-transform: unset;
          font-size: 20px;
          margin-bottom: unset;
          padding: 5px 0;
        }

        .divider {
          width: 100px;
          height: 2px;
          background: linear-gradient(to right, transparent, #c0c0c0, transparent);
          margin: 10px auto;
          box-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .date {
          font-size: 20px;
          margin: 25px 0;
          font-style: italic;
        }

        .venue {
          font-size: 16px;
          line-height: 1.8;
          margin: 20px 0;
        }

        .footer {
          font-size: 13px;
          margin-top: 35px;
          font-style: italic;
        }

        /* Additional embossed elements */
        .ornament {
          font-size: 24px;
          text-shadow: 
            1px 1px 2px rgba(255, 255, 255, 0.8),
            -1px -1px 1px rgba(0, 0, 0, 0.15);
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          body {
            padding: 15px;
          }

          .bevel-container {
            padding: 40px 30px;
          }

          .names {
            font-size: 60px;
          }

          .header {
            letter-spacing: 2px;
          }

          .venue {
            font-size: 14px;
            line-height: 1.6;
          }

          .divider {
            width: 80px;
          }
        }

        @media (max-width: 400px) {
          .bevel-container {
            padding: 30px 20px;
          }

          .header {
            letter-spacing: 1.5px;
          }

          .venue {
            font-size: 13px;
          }

          .ornament {
            font-size: 20px;
          }
        }
      `}</style>
      
      <div className="invitation-container">
        <div className="invitation">
          <div className="bevel-container">
            <div className="content">
              <div className="ornament">
                <img 
                  src="/badge.svg" 
                  alt="Decorative ornament" 
                  style={{ 
                    width: '150px', 
                    height: 'auto', 
                    filter: 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(1) contrast(1)' 
                  }}
                />
              </div>
              
              <div className="names embossed-text">
                Ines
                &
                Haris
              </div>
              
              <div className="divider"></div>
              
              <div className="header embossed-text fancy">
                "Dobro je kad u životu nekoga voliš, neko te voli."
              </div>
              
              <div className="divider"></div>
              
              <div className="venue embossed-text">
                Kära ni,<br />Det är med glädje och kärlek vi bjuder in er att närvara vid vår vigsel och bröllopsfest.<br />Denna dag markerar början på vårt gemensamma liv och vi skulle bli hedrade att få dela den med er.<br />Vänligen OSA senast 30 april 2026 via <a href="https://inesharis.se" style={{ color: '#c0c0c0', textDecoration: 'underline' }}>inesharis.se</a>
                <div className="divider"></div>
                Dragi naši,<br />Sa radošću i ljubavlju pozivamo vas da prisustvujete našem vjenčanju i svadbenom slavlju.<br />Početak našeg zajedničkog života označavamo ovog dana i bila bi nam čast da ga podijelimo upravo s vama.<br />Molimo vas da potvrdite dolazak najkasnije do 30. aprila 2026. putem <a href="https://inesharis.se" style={{ color: '#c0c0c0', textDecoration: 'underline' }}>inesharis.se</a>
                <div className="divider"></div>
              </div>
              
              <div className="footer embossed-text">
                25. 07. 2026. <br /> Hotel Hills Sarajevo <br /> Butmirska cesta 18
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
