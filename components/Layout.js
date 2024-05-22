import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const StyledToTopButton = styled(ScrollToTop)`
  // &&& is equal to !important; needed to override ScrollToTop default css
  // note: svg color width/height is to be specifically named in component Props

  &&& {
    z-index: 1;
    background-color: ${({ $isAppManual, $itemColor }) =>
      $isAppManual ? $itemColor : "var(--button-background)"};
    color: var(--contrast-text);
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background-color 500ms ease-in-out;
  }
`;

export default function Layout({ children, theme, toggleTheme, switchTheme }) {
  const [itemColor, setItemColor] = useState("var(--joy)");

  function listenSrollEvent() {
    const colors = [
      "var(--joy)",
      "var(--surprise)",
      "var(--fear)",
      "var(--sadness)",
      "var(--contempt)",
      "var(--disgust)",
      "var(--anger)",
    ];
    const index = Math.floor(window.scrollY / 300) % colors.length;
    setItemColor(colors[index]);
  }

  useEffect(() => {
    window.addEventListener("scroll", listenSrollEvent);
  });

  const router = useRouter();

  const isAppManual = router.pathname === "/app-manual";

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        switchTheme={switchTheme}
      />
      {children}
      <Footer />
      <StyledToTopButton
        $itemColor={itemColor}
        $isAppManual={isAppManual}
        width="20"
        height="20"
        top={200}
        smooth
      />
    </>
  );
}
