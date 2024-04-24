import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
  width: 100%;

  height: 4.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: var(--main-bright);
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--main-dark);
  background: var(--main-bright);
  border-radius: 0.5rem;
  padding: 0.5rem;
  flex: 1;
  border: 1px solid var(--main-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:focus {
    border: 1px solid var(--main-bright);

    background: var(--main-dark);
    color: var(--main-bright);
  }
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
