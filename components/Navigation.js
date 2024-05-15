import styled from "styled-components";
import Menu from "./../public/menu.svg";
import Close from "./../public/close.svg";
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

const StyledMenuButton = styled(Menu)`
  width: 3rem;
  fill: var(--main-dark);
  border-style: none;
  margin: 1rem;
  position: absolute;
  top: 0;
  right: 0;
`;
const StyledCloseButton = styled(Close)`
  width: 2rem;

  fill: var(--contrast-text);
  border-style: none;
  margin: 1rem;
  position: absolute;
  top: 0.5rem;
  right: 0;
  z-index: 2;
`;

const StyledArticle = styled.article`
  width: 100vw;
  height: 100vh;
  background-color: var(--button-background);
  padding: 3rem 1rem;
  position: fixed;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(StyledStandardLink)`
  width: 100%;
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
  width: 100%;

  gap: 1px;
  border: 1px solid var(--text-on-bright);
`;
const ThemeButton = styled(StyledButton)`
  text-align: left;
  color: var(--text-on-dark);
  background: var(--submit-button-background);
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid var(--text-on-bright);
  padding: 0;
  padding-left: 0.1rem;
  margin: 0;
  width: 100%;
  &:last-child {
    border-bottom: 0;
  }
`;

export default function Navigation({
  handleToggleMenu,
  isOpen,

  switchTheme,
}) {
  const colorSchemes = [
    { title: "what a feeling", name: lightTheme },
    { title: "warm", name: warmTheme },
    { title: "cold", name: coldTheme },
    { title: "neutral", name: neutralTheme },
    { title: "high contrast", name: highContrastTheme },
  ];

  return (
    <>
      {isOpen ? (
        <StyledCloseButton type="button" onClick={handleToggleMenu} />
      ) : (
        <StyledMenuButton type="button" onClick={handleToggleMenu} />
      )}

      {isOpen && (
        <StyledArticle>
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
          <details>
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
          </details>
        </StyledArticle>
      )}
    </>
  );
}
