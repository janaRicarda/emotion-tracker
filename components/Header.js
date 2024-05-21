import styled from "styled-components";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from ".//../public/images/logo.png";

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main-bright);
  position: fixed;
  padding: 0 1rem;
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
  width: 9rem;
  height: 9rem;
  stroke: var(--main-dark);
`;

export default function Header({ theme, toggleTheme, switchTheme }) {
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
