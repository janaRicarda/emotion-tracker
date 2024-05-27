import styled from "styled-components";
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

const StyledArticle = styled.article`
  inset: 0;
  background-color: var(--button-background);
  padding: 3rem 1rem;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
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
  gap: 1px;
  border: 1px solid var(--text-on-bright);
`;
const ThemeButton = styled(StyledButton)`
  text-align: left;
  color: var(--text-on-dark);
  background: var(--text-on-bright);
  border: 0 0 1px solid var(--text-on-bright) 0;
  border-radius: 0;
  padding: 0;
  padding-left: 0.1rem;
  margin: 0;
  width: 100%;
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
          <StyledLink
            onClick={handleToggleMenu}
            loading={() => <loader />}
            href="/emotion-records"
          >
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
