import styled, { css } from "styled-components";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from "../public/logo.svg";
import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";
import { lightTheme, darkTheme } from "../components/Theme";
import { StyledStandardLink } from "@/SharedStyledComponents";
import { Fade as Hamburger } from "hamburger-react";
import Tooltip from "./Tooltip";
import { useRouter } from "next/router";

// used for all transition in this component
const transition = css`
  transition: all 300ms ease;
`;

const StyledToggleTheme = styled.button`
  border-radius: 50%;
  border: 1px solid var(--main-dark);
  background-color: transparent;
  z-index: 3;
  padding: 0.3rem;
  aspect-ratio: 1/1;
`;

const StyledMoon = styled(Moon)`
  fill: var(--main-dark);
`;

const StyledSun = styled(Sun)`
  fill: var(--main-dark);
`;

const StyledMenu = styled.div`
  color: ${({ $iconColor }) => $iconColor};
  z-index: 3;
`;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  height: ${({ $isScrollDown }) => ($isScrollDown ? "70px" : "130px")};
  ${transition}
  transition-property: height;
  justify-content: space-between;
  align-items: center;
  background: var(--main-bright);
  position: fixed;
  padding: 0 1rem;
  top: 0;
  left: 0;
  z-index: ${({ $isOpen }) => ($isOpen ? "3" : "2")};
`;

const PlaceholderHeader = styled.div`
  width: 100vw;
  height: ${({ $isScrollDown }) => ($isScrollDown ? "70px" : "130px")};
  ${transition}
`;

const StyledIconWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: auto;
  z-index: 3;
  transform: ${({ $isScrollDown }) => $isScrollDown && "scale(0.7)"};
  ${transition}
`;

const ToolTipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: ${({ $isScrollDown }) => ($isScrollDown ? "0.7rem" : "1rem")};
  ${transition}
`;

const StyledLogo = styled(Logo)`
  max-width: 8rem;
  max-height: 8rem;
  width: ${({ $isScrollDown }) => ($isScrollDown ? "4rem" : "8rem")};
  height: ${({ $isScrollDown }) => ($isScrollDown ? "4rem" : "8rem")};
  stroke: var(--main-dark);
  ${transition}
`;

export default function Header({
  theme,
  toggleTheme,
  switchTheme,
  isScrollDown,
  toolTip,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { locale, locales } = router;

  function handleChangeLanguage(newLocale) {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  }

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <StyledHeader $isScrollDown={isScrollDown} $isOpen={isOpen}>
        <StyledStandardLink href="/">
          <StyledLogo $isScrollDown={isScrollDown} />
        </StyledStandardLink>
        <div>{locale === "en" ? "Language: English" : "Sprache: Deutsch"}</div>
        {locales.map((locale) => (
          <button key={locale} onClick={() => handleChangeLanguage(locale)}>
            {locale === "en" ? "English" : "Deutsch"}
          </button>
        ))}
        <ToolTipWrapper $isScrollDown={isScrollDown}>
          {toolTip && <Tooltip isScrollDown={isScrollDown} toolTip={toolTip} />}
          <StyledIconWrapper $isScrollDown={isScrollDown}>
            {theme === lightTheme || theme === darkTheme ? (
              <StyledToggleTheme type="button" onClick={toggleTheme}>
                {theme === lightTheme ? <StyledMoon /> : <StyledSun />}
              </StyledToggleTheme>
            ) : null}
            <StyledMenu
              $iconColor={isOpen ? `var(--contrast-text)` : `var(--main-dark)`}
            >
              <Hamburger toggled={isOpen} toggle={setIsOpen} direction="left" />
            </StyledMenu>
          </StyledIconWrapper>
        </ToolTipWrapper>
        <Navigation
          isOpen={isOpen}
          handleToggleMenu={handleToggleMenu}
          switchTheme={switchTheme}
        />
      </StyledHeader>
      <PlaceholderHeader />
    </>
  );
}
