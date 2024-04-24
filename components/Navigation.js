import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const StyledFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: -10px;
  left: 0;
`;

const StyledArticle = styled.article`
  width: 100%;
  display: flex;

  position: fixed;
  bottom: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--main-dark);
  padding: 0.5rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 90%;
  &:focus {
    //background: var(--main-bright);
    // border: 1px solid var(--main-dark);
    color: rebeccapurple;
  }
`;

export default function Navgation() {
  return (
    <StyledFooter>
      <Image
        src="/../public/images/Klecks5.png"
        height={100}
        width={600}
        alt="A picture of the logo saying what a feeling"
      />
      <StyledArticle>
        <StyledLink href="/emotions">7 basic emotions</StyledLink>
        <StyledLink href="/">add entry</StyledLink>
        <StyledLink href="/emotion-records">emotion records</StyledLink>
      </StyledArticle>
    </StyledFooter>
  );
}
