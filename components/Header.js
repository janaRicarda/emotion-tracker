import styled from "styled-components";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from "../public/logo.svg";

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const StyledLogo = styled(Logo)`
  width: 3.5rem;
  height: 3.5rem;
  fill: red;
  color: red;
  stroke: red;
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export default function Header({ switchTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <StyledHeader $isOpen={isOpen}>
      <StyledLogo />
      <Navigation
        isOpen={isOpen}
        handleToggleMenu={handleToggleMenu}
        switchTheme={switchTheme}
      />
    </StyledHeader>
  );
}
