import styled from "styled-components";
import {
  StyledFlexColumnWrapper,
  StyledTitle,
  StyledButton,
} from "@/SharedStyledComponents";
import { useState } from "react";
import {
  lightTheme,
  darkTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
} from "./Theme";
import { breakpoints } from "@/utils/breakpoints";
import Circle from "../public/icons/circle.svg";

const StyledP = styled.p`
  text-align: center;
  padding: 1rem;
`;

const StyledSettingsWrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: var(--section-background);
`;

const StyledColorSchemesButton = styled(StyledButton)`
  border: none;
  width: auto;
`;

const ThemeWrapper = styled(StyledFlexColumnWrapper)`
  background: var(--section-background);
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 0.2rem;
  @media ${breakpoints.mobileLandscape} {
    flex-direction: row;
  }
  @media ${breakpoints.laptop} {
    flex-direction: row;
  }
`;

const StyledCircle = styled(Circle)`
  width: 1.8rem;
  height: 1.8rem;
  background: ${({ $background }) => $background};
  fill: transparent;
  border-radius: 50%;
`;

const ThemeButton = styled(StyledButton)`
  display: flex;
  //justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--main-dark);
  //color: var(--button-background);
  background: transparent;
  //background-color: var(--contrast-text);
  //background: ${({ $background }) => $background};
  //color: ${({ $text }) => $text};
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

export default function Profile({ theme, switchTheme }) {
  const [showThemes, setShowThemes] = useState(false);
  const colorSchemes = [
    {
      title: "light",
      name: lightTheme,
      background: "conic-gradient(#e9e3e3 50%, #030352)",
      text: "#030352",
    },
    {
      title: "dark",
      name: darkTheme,
      background: "conic-gradient(#322e44 50%, #f1eaea)",
      text: "#f1eaea",
    },
    {
      title: "warm",
      name: warmTheme,
      background: "conic-gradient(#fbe050, #fbbd50, #f673a4, #762e72 50%)",
      text: "#762e72",
    },
    {
      title: "cold",
      name: coldTheme,
      background: "conic-gradient(#50cfe2, #9996fa, #0F1555 50%)",
      text: "#0F1555",
    },
    {
      title: "neutral",
      name: neutralTheme,
      background: "conic-gradient(white 50%, black 50%)",
      text: "black",
    },
    {
      title: "high contrast",
      name: highContrastTheme,
      background: "conic-gradient(yellow 50%, black 50%)",
      text: "black",
    },
  ];

  function handleShowThemes() {
    setShowThemes(!showThemes);
  }
  return (
    <StyledFlexColumnWrapper>
      <StyledTitle>Hi user,</StyledTitle>
      <p>this is your profile-page</p>
      <StyledP>Account-name: user@example.com</StyledP>
      <StyledP>
        Make yourself at home and turn on your favorite illumination
      </StyledP>
      <StyledSettingsWrapper>
        <StyledColorSchemesButton onClick={handleShowThemes}>
          Preferred Theme
        </StyledColorSchemesButton>
        {showThemes && (
          <ThemeWrapper>
            {colorSchemes.map(({ title, name, background, text }) => (
              <ThemeButton
                $background={background}
                $text={text}
                key={title}
                type="button"
                onClick={() => {
                  switchTheme(name);
                }}
              >
                <StyledCircle $background={background} />
                {title}
              </ThemeButton>
            ))}
          </ThemeWrapper>
        )}
      </StyledSettingsWrapper>
      <StyledP>You`re choice will be saved but you can always change</StyledP>
    </StyledFlexColumnWrapper>
  );
}
