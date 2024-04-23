import styled from "styled-components";
import Image from "next/image";
import Klecks from ".//../public/images/Klecks2.svg";

const StyledHeader = styled.header`
  width: 100%;
  //background: linear-gradient(white, transparent);
  background: var(--main-bright);
  position: fixed;
  top: 0;
`;

const StyledLogo = styled(Image)`
  aspect-ratio: auto;
  background: transparent;
`;
const StyledKlecks = styled(Klecks)`
  width: 200px;
  height: 100px;
`;
const styledP = styled.p`
  position: absolute;
  top: 100px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLogo
        src="/../public/images/Logo4.png"
        height={160}
        width={280}
        alt="A picture of the logo saying what a feeling"
      ></StyledLogo>
      {/* <StyledKlecks height={100} width={100} /> */}
    </StyledHeader>
  );
}
