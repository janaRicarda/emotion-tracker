import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  background-color: var(--main-bright);
  border-top: 1px solid var(--main-dark);
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>© {new Date().getFullYear()} What a feeling</p>
    </StyledFooter>
  );
}
