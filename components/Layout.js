import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { emotionData } from "@/lib/db";

const StyledToTopButton = styled(ScrollToTop)`
  // &&& is equal to !important; needed to override ScrollToTop default css
  // note: svg color, width/height is to be specifically defined in component Props

  &&& {
    border-radius: 50%;
    z-index: 1;
    background: ${({ $background }) => $background};
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

export default function Layout({ children, theme, toggleTheme, switchTheme }) {
  // scrollToTop-button changes color only on "/app-manual" route to be same as the manual-list-items
  const [color, setColor] = useState("var(--joy)");
  //const [emotionColor, setEmotionColor] = useState(`var(--${slug})`);

  // for triggering an animation
  const [scrollPosition, setScrollPosition] = useState();

  function listenScrollEvent() {
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
    setColor(colors[index]);
  }

  function getScrollPosition(value) {
    setScrollPosition(value);
  }

  useEffect(() => {
    window.addEventListener(
      "scroll",
      listenScrollEvent,
      getScrollPosition(window.scrollY)
    );
  });

  const router = useRouter();
  //if (!router.query) {
  //return null;
  //}
  const { slug } = router.query;
  //const emotion = emotionData.find((emotion) => emotion.slug === slug);
  //const emotionIndex = emotionData.findIndex(
  // (emotion) => emotion.slug === slug
  //);

  const isAppManual = router.pathname === "/app-manual";
  const isEmotionDetail =
    router.pathname === `/emotions/${slug}` ||
    router.pathname === `/create/${slug}`;

  //const [slug] = emotionData;
  //const slug = emotionData.map(({ slug }) => slug);
  console.log(isEmotionDetail);
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
        $background={
          isAppManual
            ? color
            : isEmotionDetail
            ? `var(--${slug})`
            : "var(--button-background)"
        }
        width="20"
        height="20"
        top={400}
        $animationStart={scrollPosition > 400}
        smooth
      />
    </>
  );
}
