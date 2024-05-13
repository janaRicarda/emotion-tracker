import { createGlobalStyle } from "styled-components";
import { Manrope } from "next/font/google";
import "react-day-picker/dist/style.css";

const manrope = Manrope({ subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
  margin: 0;
}
:root {
  --main-bright: ${({ theme }) => theme.background};
  --main-dark: ${({ theme }) => theme.text};
 --button-background: ${({ theme }) => theme.buttonBackground};
  --joy: ${({ theme }) => theme.joy};
  --surprise: ${({ theme }) => theme.surprise};
  --fear: ${({ theme }) => theme.fear};
  --sadness: ${({ theme }) => theme.sadness};
  --contempt: ${({ theme }) => theme.contempt};
  --disgust: ${({ theme }) => theme.disgust};
  --anger: ${({ theme }) => theme.anger};
  --box-shadow: -5px -5px 15px 0 #ffffff, 5px 5px 15px 0 #aeaec0, inset -5px -5px 5px 0 #aeaec0, inset 5px 5px 5px 0 #ffffff;
}
  body {
    margin: 0;
    padding: 120px 2rem 75px 2rem;
   
    background-color: var(--main-bright);
    color: var(--main-dark);
    font-family: ${manrope.style.fontFamily}, system-ui;
    line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  }
  img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

// DayPicker className for color-styles; more styles under node-modules/react-day-picker

.rdp {
    --rdp-cell-size: 35px; /* Size of the day cells. */
    --rdp-caption-font-size: 18px; /* Font size for the caption labels. */
    --rdp-accent-color: var(--button-background); /* Accent color for the background of selected days. */
    --rdp-background-color: var(--button-background); /* Background color for the hovered/focused elements. */
    --rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
    --rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */
    --rdp-selected-color: var(--main-bright); /* Color of selected day text */

    // not in use so far
    --rdp-accent-color-dark: #3003e1; /* Accent color for the background of selected days (to use in dark-mode). */
    --rdp-background-color-dark: #180270; /* Background color for the hovered/focused elements (to use in dark-mode). */
    //
    
    margin: 1em;
  }
  
  
`;
