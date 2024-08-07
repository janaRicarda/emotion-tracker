import BigLogo from "@/public/icons/bigLogo.svg";
import styled from "styled-components";
import { signIn, getProviders } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Icon from "@mdi/react";
import { mdiGithub, mdiGoogle, mdiFlaskOutline, mdiAccount } from "@mdi/js";
import { useSession } from "next-auth/react";
import { keyframes } from "styled-components";
import CircleAnimation from "@/components/CircleAnimation";

const fadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
`;

const buttonFadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
`;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: var(--landing-page-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && > div {
    min-height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledBigLogo = styled(BigLogo)`
  max-width: 16rem;
  max-height: 16rem;
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-delay: 1200ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  @media (min-width: 700px) {
    width: 16rem;
    height: 16rem;
  }
  @media (max-width: 700px) and (orientation: landscape) {
    width: 10rem;
    height: 10rem;
  }
`;

const StartButton = styled(StyledButton)`
  width: 8rem;
  height: 8rem;
  background: conic-gradient(
    #fbffc7,
    #e2ffc7,
    #c7ffe7,
    #c7f3ff,
    #d2c8ff,
    #fbc8ff,
    #ffc8c8,
    #fbffc7
  );
  border: none;
  border-radius: 50%;
  color: var(--text-on-bright);
  font-weight: 500;
  opacity: 0;
  animation: ${buttonFadeIn} 100ms 3s linear;
  animation-fill-mode: forwards;
  @media (max-height: 600px) and (orientation: landscape) {
    width: 6rem;
    height: 6rem;
  }
  @media (min-width: 700px) and (orientation: portrait) {
    width: 8rem;
    height: 8rem;
  }
  @media (min-width: 900px) and (min-height: 500px) {
    width: 8rem;
    height: 8rem;
  }
`;

const StyledLogInWrapper = styled.div`
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  transition: grid-template-rows 1s;
  transition-delay: 300ms;
`;

const StyledLoginButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 80vw;
  max-width: 400px;
  margin: 1rem;
  border-radius: 0.5rem;
  background: conic-gradient(
    #fbffc7,
    #e2ffc7,
    #c7ffe7,
    #c7f3ff,
    #d2c8ff,
    #fbc8ff,
    #ffc8c8,
    #fbffc7
  );
  color: var(--text-on-bright);

  && > h3 {
    margin-top: 0.7rem;
  }
`;

const LoginBox = styled.button`
  display: flex;
  padding: 0.8rem;
  margin: 0.5rem auto;
  background: var(--landing-page-background);
  color: var(--main-dark);
  border-style: none;
  width: 80%;
  border-radius: 0.25rem;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 0.6rem;
  }
  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

const Accordion = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  ${LoginBox} {
    margin-bottom: 0.5rem;
  }
`;

const StyledCredentialForm = styled.form`
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  transition: grid-template-rows 1s;
  width: 80%;

  && > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 2rem;
    overflow: hidden;
    color: black;
    overflow: hidden;
  }

  && > * input {
    margin: 0 0 0.7rem 0;
    border-radius: 3px;
    border: none;
  }

  && > * button {
    margin: 0.5rem 0;
    border: none;
    border-radius: 3px;
  }
