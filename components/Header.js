import styled from "styled-components";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from "../public/logo.svg";
import Menu from "./../public/menu.svg";
import Close from "./../public/close.svg";
import Moon from "../public/moon.svg";
import Sun from "../public/sun.svg";
import { lightTheme, darkTheme } from "../components/Theme";
import { StyledWrapper, StyledStandardLink } from "@/SharedStyledComponents";

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
  height: 110px;
`;

const StyledIconWrapper = styled(StyledWrapper)`
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: auto;
  transform: ${({ $shrink }) => $shrink && "scale(0.7)"};
  transition: transform 700ms ease-in-out;
  z-index: 3;
`;

const StyledLogo = styled(Logo)`
  width: ${({ $shrink }) => ($shrink ? "4rem" : "8rem")};
  height: ${({ $shrink }) => ($shrink ? "4rem" : "8rem")};
  stroke: var(--main-dark);
  transition: all 400ms ease;
`;

export default function Header({
  theme,
  toggleTheme,
  switchTheme,
  isScrollDown,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <StyledHeader $shrink={isScrollDown} $isOpen={isOpen}>
        <StyledStandardLink href="/">
          <StyledLogo $shrink={isScrollDown} />
        </StyledStandardLink>
        <StyledIconWrapper $shrink={isScrollDown}>
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
