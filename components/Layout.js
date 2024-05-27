import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const StyledToTopButton = styled(ScrollToTop)`
  // &&& is equal to !important; needed to override ScrollToTop default css
  // note: svg color, width/height is to be specifically defined in component Props

  &&& {
    border-radius: 50%;
    z-index: 1;
    background-color: ${({ $isAppManual, $color }) =>
      $isAppManual ? $color : "var(--button-background)"};
    color: var(--contrast-text);
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    opacity: ${({ $animationStart }) => ($animationStart ? "1" : "0")};
    transition: all 500ms ease-in-out;
  }
`;

export default function Layout({
  children,
  theme,
  toggleTheme,
  switchTheme,
  toolTip,
}) {
  // scrollToTop-button changes color only on "/app-manual" route to be same as the manual-list-items
  const [color, setColor] = useState("var(--joy)");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  function listenScrollEvent(position) {
    const colors = [
      "var(--joy)",
      "var(--surprise)",
      "var(--fear)",
      "var(--sadness)",
      "var(--contempt)",
      "var(--disgust)",
      "var(--anger)",
    ];
    const index = Math.floor(position / 300) % colors.length;
    setColor(colors[index]);
  }

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent(scrollPosition));
  });

  useEffect(() => {
    function handleScroll() {
      const pageHeight = document.documentElement.offsetHeight;
      const windowHeight = window.innerHeight;

      // stops resizing of elements and prevents resizing-loops when there is not enough space on the page
      const enoughSpace = pageHeight - windowHeight > 400;
      const currentScroll = document.documentElement.scrollTop;

      if (!enoughSpace) {
        setIsScrollDown(false);
        return;
      }
      if (currentScroll < scrollPosition) {
        setIsScrollDown(false);
      } else if (currentScroll > scrollPosition) {
        setIsScrollDown(true);
      }
      setScrollPosition(document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const router = useRouter();

  const isAppManual = router.pathname === "/app-manual";

  return (
    <>
      <Header
        isScrollDown={isScrollDown}
        theme={theme}
        toggleTheme={toggleTheme}
        switchTheme={switchTheme}
        toolTip={toolTip}
      />
      {children}
      <Footer />
      <StyledToTopButton
        $color={color}
        $isAppManual={isAppManual}
        width="20"
        height="20"
        top={400}
        $animationStart={scrollPosition > 400}
        smooth
      />
    </>
  );
}
