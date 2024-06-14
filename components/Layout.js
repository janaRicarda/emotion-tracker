import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import Loader from "./Loader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "./ErrorMessage";
import Tooltip from "./Tooltip";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import DemoLayout from "./DemoLayout";
import StartModal from "./Modal";

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

export default function Layout({
  children,
  theme,
  toggleTheme,
  switchTheme,
  toolTip,
  scrollPosition,
  isScrollDown,
  demoMode,
  handleDemoMode,
  handleDemoModeOff,
  emotionEntriesAreLoading,
  errorFetchingEmotionEntries,
}) {
  const { data: session } = useSession();

  // scrollToTop-button changes color only on "/app-manual" route to be same as the manual-list-items
  const [color, setColor] = useState("var(--joy)");

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

  const router = useRouter();

  const { slug } = router.query;

  const { t: translate } = useTranslation("common");

  const isAppManual = router.pathname === "/app-manual";
  const isEmotionDetail = router.pathname === "/emotions/[slug]" ? true : false;
  const isEmotionForm = router.pathname === "/create/[slug]" ? true : false;
  const isEdit = router.pathname === "/edit[id]" ? true : false;

  return (
    <>
      {!session && (
        <StartModal
          demoMode={demoMode}
          handleDemoMode={handleDemoMode}
          handleDemoModeOff={handleDemoModeOff}
        />
      )}
      {demoMode && <DemoLayout />}
      <Header
        isScrollDown={isScrollDown}
        theme={theme}
        toggleTheme={toggleTheme}
        switchTheme={switchTheme}
        demoMode={demoMode}
        handleDemoModeOff={handleDemoModeOff}
      />
      {(emotionEntriesAreLoading && (
        <Loader itemText={translate("appIsLoading")} />
      )) ||
        (errorFetchingEmotionEntries && (
          <ErrorMessage errorMessage={errorFetchingEmotionEntries.message} />
        )) ||
        children}
      <Footer />
      {toolTip && <Tooltip toolTip={toolTip} />}
      <StyledToTopButton
        $background={
          isAppManual
            ? color
            : isEmotionDetail
            ? `var(--${slug})`
            : isEmotionForm
            ? `var(--${slug})`
            : isEdit
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
