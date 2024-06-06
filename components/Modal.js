import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const StyledArticle = styled.article`
  display: ${({ $display }) => ($display ? "none" : "flex")};
  width: 90vw;
  height: 60vh;
  position: fixed;
  top: 120px;
  z-index: 9;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: var(--section-background);
  border-radius: 1rem;
`;

const StyledLoginButton = styled.button`
  border-style: none;
  padding: 0.5rem;
  border-radius: 6px;
  height: auto;
  background: var(--button-background);
  color: var(--main-dark);
`;

const StyledP = styled.p`
  width: auto;
  height: auto;
`;

export default function StartModal({ demoMode, handleDemoMode }) {
  return (
    <StyledArticle $display={demoMode}>
      <StyledP>Login with credentials</StyledP>
      <StyledLoginButton onClick={() => signIn()}>Login</StyledLoginButton>
      <StyledP>or use app in demo-mode</StyledP>
      <StyledLoginButton onClick={handleDemoMode}>demo-mode</StyledLoginButton>
    </StyledArticle>
  );
}
