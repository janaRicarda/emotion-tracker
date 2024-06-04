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
html {
  overscroll-behavior: none;
}
:root {
  --main-bright: ${({ theme }) => theme.background};
  --main-dark: ${({ theme }) => theme.text};
  --contrast-text: ${({ theme }) => theme.contrastText};
  --contrast-bright: ${({ theme }) => theme.contrastBright};
  --text-on-bright: ${({ theme }) => theme.textOnBright};
  --text-on-dark: ${({ theme }) => theme.textOnDark};
  --button-background: ${({ theme }) => theme.buttonBackground};
  --section-background: ${({ theme }) => theme.sectionBackground};
  --section-background-contrast: ${({ theme }) =>
    theme.sectionBackgroundContrast};
  --green: ${({ theme }) => theme.green};
  --red: ${({ theme }) => theme.red};
  --joy: ${({ theme }) => theme.joy};
  --enabled:  ${({ theme }) => theme.enabled};
  --disabled: ${({ theme }) => theme.disabled};
  --toggle-active: ${({ theme }) => theme.toggleActive};
  --surprise: ${({ theme }) => theme.surprise};
  --fear: ${({ theme }) => theme.fear};
  --sadness: ${({ theme }) => theme.sadness};
  --contempt: ${({ theme }) => theme.contempt};
  --disgust: ${({ theme }) => theme.disgust};
  --anger: ${({ theme }) => theme.anger};
  --manual1: ${({ theme }) => theme.manual1};
  --manual2: ${({ theme }) => theme.manual2};
  --manual3: ${({ theme }) => theme.manual3};
  --manual4: ${({ theme }) => theme.manual4};
  --manual5: ${({ theme }) => theme.manual5};
  --manual6: ${({ theme }) => theme.manual6};
  --manual7: ${({ theme }) => theme.manual7};
  --box-shadow: ${({ theme }) => theme.boxShadow};
  --emotion-border: ${({ theme }) => theme.emotionBorder};
  --circle-border: ${({ theme }) => theme.circleBorder};
  --box-shadow-filter: ${({ theme }) => theme.boxShadowFilter};
  body {
    margin: 0;
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
  margin: 0 15px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
