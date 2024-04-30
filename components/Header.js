import styled from "styled-components";
import Image from "next/image";
import LogoLight from ".//../public/images/logo.png";
import LogoDark from ".//../public/images/logo_dark.png";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from ".//../public/images/logofrei.png";
import Logoneu from ".//../public/images/logoneu.png";
/* const StyledHeader = styled.header`
  width: 100%;
  height: 150px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  // z-index: ${({ $isOpen }) => ($isOpen ? "3" : "1")};
`; */

const StyledHeader = styled.header`
  width: 100%;
  height: 100px;
  background: var(--main-bright);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  //border-bottom: 1px solid black;
`;
const StyledSpot = styled.div`
  width: 70vw;
  height: 50vw;
  border-radius: 50% 50% 51% 49% / 68% 62% 38% 32%;
  background: linear-gradient(to bottom right, #da35cb, #fa9684, #fbe6a4);
  //filter: blur(1px);
  position: absolute;
  top: -21vw;
  left: -3rem;
`;

const StyledLogo = styled(Image)`
  height: 250px;
  width: 250px;
  position: absolute;
  top: -3rem;
  left: -3rem;
`;
/* const StyledLogo = styled(Image)`
  width: 65%;
  height: auto;
  position: absolute;
  top: 1.5rem;
  left: 3rem;
`;
 */
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
