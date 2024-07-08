import styled from "styled-components";
import { keyframes } from "styled-components";
import { breakpoints } from "@/utils/breakpoints";

const circleAnimation = keyframes`
0% { transform: translateY(-40vh); background: var(--joy); }
14% {background: var(--surprise);}
28% {background: var(--fear);}
42% {background: var(--sadness);}
56% {background: var(--contempt);}
70% {background: var(--disgust);}
84% {background: var(--anger);  transform: translateY(40vh);}
100% {background: var(--anger); transform: translateY(10vh); }
`;

const joyAnimation = keyframes`
0% {transform: translateY(0); opacity: 1;}
100% {transform: translateY(-40vh); opacity: 0;}
`;

const sadnessAnimation = keyframes`
0% {transform: translateX(0); opacity: 1;}
100% {transform: translateX(25vh); opacity: 0; }
`;

const contemptAnimation = keyframes`
0% {transform: translateX(0); opacity: 1;}
100% {transform: translateX(-25vh); opacity: 0; }
`;

const surpriseAnimation = keyframes`
0% {transform: translate(0); opacity: 1;}
100% {transform: translate(20vh, -35vh); opacity: 0; }
`;

const angerAnimation = keyframes`
0% {transform: translateY(0); opacity: 1;}
100% {transform: translate(-20vh, -35vh); opacity: 0; }
`;

const fearAnimation = keyframes`
0% {transform: translateY(0); opacity: 1;}
100% {transform: translate(30vh, -20vh); opacity: 0; }
`;

const disgustAnimation = keyframes`
0% {transform: translateY(0); opacity: 1;}
100% {transform: translate(-30vh, -20vh); opacity: 0; }
`;

const StyledCircle = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  position: absolute;
  animation: ${circleAnimation} 3s ease-in-out;
  @media ${breakpoints.mobileLandscape} {
    width: 6rem;
    height: 6rem;
  }
  @media ${breakpoints.tablet} {
    width: 8rem;
    height: 8rem;
  }
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
  animation-duration: 400ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

const StyledJoy = styled(StyledSmallCircle)`
  background: var(--joy);
  animation-name: ${joyAnimation};
`;

const StyledSurprise = styled(StyledSmallCircle)`
  background: var(--surprise);
  animation-name: ${surpriseAnimation};
`;

const StyledFear = styled(StyledSmallCircle)`
  background: var(--fear);
  animation-name: ${fearAnimation};
`;

const StyledSadness = styled(StyledSmallCircle)`
  background: var(--sadness);
  animation-name: ${sadnessAnimation};
`;

const StyledContempt = styled(StyledSmallCircle)`
  background: var(--contempt);
  animation-name: ${contemptAnimation};
`;

const StyledDisgust = styled(StyledSmallCircle)`
  background: var(--disgust);
  animation-name: ${disgustAnimation};
`;

const StyledAnger = styled(StyledSmallCircle)`
  background: var(--anger);
  animation-name: ${angerAnimation};
`;

export default function CircleAnimation({ showLogIn }) {
  return (
    <>
      {showLogIn ? (
        <>
          <StyledJoy />
          <StyledSurprise />
          <StyledFear />
          <StyledSadness />
          <StyledContempt />
          <StyledDisgust />
          <StyledAnger />
        </>
      ) : (
        <StyledCircle />
      )}
    </>
  );
}
