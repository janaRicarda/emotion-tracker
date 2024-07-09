import { useEffect } from "react";

export default function ForcePortrait({children}) {
    
        useEffect(() => {
          async function lockOrientation() {
            try {
              if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('portrait');
              } else {
                console.warn('Screen Orientation API wird nicht unterstützt.');
              }
            } catch (error) {
              console.error('Fehler beim Sperren der Ausrichtung:', error);
            }
          };
         lockOrientation();
        }, []);

        return(
            <>
            {children}
            </>
        )
    };

    