import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
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
  background: #f5d6a9:
`;

export default function Navgation() {
  return (
    <StyledFooter>
      <StyledLink href="/emotions">7 basic emotions</StyledLink>
      <StyledLink href="/">add entry</StyledLink>
      <StyledLink href="/emotion-records">emotion records</StyledLink>
    </StyledFooter>
  );
}
