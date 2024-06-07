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
import { breakpoints } from "@/utils/breakpoints";
import { useTranslation } from "next-i18next";

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
  @media ${breakpoints.laptop} {
    justify-content: flex-start;
    height: 100px;
    background-color: var(--section-background-contrast);
  }
`;

const StyledLinkWrapper = styled.article`
  display: flex;
  flex-direction: column;
  @media ${breakpoints.laptop} {
    padding-top: 1rem;
    flex-direction: row;    
`;

const StyledLink = styled(StyledStandardLink)`
  color: var(--contrast-text);
  font-size: 1.4rem;
  padding: 0.8rem;
  font-weight: 500;
  @media ${breakpoints.mobileLandscape} {
    padding: 0.2rem;
  }
  @media ${breakpoints.laptop} {
    padding: 0.8rem;
  }
`;

const StyledColoSchemesButton = styled.button`
  border-style: none;
  background: transparent;
  color: var(--contrast-text);
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  @media ${breakpoints.mobileLandscape} {
    padding: 0.2rem;
  }
  @media ${breakpoints.laptop} {
    padding: 0.8rem;
  }
`;

const ThemeWrapper = styled(StyledFlexColumnWrapper)`
  gap: 0.2rem;
  @media ${breakpoints.mobileLandscape} {
    flex-direction: row;
  }
  @media ${breakpoints.laptop} {
    flex-direction: row;
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
  width: 100%;
  @media ${breakpoints.mobileLandscape} {
    padding: 0 0.5rem;
    width: auto;
    text-align: center;
  }
  @media ${breakpoints.laptop} {
    padding: 0 1rem;
    width: auto;
    text-align: center;
    font-size: 0.8rem;
    color: var(--contrast-text);
    background: var(--section-background-contrast);
    border: 1px solid var(--contrast-text);
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

  const { t: translate } = useTranslation(["navigation"]);

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
              {translate("navigationManual")}
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/emotions">
              {translate("navigationBasicEmotions")}7 basic emotions
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/">
              add entry
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/emotion-records">
              emotion records
            </StyledLink>
            <StyledColoSchemesButton onClick={handleShowThemes}>
              color schemes
            </StyledColoSchemesButton>
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
