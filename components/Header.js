import styled from "styled-components";
import Image from "next/image";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from ".//../public/images/logo.png";
import { StyledStandardLink } from "@/SharedStyledComponents";

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ $isOpen }) => ($isOpen ? "3" : "1")};
`;

const StyledLogo = styled(Image)`
  height: 100px;
  width: 200px;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <StyledHeader $isOpen={isOpen}>
      <StyledStandardLink href="/">
        <StyledLogo src={Logo} />
      </StyledStandardLink>
      <Navigation isOpen={isOpen} handleToggleMenu={handleToggleMenu} />
    </StyledHeader>
  );
}
