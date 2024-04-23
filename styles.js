import { createGlobalStyle } from "styled-components";

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
  --main-bright: #FFFFEB;
  --main-dark: #030352;
}
  body {
    margin: 0;
    padding-top: 130px;
    padding-bottom: 67px;
    background-color: #FFFFEB;
    color: #030352;
    font-family: system-ui;
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
