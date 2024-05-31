import styled, { css, keyframes } from "styled-components";
import { StyledStandardLink } from "@/SharedStyledComponents";
import {
  lightTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
} from "./Theme";
import {
  StyledButton,
  StyledFlexColumnWrapper,
} from "../SharedStyledComponents";
import { useEffect, useState } from "react";
import { devices } from "@/utils/devices";

const slideIn = keyframes`
0% {transform: translateX(-100%)}
100% {transform: translateX(0)}
`;

const slideOut = keyframes`
100% {transform: translateX(-100%)}
`;

const StyledArticle = styled.article`
  inset: 0;
  background-color: var(--button-background);
  //padding-top: 30%;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  z-index: 2;
  animation: ${({ $isOpen }) =>
      $isOpen
        ? css`
            ${slideIn}
          `
        : css`
            ${slideOut}
          `}
    300ms;
  @media ${devices.laptop} {
    justify-content: flex-start;
    height: 100px;
  }
`;

const StyledLinkWrapper = styled.article`
  display: flex;
  flex-direction: column;
  @media ${devices.laptop} {
    padding-top: 1rem;
    flex-direction: row;
    
    
`;

const StyledLink = styled(StyledStandardLink)`
  color: var(--contrast-text);
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

const StyledThemeButton = styled.button`
  border-style: none;
  background: transparent;
  color: var(--contrast-text);
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

const StyledSummary = styled.summary`
  color: var(--contrast-text);
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

const ThemeWrapper = styled(StyledFlexColumnWrapper)`
  gap: 0.2rem;
  @media ${devices.laptop} {
    flex-direction: row;
    align-self: left;
    width: inherit;
    padding-top: 0;
  }
`;
const ThemeButton = styled(StyledButton)`
  text-align: left;
  color: var(--button-background);
  background-color: var(--contrast-text);
  border: 0 0 1px solid var(--text-on-bright) 0;
  border-radius: 0;
  padding: 0.1rem 0.1rem 0.1rem 0.5rem;
  margin: 0;
  //width: 100%;
  @media ${devices.laptop} {
    //flex-direction: row;
    //justify-content: center;
    padding-top: 0;
    text-align: center;
    font-size: 0.8rem;
  }
`;

export default function Navigation({ handleToggleMenu, isOpen, switchTheme }) {
  const colorSchemes = [
    { title: "what a feeling", name: lightTheme },
    { title: "warm", name: warmTheme },
    { title: "cold", name: coldTheme },
    { title: "neutral", name: neutralTheme },
    { title: "high contrast", name: highContrastTheme },
  ];

  // delay of isOpen-state to give time for animation
  const [delayOpen, setDelayedOpen] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDelayedOpen(isOpen);
    }, 200);
  }, [isOpen]);

  function handleShowThemes() {
    setShowThemes(!showThemes);
  }

  return (
    <>
      {delayOpen && (
        <StyledArticle $isOpen={isOpen}>
          <StyledLinkWrapper>
            <StyledLink onClick={handleToggleMenu} href="/app-manual">
              Manual
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/emotions">
              7 basic emotions
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/">
              add entry
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/emotion-records">
              emotion records
            </StyledLink>
            {/* <details>
            <StyledSummary>colorschemes</StyledSummary>
            <ThemeWrapper>
              {colorSchemes.map(({ title, name }) => (
                <ThemeButton
                  key={title}
                  type="button"
                  onClick={() => {
                    switchTheme(name);
                    handleToggleMenu();
                  }}
                >
                  {title}
                </ThemeButton>
              ))}
            </ThemeWrapper>
          </details> */}
            <StyledThemeButton onClick={handleShowThemes}>
              Colorschemes
            </StyledThemeButton>
          </StyledLinkWrapper>
          {showThemes && (
            <ThemeWrapper>
              {colorSchemes.map(({ title, name }) => (
                <ThemeButton
                  key={title}
                  type="button"
                  onClick={() => {
                    switchTheme(name);
                    handleToggleMenu();
                  }}
                >
                  {title}
                </ThemeButton>
              ))}
            </ThemeWrapper>
          )}
        </StyledArticle>
      )}
    </>
  );
}
