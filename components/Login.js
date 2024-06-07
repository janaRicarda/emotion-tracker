import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const StyledLoginButton = styled.button`
  background: var(--button-background);
  color: var(--contrast-text);
  border-style: none;
  border-radius: 6px;
`;

const StyledLogoutButton = styled.button`
  background: var(--button-background);
  color: var(--contrast-text);
  border-style: none;
  border-radius: 6px;
`;

const StyledP = styled.p`
  font-size: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0.8rem;
`;

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <StyledP>Signed in as {session.user.name}</StyledP>
        <StyledLogoutButton onClick={() => signOut()}>
          Sign out
        </StyledLogoutButton>
      </>
    );
  }
  return (
    <StyledLoginButton onClick={() => signIn()}>Sign in</StyledLoginButton>
  );
}
