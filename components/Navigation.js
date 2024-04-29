import styled from "styled-components";
import Link from "next/link";

const StyledArticle = styled.article`
  width: 100%;
  height: 5rem;
  position: fixed;
  bottom: -10px;
  left: 0;
  background: #daaafa;
  display: flex;
  border-top: 1px solid var(--main-dark);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  //color: #030352;
  padding: 0.5rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  //line-height: 90%;
  background: #fad193;
  display: none;
`;

export default function Navgation() {
  return (
    <StyledArticle>
      <StyledLink href="/emotions">7 basic emotions</StyledLink>
      <StyledLink href="/">add entry</StyledLink>
      <StyledLink href="/emotion-records">emotion records</StyledLink>
    </StyledArticle>
  );
}
