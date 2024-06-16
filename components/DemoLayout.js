import styled from "styled-components";
import { useRouter } from "next/router";

const StyledDemoFrame = styled.article`
  width: 100vw;
  background: var(--button-background);
  position: fixed;
  z-index: 3;
  top: 0;
  display: flex;
  justify-center: space-around;
  align-items: center;
`;
const StyledMessage = styled.p`
  color: var(--contrast-text);
  text-align: center;
`;

const StyledQuitDemoModeButton = styled.button`
  border-style: none;
  background: transparent;
  color: var(--contrast-text);
  opacity: ${({ $disable }) => ($disable ? "0.5" : "1")};
`;

export default function DemoLayout({ handleDemoModeOff }) {
  const router = useRouter();
  const createPath =
    (router.pathname === "/create" || router.pathname === "/create/[slug]") &&
    true;

  return (
    <StyledDemoFrame>
      <StyledMessage>You are using demo mode</StyledMessage>
      <StyledQuitDemoModeButton
        $login
        $disable={createPath}
        onClick={() => {
          if (disable) {
            return;
          }
          router.push("/");
          handleDemoModeOff();
        }}
      >
        quit to log in
      </StyledQuitDemoModeButton>
    </StyledDemoFrame>
  );
}
