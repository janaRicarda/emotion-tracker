import { useSession, signIn, signOut } from "next-auth/react";
import { StyledButton, StyledStandardLink } from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";
import Profile from "../public/icons/account.svg";

const StyledParagraph = styled.p`
  font-size: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
`;

const StyledProfile = styled(Profile)`
  width: 1.5rem;
  fill: var(--main-dark);
`;

export default function Login({ handleDemoModeOff, disable }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        <StyledParagraph>
          Signed in as {session.user.name}{" "}
          <StyledStandardLink href="/profile-page">
            <StyledProfile />
          </StyledStandardLink>
        </StyledParagraph>
        <StyledButton
          $login
          $disable={disable}
          onClick={() => {
            if (disable) {
              return;
            }
            router.push("/");
            signOut();
          }}
        >
          Sign out
        </StyledButton>
      </>
    );
  }
  return (
    <StyledButton
      $login
      $disable={disable}
      onClick={() => {
        if (disable) {
          return;
        }
        router.push("/");
        handleDemoModeOff();
      }}
    >
      Sign in
    </StyledButton>
  );
}
