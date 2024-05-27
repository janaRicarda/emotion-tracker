import styled, { css } from "styled-components";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from "../public/logo.svg";
import Menu from "./../public/menu.svg";
import Close from "./../public/close.svg";
import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";
import { lightTheme, darkTheme } from "../components/Theme";
import { StyledWrapper, StyledStandardLink } from "@/SharedStyledComponents";
import Tooltip from "./Tooltip";

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

const StyledMenuButton = styled(Menu)`
  width: 2.5rem;
  fill: var(--main-dark);
  border-style: none;
`;
const StyledCloseButton = styled(Close)`
  width: 2.5rem;
  fill: var(--contrast-text);
  border-style: none;
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

const StyledIconWrapper = styled(StyledWrapper)`
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: auto;
  z-index: 3;
`;

const ToolTipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transform: ${({ $isScrollDown }) => $isScrollDown && "scale(0.7)"};
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

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <StyledHeader $isScrollDown={isScrollDown} $isOpen={isOpen}>
        <StyledStandardLink href="/">
          <StyledLogo $isScrollDown={isScrollDown} />
        </StyledStandardLink>
        <ToolTipWrapper $isScrollDown={isScrollDown}>
          {toolTip && <Tooltip toolTip={toolTip} />}
          <StyledIconWrapper $isScrollDown={isScrollDown}>
            {theme === lightTheme || theme === darkTheme ? (
              <StyledToggleTheme type="button" onClick={toggleTheme}>
                {theme === lightTheme ? <StyledMoon /> : <StyledSun />}
              </StyledToggleTheme>
            ) : null}
            {isOpen ? (
              <StyledCloseButton type="button" onClick={handleToggleMenu} />
            ) : (
              <StyledMenuButton type="button" onClick={handleToggleMenu} />
            )}
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
