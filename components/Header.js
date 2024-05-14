import styled from "styled-components";
import Image from "next/image";
import Navigation from "./Navigation";
import { useState } from "react";
// import Logo from ".//../public/images/logo-f.png";
import Logo from "../public/logo.svg";

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

// const StyledLogo = styled(Image)`
//   height: 50px;
//   width: 50px;
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
// `;

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
      {/* <StyledLogo src={Logo} alt="logo" /> */}
      <StyledLogo />
      <Navigation
        isOpen={isOpen}
        handleToggleMenu={handleToggleMenu}
        switchTheme={switchTheme}
      />
    </StyledHeader>
  );
}
