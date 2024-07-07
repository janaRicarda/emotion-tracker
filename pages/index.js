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

const fadeIn = keyframes`
0% { opacity: 0;}
100% {opacity: 1;}
`;

const buttonExplode = keyframes`
0% {opacity: 1; color: transparent; position: relative;}
100% {opacity: 0; color: transparent; position: absolute;}
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
0% { transform: translateY(-40vh); background: var(--joy); }
14% {background: var(--surprise);}
28% {background: var(--fear);}
42% {background: var(--sadness);}
56% {background: var(--contempt);}
70% {background: var(--disgust);}
84% {background: var(--anger);  transform: translateY(40vh);}
100% {background: var(--anger); transform: translateY(1.1vh); }
`;

const smallCircleAnimation = keyframes`
0% {transform: translateY(0); opacity: 1;}
100% {transform: translateY(-40vh); opacity: 0;}
`;

const sadnessAnimation = keyframes`
0% {transform: translateX(0); opacity: 1;}
100% {transform: translateX(40vh); opacity: 0; }
`;

const contemptAnimation = keyframes`
0% {transform: translateX(0); opacity: 1;}
100% {transform: translateX(-40vh); opacity: 0; }
`;

const surpriseAnimation = keyframes`
0% {transform: translate(0); opacity: 1;}
100% {transform: translate(40vh 20vh); opacity: 0; }
`;

const angerAnimation = keyframes`
0% {transform: translateY(0); opacity: 1;}
100% {transform: translate(-30% -40vh); opacity: 0; }
`;

const StyledBigLogo = styled(BigLogo)`
  max-width: 16rem;
  max-height: 16rem;
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-delay: 900ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

const StyledParagraph = styled.p`
opacity: 0;
margin-top: 2rem;
 animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-delay: 4s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  `;

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
padding-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

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
  width: 9rem;
  height: 9rem;
background: var(--profile);
  border: none;
  border-radius: 50%;
  color: var(--text-on-bright);
  font-weight: 500;
  opacity: 0;
  animation-name: ${({$explode}) => $explode ? css`${buttonExplode}` : css`${buttonFadeIn}`};
  animation-duration: ${({$explode}) => ($explode ? "100ms" : "500ms")};
  animation-timing-function: linear;
  animation-delay: ${({$explode}) => ($explode ? "none" : "3500ms")};
  animation-fill-mode: forwards; 

`; 
const StyledCircle = styled.div`
width: 8rem;
height: 8rem;
border-radius: 50%;
position: absolute;

animation: ${circleAnimation} 3s linear;
`;

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 1rem;
`;

const StyledSmallCircle = styled.div`
opacity: 0;
width: 2rem;
height: 2rem;
border-radius: 50%;
position: absolute;
top: 50%;
left: calc(50% - 1rem);
right: calc(50% - 1rem);
`;

const StyledJoy = styled(StyledSmallCircle)`
background: var(--joy);
animation: ${smallCircleAnimation} 500ms linear forwards;
`;

const StyledSurprise = styled(StyledSmallCircle)`
background: var(--surprise);
animation: ${surpriseAnimation} 500ms linear 1000ms forwards;
`;

const StyledFear = styled(StyledSmallCircle)`
background: var(--fear);
animation: ${smallCircleAnimation} 500ms linear 200ms forwards;
`;

const StyledSadness = styled(StyledSmallCircle)`
background: var(--sadness);
animation: ${sadnessAnimation} 500ms linear forwards;
`;

const StyledContempt = styled(StyledSmallCircle)`
background: var(--contempt);
animation: ${contemptAnimation} 500ms linear forwards;
`;

const StyledDisgust = styled(StyledSmallCircle)`
background: var(--disgust);
animation: ${smallCircleAnimation} 500ms linear 800ms forwards;
`;

const StyledAnger = styled(StyledSmallCircle)`
background: var(--anger);
animation: ${angerAnimation} 500ms linear 1000ms forwards;
`;

export default function LandingPage() {
  const [showLogIn, setShowLogIn] = useState(false);
const [explode, setExplode] = useState(false);
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
    {showLogIn ? (
      <div>
      <StyledJoy/> 
      <StyledSurprise/>
      <StyledFear />
      <StyledSadness />
      <StyledContempt />
      <StyledDisgust />
      <StyledAnger />
      </div>) :  (<StyledCircle />
    )}
    
      <Wrapper>
      <StyledBigLogo $showLogIn={showLogIn}/>
     
      <StartButton $explode={explode} $position={showLogIn && "absolute"} $top={showLogIn && "40vh"}
              onClick={() => {
                setShowLogIn(true);  
                setExplode(true);
              }}
            >
              Get Started!
            </StartButton> 
        <StyledParagraph>Your tool for tracking your emotions</StyledParagraph>
          
          
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