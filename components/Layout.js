import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import styled from "styled-components";

const StyledToTopButton = styled(ScrollToTop)`
  // &&& is equal to !important; needed to override ScrollToTop default css
  &&& {
    z-index: 1;
    background-color: var(--button-background);
    color: var(--contrast-text);
    left: 10px;
  }
`;

export default function Layout({ children, theme, toggleTheme, switchTheme }) {
  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        switchTheme={switchTheme}
      />
      {children}
      <Footer />
      <StyledToTopButton top={200} smooth />
    </>
  );
}