`;

const StyledParagraph = styled.p`
  opacity: ${({ $showLogIn }) => ($showLogIn ? "1" : "0")};
  margin-top: ${({ $showLogIn }) => ($showLogIn ? "none" : "2rem")};
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-delay: ${({ $showLogIn }) => ($showLogIn ? "none" : "3500ms")};
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export default function LandingPage({ handleDemoMode }) {
  const [showLogIn, setShowLogIn] = useState({ show: false, animation: false });
  const [showCredentialsForm, setShowCredentialsForm] = useState({
    show: false,
    animation: false,
  });

  const [userCredentials, setUserCredentials] = useState();
  const [errorCredentialLogIn, setErrorCredentialLogIn] = useState();

  const [providers, setProviders] = useState();

  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }

  useEffect(() => {
    async function findProviders() {
      const providers = await getProviders();
      setProviders(providers);
    }
    !providers && findProviders();
  });

  async function handleCredentialLogin(event) {
    event.preventDefault();
    const response = await signIn("credentials", {
      ...userCredentials,
      callbackUrl: "/home",
      redirect: false,
    });

    if (!response.ok) {
      setErrorCredentialLogIn(response);
    }

    if (response.ok) {
      setErrorCredentialLogIn();
    }
  }

  // "hook" for handling conditional rendering to DOM and start animation of same element shortly after
  function handleShowComponentAndAnimation(state, setFunction) {
    if (!state.show) {
      setFunction({ ...state, show: !state.show });
      setTimeout(() => {
        setFunction({
          animation: !state.animation,
          show: !state.show,
        });
      }, 1);
    }

    if (state.show) {
      setFunction({ ...state, animation: !state.animation });
      setTimeout(() => {
        setFunction({ animation: !state.animation, show: !state.show });
      }, 800);
    }
  }

  return (
    <>
      <CircleAnimation showLogIn={showLogIn.show} />
      <Wrapper $showLogIn={showLogIn.show}>
        <div>
          <StyledBigLogo />
          {!showLogIn.show ? (
            <>
              <StartButton
                onClick={() => {
                  handleShowComponentAndAnimation(showLogIn, setShowLogIn);
                }}
              >
                Get Started!
              </StartButton>
              <StyledParagraph $showLogIn={showLogIn.show}>
                Your tool for tracking your emotions
              </StyledParagraph>
            </>
          ) : (
            <>
              <StyledParagraph $showLogIn={showLogIn.show}>
                Your tool for tracking your emotions
              </StyledParagraph>
              <StyledLogInWrapper $show={showLogIn.animation}>
                <StyledLoginButtonWrapper>
                  <h3>Login</h3>
                  {providers?.github && (
                    <LoginBox
                      onClick={() => signIn("github", { callbackUrl: "/home" })}
                    >
                      <Icon path={mdiGithub} size={1} />
                      GitHub
                    </LoginBox>
                  )}
                  {providers?.google && (
                    <LoginBox
                      onClick={() => signIn("google", { callbackUrl: "/home" })}
                    >
                      <Icon path={mdiGoogle} size={1} />
                      Google
                    </LoginBox>
                  )}
                  {providers?.credentials && (
                    <Accordion>
                      <LoginBox
                        onClick={() =>
                          handleShowComponentAndAnimation(
                            showCredentialsForm,
                            setShowCredentialsForm
                          )
                        }
                      >
                        <Icon path={mdiAccount} size={1} /> Credentials
                      </LoginBox>
                      {showCredentialsForm.show && (
                        <StyledCredentialForm
                          $show={showCredentialsForm.animation}
                          onSubmit={handleCredentialLogin}
                        >
                          <div>
                            <label htmlFor="username">Username</label>
                            <input
                              type="text"
                              id="username"
                              placeholder="username"
                              onChange={(event) => {
                                setUserCredentials({
                                  username: event.target.value,
                                });
                              }}
                              required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              id="password"
                              placeholder="password"
                              onChange={(event) => {
                                setUserCredentials({
                                  ...userCredentials,
                                  password: event.target.value,
                                });
                              }}
                              required
                            />
                            {errorCredentialLogIn && (
                              <>
                                <b>
                                  Sorry, something&apos;s wrong. Please, try
                                  again.
                                </b>
                                <p>Error-Code: {errorCredentialLogIn.status}</p>
                                <p>Message: {errorCredentialLogIn.error}</p>
                              </>
                            )}
                            <button type="submit">Submit</button>
                          </div>
                        </StyledCredentialForm>
                      )}
                    </Accordion>
                  )}
                  <LoginBox
                    onClick={() => {
                      handleDemoMode();
                    }}
                  >
                    <Icon path={mdiFlaskOutline} size={1} /> Demo-Mode
                  </LoginBox>
                </StyledLoginButtonWrapper>
              </StyledLogInWrapper>
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
}
