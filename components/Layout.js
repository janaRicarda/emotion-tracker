import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import Loader from "./Loader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorMessage from "./ErrorMessage";
import Tooltip from "./Tooltip";
import { useSession } from "next-auth/react";
import DemoLayout from "./DemoLayout";
import useSWR from "swr";
import {
  lightTheme,
  darkTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
} from "@/components/Theme";

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
  toolTip,
  scrollPosition,
  isScrollDown,
  demoMode,
  handleDemoModeOff,
  emotionEntriesAreLoading,
  errorFetchingEmotionEntries,
  handleTheme,
}) {
  const themes = {
    darkTheme,
    lightTheme,
    warmTheme,
    coldTheme,
    coldTheme,
    neutralTheme,
    highContrastTheme,
  };

  const router = useRouter();

  const { data: session } = useSession();

  const { data: currentUser, isLoading: userDataIsLoading } = useSWR(
    session && `/api/user/${session.user.email}`
  );

  if (session && currentUser)
    handleTheme(themes[currentUser.lastPreferredTheme]);

  // use-effect for setting theme to system preferences if no user logged in
  useEffect(() => {
    if (!session) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const userPrefersDark = mediaQuery.matches;

      if (userPrefersDark) {
        handleTheme(darkTheme);
      } else {
        handleTheme(lightTheme);
      }

      const handleChange = (event) => {
        handleTheme(event.matches ? darkTheme : lightTheme);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  // app-protection
  useEffect(() => {
    if (!demoMode && !session && router.pathname !== "/") router.push("/");
  });

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

  const { slug } = router.query;

  const isAppManual = router.pathname === "/app-manual";
  const isEmotionDetail = router.pathname === "/emotions/[slug]" ? true : false;
  const isEmotionForm = router.pathname === "/create/[slug]" ? true : false;
  const isEdit = router.pathname === "/edit[id]" ? true : false;
  const isLandingPage = router.pathname === "/";

  return (
    <>
      {demoMode && !isLandingPage && (
        <DemoLayout handleDemoModeOff={handleDemoModeOff} />
      )}
      {!isLandingPage && (
        <Header
          isScrollDown={isScrollDown}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      {emotionEntriesAreLoading ||
        (userDataIsLoading && <Loader itemText={"App is loading..."} />) ||
        (errorFetchingEmotionEntries && (
          <ErrorMessage errorMessage={errorFetchingEmotionEntries.message} />
        )) ||
        children}
      {!isLandingPage && <Footer handleDemoModeOff={handleDemoModeOff} />}
      {toolTip && !isLandingPage && (
        <Tooltip toolTip={toolTip} isScrollDown={isScrollDown} />
      )}
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
