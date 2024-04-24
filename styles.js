import { createGlobalStyle } from "styled-components";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

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
  --main-bright: #f1eaea;
  --main-dark: #030352;
  --box-shadow: -5px -5px 30px 0 #ffffff, 5px 5px 15px 0 #aeaec0,
  inset -5px -5px 5px 0 #aeaec0, 5px 5px 5px 0 #ffffff;
}
  body {
    margin: 0;
    padding: 120px 2rem 75px 2rem;
   
    background-color: var(--main-bright);
    color: var(--main-dark);
    font-family: ${raleway.style.fontFamily};
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
//#ffffeb;
