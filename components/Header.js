import styled from "styled-components";
import Image from "next/image";
import LogoLight from ".//../public/images/logo.png";
import LogoDark from ".//../public/images/logo_dark.png";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from ".//../public/images/logofrei.png";

const StyledHeader = styled.header`
  width: 100%;
  height: 150px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  z-index: ${({ $isOpen }) => ($isOpen ? "3" : "1")};
`;

/* const StyledLogo = styled(Image)`
  height: 150px;
  width: 200px;
  position: absolute;
  left: 0;
`; */
const StyledLogo = styled(Image)`
  height: 250px;
  width: 250px;
  position: absolute;
  left: -2.5rem;
  top: -3.5rem;
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
      {/*  {theme === "light" ? (
        <StyledLogo src={LogoLight} alt="logo" />
      ) : (
        <StyledLogo src={LogoDark} alt="logo" />
      )} */}
      <StyledLogo src={Logo} alt="logo" />
      <Navigation
        isOpen={isOpen}
        handleToggleMenu={handleToggleMenu}
        setOpenFalse={setOpenFalse}
      />
    </StyledHeader>
  );
}
