import { createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./components/Theme";

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
}
  body {
    margin: 0;
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
