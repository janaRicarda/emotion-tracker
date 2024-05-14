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

  background: transparent;
  color: var(--main-dark);
  border-style: none;
  margin: 1rem;
  position: absolute;
  top: 0;
  right: 0;
`;
const StyledCloseButton = styled(Close)`
  width: 2rem;

  fill: var(--text-on-bright);

  color: var(--main-dark);
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
  color: var(--text-on-bright);

  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
`;
const StyledSummary = styled.summary`
  color: var(--text-on-bright);
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

const ThemeWrapper = styled(StyledFlexColumnWrapper)`
  align-items: start;
  justify-content: none;
  gap: 1px;
  border: 1px solid var(--text-on-bright);
`;
const ThemeButton = styled(StyledButton)`
  color: var(--text-on-bright);
  padding: 0.5rem;
  margin: 0.2rem;
  width: inherit;
`;

export default function Navigation({
  handleToggleMenu,
  isOpen,

  switchTheme,
}) {
  return (
    <>
      {isOpen ? (
        <StyledCloseButton type="button" onClick={handleToggleMenu} />
      ) : (
        <StyledMenuButton type="button" onClick={handleToggleMenu} />
      )}

      {isOpen && (
        <StyledArticle>
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
              <ThemeButton
                onClick={() => {
                  switchTheme(lightTheme);
                  handleToggleMenu();
                }}
              >
                what a feeling
              </ThemeButton>
              <ThemeButton
                onClick={() => {
                  switchTheme(warmTheme);
                  handleToggleMenu();
                }}
              >
                warm
              </ThemeButton>
              <ThemeButton
                onClick={() => {
                  switchTheme(coldTheme);
                  handleToggleMenu();
                }}
              >
                cold
              </ThemeButton>
              <ThemeButton
                onClick={() => {
                  switchTheme(neutralTheme);
                  handleToggleMenu();
                }}
              >
                neutral
              </ThemeButton>
              <ThemeButton
                onClick={() => {
                  switchTheme(highContrastTheme);
                  handleToggleMenu();
                }}
              >
                high contrast
              </ThemeButton>
            </ThemeWrapper>
          </details>
        </StyledArticle>
      )}
    </>
  );
}
