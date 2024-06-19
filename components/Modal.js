import { signIn } from "next-auth/react";
import styled from "styled-components";
import Logo from "../public/icons/logo.svg";

const StyledOverlay = styled.section`
  width: 100vw;
  height: 100vh;
  display: ${({ $display }) => ($display ? "none" : "flex")};
  flex-direction: column;
  background: var(--button-background);
  position: fixed;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 3;
  top: 0;
`;
const StyledLogo = styled(Logo)`
  width: 10rem;
  height: 10rem;
`;

const StyledArticle = styled.article`
  display: flex;
  width: 90vw;
  height: 60vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--section-background);
  border-radius: 1rem;
`;

const StyledLoginButton = styled.button`
  border-style: none;
  padding: 0.5rem;
  border-radius: 6px;
  height: auto;
  background: var(--button-background);
  color: var(--contrast-text);
`;

const StyledParagraph = styled.p`
  width: auto;
  height: auto;
`;

export default function StartModal({
  demoMode,
  handleDemoMode,
  handleDemoModeOff,
}) {
  return (
    <StyledOverlay $display={demoMode}>
      <StyledArticle>
        <StyledParagraph>Login with credentials</StyledParagraph>
        <StyledLoginButton
          onClick={() => {
            signIn();
            handleDemoModeOff();
          }}
        >
          Login
        </StyledLoginButton>
        <StyledParagraph>or use app in demo-mode</StyledParagraph>
        <StyledLoginButton onClick={handleDemoMode}>
          demo-mode
        </StyledLoginButton>
      </StyledArticle>
    </StyledOverlay>
  );
}
