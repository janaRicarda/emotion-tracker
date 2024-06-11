import { useSession, signIn, signOut } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import styled from "styled-components";

const StyledParagraph = styled.p`
  font-size: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0.8rem;
`;

export default function Login({ handleDemoModeOff }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <StyledParagraph>Signed in as {session.user.name}</StyledParagraph>
        <StyledButton $login onClick={() => signOut()}>
          Sign out
        </StyledButton>
      </>
    );
  }
  return (
    <StyledButton
      $login
      onClick={() => {
        signIn();
        handleDemoModeOff();
      }}
    >
      Sign in
    </StyledButton>
  );
}
