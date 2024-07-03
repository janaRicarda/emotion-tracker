import BigLogo from "@/public/icons/bigLogo.svg";
import styled from "styled-components";
import { signIn } from "next-auth/react";

const StyledBigLogo = styled(BigLogo)`
  max-width: 15rem;
  max-height: 15rem;
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

export default function LandingPage({ handleDemoMode, handleDemoModeOff }) {
  return (
    <>
      <StyledBigLogo />
      <StyledArticle>
        <StyledParagraph>Login with credentials</StyledParagraph>
        <StyledLoginButton
          onClick={() => {
            signIn(undefined, { callbackUrl: "/" });
            handleDemoModeOff();
          }}
        >
          Login
        </StyledLoginButton>
        <StyledParagraph>or use app in demo-mode</StyledParagraph>
        <StyledLoginButton
          onClick={() => {
            handleDemoMode();
          }}
        >
          demo-mode
        </StyledLoginButton>
      </StyledArticle>
    </>
  );
}
