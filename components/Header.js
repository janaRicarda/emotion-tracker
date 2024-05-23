import styled from "styled-components";
import Navigation from "./Navigation";
import { useEffect, useState, useRef, useLayoutEffect, use } from "react";
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
  /* height: 100px; */
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main-bright);
  flex: flex-start;
  position: sticky;
  top: 0;
  left: 0;
  z-index: ${({ $isOpen }) => ($isOpen ? "3" : "1")};
`;

const StyledIconWrapper = styled(StyledWrapper)`
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: auto;
`;

const StyledLogo = styled(Logo)`
  width: ${({ $shrink }) => ($shrink ? "5rem" : "9rem")};
  height: ${({ $shrink }) => ($shrink ? "5rem" : "9rem")};
  stroke: var(--main-dark);
  transition: 300ms ease-in-out;
`;

export default function Header({ theme, toggleTheme, switchTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState();
  // const [scrollDirection, setScrollDirection] = useState();

  // const ref = useRef();

  // console.log(ref.current);

  // function getScrollPosition(newScrollPosition) {
  //   if (newScrollPosition > scrollPosition) setScrollDirection(true);
  //   if (newScrollPosition < scrollPosition) setScrollDirection(false);
  //   if ((newScrollPosition = scrollPosition)) setScrollDirection("test");
  // }

  // useEffect(() => {
  //   // setScrollPosition(window.scrollY);
  //   window.addEventListener("scroll", setScrollPosition(window.scrollY));
  // });

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  // useEffect(() => console.log(window.scrollY));

  // console.log(scrollPosition);

  return (
    <StyledHeader $isOpen={isOpen}>
      <StyledStandardLink href="/">
        <StyledLogo />
      </StyledStandardLink>
      <StyledIconWrapper>
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
        <Navigation
          isOpen={isOpen}
          handleToggleMenu={handleToggleMenu}
          switchTheme={switchTheme}
        />
      </StyledIconWrapper>
    </StyledHeader>
  );
}
