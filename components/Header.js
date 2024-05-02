import styled from "styled-components";
import Image from "next/image";

import Navigation from "./Navigation";
import { useState } from "react";
import Logo from ".//../public/images/logo.png";

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const StyledLogo = styled(Image)`
  height: 150px;
  width: 150px;
  position: absolute;
  top: -1rem;
  left: 0;
`;

export default function Header({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }
  function setOpenFalse() {
    setIsOpen(!isOpen);
  }
  return (
    <StyledHeader $isOpen={isOpen}>
      <StyledLogo src={Logo} />
      {/*  {theme === "light" ? (
        <StyledLogo src={LogoLight} alt="logo" />
      ) : (
        <StyledLogo src={LogoDark} alt="logo" />
      )}  */}
      {/*  <StyledSpot>
        <StyledLogo src={Logoneu} alt="logo" />
      </StyledSpot> */}
      <Navigation
        isOpen={isOpen}
        handleToggleMenu={handleToggleMenu}
        setOpenFalse={setOpenFalse}
      />
    </StyledHeader>
  );
}
