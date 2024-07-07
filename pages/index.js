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
    max-width: 14rem;
    max-height: 14rem;
  z-index: 9;
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
width: 100vw;
height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({$showLogIn}) => ($showLogIn ? "2rem" : "0")};
 @media ${breakpoints.mobileLandscape} {
    padding-top: 0;
    padding-bottom: 4rem;
  }
`;

const LoginBox = styled.div`
  display: flex;
  padding: 0.5rem;
  margin: 1rem auto;
  background-color: var(--main-dark);
  color: var(--main-bright);
  //width: 100%;
  width: 80vw;
  align-items: center;
  justify-content: center;

  & > svg {
    margin-right: 0.6rem;
  }
`;
/* 
const StartButton = styled(StyledButton)`
  width: auto;
  padding: 0.6rem;
  border: none;
  border-radius: 3px;
 
  opacity: 0;
  animation: ${buttonFadeIn} 1s linear 3000ms;
  animation-fill-mode: forwards;
`;  */

 const StartButton = styled(StyledButton)`
  width: 8rem;
  height: 8rem;
  background: var(--profile);
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
`; 

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 1rem;
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
 <h3 >Login</h3>
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

// {<Wrapper>
// <StyledBigLogo />
//   <StyledParagraph>Your tool for tracking your emotions</StyledParagraph>
//   {!showLogIn ? (
//     <>
//       <StartButton $explode={explode}
//         onClick={() => {
//           /* setShowLogIn(true);  */
//           setExplode(true);
//         }}
//       >
//         Get Started!
//       </StartButton> 
//     </>
//   ) : (
//     <>
//       <h3>Login</h3>
//       {providers.github && (
//         <LoginBox onClick={() => signIn("github")}>
//           <Icon path={mdiGithub} size={1} />
//           GitHub
//         </LoginBox>
//       )}
//       {providers.google && (
//         <LoginBox onClick={() => signIn("google")}>
//           <Icon path={mdiGoogle} size={1} />
//           Google
//         </LoginBox>
//       )}
//     </>
//   )}
// </Wrapper>}