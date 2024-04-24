import styled from "styled-components";
import Image from "next/image";

const StyledHeader = styled.header`
  width: 100%;
  height: 15vh;
  background: linear-gradient(white, transparent);
  background: white;
  position: fixed;
  top: 0;
`;

const StyledLogo = styled.div`
  position: absolute;
  top: -20px;
  left: -40px;
`;

const StyledH1 = styled.h1`
  position: absolute;
  top: 40px;
  left: 50px;
  font-size: 2.5rem;
  font-weight: 500;
`;
const StyledP = styled.p`
  position: absolute;
  top: 80px;
  left: 160px;
`;
const StyledDiv = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: blue;
  filter: blur(60px);
  opacity: 70%;
  position: fixed;
  top: -60px;
  left: 0;
  right: 0;
  z-index: 1;
`;

export default function Header() {
  return (
    <>
      {/*  <StyledDiv></StyledDiv>*/}

      <StyledHeader>
        <StyledLogo>
          <Image
            src="/../public/images/Klecks4.png"
            height={150}
            width={600}
            alt="A picture of the logo saying what a feeling"
          />
          <StyledH1>What a feeling</StyledH1>
          <StyledP>Emotion Tracker</StyledP>
        </StyledLogo>
      </StyledHeader>
    </>
  );
}
