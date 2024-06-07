import { signIn } from "next-auth/react";
import styled from "styled-components";

const StyledOverlay = styled.section`
  width: 100vw;
  height: 100vh;
  display: ${({ $display }) => ($display ? "none" : "flex")};
  background: var(--button-background);
  position: fixed;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 3;
  top: 0;
`;

const StyledArticle = styled.article`
  display: flex;
  width: 90vw;
  height: 60vh;
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
    <StyledOverlay $display={demoMode}>
      <StyledArticle>
        <StyledP>Login with credentials</StyledP>
        <StyledLoginButton onClick={() => signIn()}>Login</StyledLoginButton>
        <StyledP>or use app in demo-mode</StyledP>
        <StyledLoginButton onClick={handleDemoMode}>
          demo-mode
        </StyledLoginButton>
      </StyledArticle>
    </StyledOverlay>
  );
}
