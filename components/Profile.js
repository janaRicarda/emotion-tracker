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

const StyledColorSchemesButton = styled.button`
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

const StyledCircle = styled(Circle)`
  width: 1.8rem;
  height: 1.8rem;
  background: ${({ $background }) => $background};
  fill: transparent;
  border-radius: 50%;
`;

const ThemeButton = styled(StyledButton)`
  display: flex;
  /7justify-content: center;
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
      background: "#f1eaea",
      text: "#030352",
    },
    {
      title: "dark",
      name: darkTheme,
      background: "#443f5d",
      text: "#f1eaea",
    },
    {
      title: "warm",
      name: warmTheme,
      background: "linear-gradient(to bottom left, #fbe050, #fbbd50, #f673a4)",
      text: "#762e72",
    },
    {
      title: "cold",
      name: coldTheme,
      background: "linear-gradient(to bottom left,#50cfe2, #9996fa)",
      text: "#0F1555",
    },
    {
      title: "neutral",
      name: neutralTheme,
      background: "#EFEFEB",
      text: "black",
    },
    {
      title: "high contrast",
      name: highContrastTheme,
      background: "yellow",
      text: "black",
    },
  ];

  function handleShowThemes() {
    setShowThemes(!showThemes);
  }
  return (
    <StyledFlexColumnWrapper>
      <StyledTitle>Hi user</StyledTitle>
      <p>You are logged in as:</p>
      <p>Make yourself at home and turn on your favorite illumination</p>
      <StyledColorSchemesButton onClick={handleShowThemes}>
        color schemes
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
      <p>You`re choice will be saved but you can always change</p>
    </StyledFlexColumnWrapper>
  );
}
