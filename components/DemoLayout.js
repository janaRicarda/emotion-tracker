import styled from "styled-components";

const StyledDemoFrame = styled.article`
  width: 100vw;
  background: var(--button-background);
  position: fixed;
  z-index: 3;
  top: 0;
`;
const StyledMessage = styled.p`
  color: var(--contrast-text);
  text-align: center;
`;

export default function DemoLayout() {
  return (
    <StyledDemoFrame>
      <StyledMessage>You are using demo mode</StyledMessage>
    </StyledDemoFrame>
  );
}
