import BigLogo from "@/public/icons/bigLogo.svg";
import styled from "styled-components";
import { signIn, getProviders } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Icon from "@mdi/react";
import { mdiGithub, mdiGoogle } from "@mdi/js";
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

/* const buttonFadeIn = keyframes`
0% { width: 15rem; height: 15rem;}
100% {width: 8rem; height: 8rem;}
`; */
const circleAnimation = keyframes`
0% {top: 0;}
50% {bottom: 0;}
100% {bottom: 15%;}
`;

const StyledBigLogo = styled(BigLogo)`
  max-width: 15rem;
  max-height: 15rem;
  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: linear;
`;

const StyledParagraph = styled.p`
 animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-timing-function: linear;
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
  opacity: 0;
  animation: ${buttonFadeIn} 1s linear 1s;
  animation-fill-mode: forwards;
`; 

/* const StartButton = styled(StyledButton)`
  width: 8rem;
  height: 8rem;
  padding: 0.6rem;
  background: var(--profile);
  border: none;
  border-radius: 50%;
  color: var(--text-on-bright);
  font-weight: 700;
  //opacity: 0;
  animation: ${buttonFadeIn} 1s linear 1s;
  //animation-fill-mode: forwards;
`; */
const StyledCircle = styled.div`
width: 8rem;
height: 8rem;
border-radius: 50%;
background: var(--profile);
position: absolute;
animation: ${circleAnimation} 2s linear forwards;
`;

export default function LandingPage() {
  const [showLogIn, setShowLogIn] = useState(false);

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

  return (
    <>
    <StyledCircle />
      <Wrapper>
        <StyledBigLogo />
        <StyledParagraph>Your tool for tracking your emotions</StyledParagraph>
        {!showLogIn ? (
          <>
            <StartButton
              onClick={() => {
                setShowLogIn(true);
              }}
            >
              Get Started!
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
          </>
        )}
      </Wrapper>
    </>
  );
}
