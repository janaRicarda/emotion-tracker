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

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <StyledLogoutButton onClick={() => signOut()}>
          Sign out
        </StyledLogoutButton>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <StyledLoginButton onClick={() => signIn()}>Sign in</StyledLoginButton>
    </>
  );
}
