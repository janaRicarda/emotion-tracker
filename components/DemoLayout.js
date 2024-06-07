import styled from "styled-components";

const StyledDemoFrame = styled.article`
  width: 100vw:
  height: 1rem;
  background: var(--button-background);

position: fixed;
  z-index: 3;
  top: 0;
`;
const StyledMessage = styled.p`
  width: 100vw;
  color: var(--main-dark);
  text-align: center;
`;

export default function DemoLayout() {
  return (
    <StyledDemoFrame>
      <StyledMessage>You are using demo mode</StyledMessage>
    </StyledDemoFrame>
  );
}
