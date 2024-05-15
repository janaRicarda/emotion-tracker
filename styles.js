import { createGlobalStyle } from "styled-components";
import { Manrope } from "next/font/google";

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
  --contrast-text: ${({ theme }) => theme.contrastText};
  --text-on-bright: ${({ theme }) => theme.textOnBright};
  --text-on-dark: ${({ theme }) => theme.textOnDark};
 --button-background: ${({ theme }) => theme.buttonBackground};
 --submit-button-background:  ${({ theme }) => theme.submitButtonBackground};
 --section-background: ${({ theme }) => theme.sectionBackground};
 --green: ${({ theme }) => theme.green};
 --red: ${({ theme }) => theme.red};
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
    padding: 80px 2rem 75px 2rem;
   
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

`;
