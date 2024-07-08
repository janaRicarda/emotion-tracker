import BigLogo from "@/public/icons/bigLogo.svg";
import styled from "styled-components";
import { signIn, getProviders } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Icon from "@mdi/react";
import { mdiGithub, mdiGoogle } from "@mdi/js";
import { useSession } from "next-auth/react";
import { keyframes, css } from "styled-components";
import CircleAnimation from "@/components/CircleAnimation";
import { breakpoints } from "@/utils/breakpoints";

const fadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
`;

const buttonDisappears = keyframes`
0% {opacity: 1; color: transparent; position: relative;}
100% {opacity: 0; color: transparent; position: absolute;}
`; 

 const buttonFadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
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
    @media ${breakpoints.mobileLandscape} {
    width: 8rem;
    height: 8rem;
  }  
     @media ${breakpoints.tablet} {
    width: 16rem;
    height: 16rem;
    border: 1px solid blue;
  }  
`;

const StyledParagraph = styled.p`
opacity: 0;
margin-top: ${({$showLogIn}) => ($showLogIn ? "none" : "2rem")};
 animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-delay: 3500ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  `;

const Wrapper = styled.div`
background: var(--section-background);
  width: 100vw;
  height: 100vh;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({$showLogIn}) => ($showLogIn ? "2rem" : "0")};

  @media ${breakpoints.mobileLandscape} {
    padding-top: 0;
    padding-bottom: 1rem;
    gap: 0;
  }  
    @media ${breakpoints.tablet} {
  padding-bottom: 0;
    padding-top: 3rem;
    gap: ${({$showLogIn}) => ($showLogIn ? "2rem" : "0")};
  }  
`;

const LoginBox = styled.div`
  display: flex;
  padding: 0.8rem;
  margin: 0.5rem auto;
  background: var(--section-background);
  color: var(--main-dark);
  width: 80vw;
  border-radius: 0.25rem;
  align-items: center;
  justify-content: center;
  & > svg {
    margin-right: 0.6rem;
`;

const StyledH3 = styled.h3`
margin-bottom: 1rem;
`;

 const StartButton = styled(StyledButton)`
  width: 8rem;
  height: 8rem;
  background: var(--landing-page);
  border: none;
  border-radius: 50%;
  color: var(--text-on-bright);
  font-weight: 500;
  opacity: 0;
  animation-name: ${({$showLogIn}) => $showLogIn ? css`${buttonDisappears}` : css`${buttonFadeIn}`};
  animation-duration: ${({$showLogIn}) => ($showLogIn ? "100ms" : "500ms")};
  animation-timing-function: linear;
  animation-delay: ${({$showLogIn}) => ($showLogIn ? "none" : "3s")};
  animation-fill-mode: forwards; 
  @media ${breakpoints.mobileLandscape} {
    width: 6rem;
    height: 6rem;
  }
    @media ${breakpoints.tablet} {
    width: 8rem;
    height: 8rem;
  }
`; 

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;

margin-top: 1rem;
padding: 1rem;
border-radius: 0.5rem;
background: var(--landing-page);
color: var(--text-on-bright);
}
   
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
    <CircleAnimation showLogIn={showLogIn}/>
      <Wrapper $showLogIn={showLogIn}>
      <StyledBigLogo $showLogIn={showLogIn}/>
     
      <StartButton $showLogIn={showLogIn} $position={showLogIn && "absolute"} $top={showLogIn && "40vh"}
              onClick={() => {
                setShowLogIn(true);  
              }}
            >
              Get Started!
            </StartButton> 
        <StyledParagraph $showLogIn={showLogIn}>Your tool for tracking your emotions</StyledParagraph>
          
          
      {showLogIn && (
        <StyledDiv>
 <StyledH3>Login</StyledH3>
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
</StyledDiv>
      )}
     </Wrapper>
    </>
  );
}

