import BigLogo from "@/public/icons/bigLogo.svg";
import styled from "styled-components";
import { signIn, getProviders } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiGithub, mdiGoogle } from "@mdi/js";

const StyledBigLogo = styled(BigLogo)`
  max-width: 15rem;
  max-height: 15rem;
  opacity: ${({ $startAnimation }) => ($startAnimation ? "1" : "0")};
  transition: opacity 2000ms;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  display: flex;
  padding: 0.5rem;
  margin: 1rem auto;
  background-color: white;
  color: black;
  width: 100%;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 0.6rem;
  }
`;

const StartButton = styled(StyledButton)`
  width: auto;
  padding: 0.6rem;
  border: none;
  border-radius: 3px;
  transform: scale(${({ $startAnimation }) => ($startAnimation ? "1" : "0")});
  transition: transform 1000ms 1000ms;
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
  const [showLogIn, setShowLogIn] = useState(false);
  const [providers, setProviders] = useState();
  const [startAnimation, setStartAnimation] = useState(false);

  setTimeout(() => {
    setStartAnimation(true);
  }, 100);

  useEffect(() => {
    async function prov() {
      const providers = await getProviders();
      setProviders(providers);
    }
    !providers && prov();
  });

  console.log(providers);

  return (
    <>
      <Wrapper>
        <StyledBigLogo $startAnimation={startAnimation} />
        {/* <StyledArticle>
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
      </StyledArticle> */}
        {!showLogIn ? (
          <>
            <StartButton
              $startAnimation={startAnimation}
              onClick={() => {
                setShowLogIn(true);
              }}
            >
              Get Started!
            </StartButton>
            <StartButton
              $startAnimation={startAnimation}
              onClick={() => signIn()}
            >
              Sign in Page!
            </StartButton>
          </>
        ) : (
          <>
            <h3>Login</h3>
            {providers.github && (
              <LoginBox onClick={() => signIn("github")}>
                <Icon path={mdiGithub} size={1} />
                GitHub
              </LoginBox>
            )}
            {providers.google && (
              <LoginBox onClick={() => signIn("google")}>
                <Icon path={mdiGoogle} size={1} />
                Google
              </LoginBox>
            )}
            {/* {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <button>Sign in with {provider.name}</button>
              </div>
            );
          })} */}
          </>
        )}
      </Wrapper>
    </>
  );
}
