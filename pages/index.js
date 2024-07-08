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

const fadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
`;

const buttonFadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
`;

const Wrapper = styled.div`
  display: flex;
  width: 75vw;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBigLogo = styled(BigLogo)`
  max-width: 15rem;
  max-height: 15rem;
  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: linear;
  position: relative;
  top: 0;
`;

const StartButton = styled(StyledButton)`
  width: auto;
  padding: 0.6rem;
  border: none;
  border-radius: 3px;
  opacity: 0;
  animation: ${buttonFadeIn} 1s linear 1s;
  animation-fill-mode: forwards;
`;

const StyledLogInWrapper = styled.div`
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  transition: grid-template-rows 1s;
  width: 100%;
  margin: 2rem;

  && > div {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  && > div > h3 {
    text-align: center;
  }
`;

const LoginBox = styled.button`
  display: flex;
  padding: 0.5rem;
  border: none;
  background-color: white;
  color: black;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;

  & > svg {
    position: absolute;
    left: calc(50% - 5rem);
    margin-right: 0.6rem;
  }
`;

const Accordeon = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCredentialForm = styled.form`
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  transition: grid-template-rows 1s;
  width: 100%;

  && > div {
    display: flex;
    padding: ${({ $show }) => ($show ? ".4rem" : "0")};
    transition: padding ease-in-out;
    transition-delay: ${({ $show }) => ($show ? "50ms" : "500ms")};
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    background-color: white;
    color: black;
    overflow: hidden;
  }

  && > * input {
    margin: 0 0 0.7rem 0;
  }

  && > * button {
    margin-top: 1rem;
  }
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
    <Wrapper>
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
        </>
      ) : (
        <StyledLogInWrapper $show={showLogIn.animation}>
          <div>
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
              <Accordeon>
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
                            Sorry, something&apos;s wrong. Please, try again.
                          </b>
                          <p>Error-Code: {errorCredentialLogIn.status}</p>
                          <p>Message: {errorCredentialLogIn.error}</p>
                        </>
                      )}
                      <button type="submit">Submit</button>
                    </div>
                  </StyledCredentialForm>
                )}
              </Accordeon>
            )}
            <LoginBox
              onClick={() => {
                handleDemoMode();
              }}
            >
              <Icon path={mdiFlaskOutline} size={1} /> Demo-Mode
            </LoginBox>
          </div>
        </StyledLogInWrapper>
      )}
    </Wrapper>
  );
}
