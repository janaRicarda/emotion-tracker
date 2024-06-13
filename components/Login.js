import { useSession, signIn, signOut } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";
import Logout from "../public/icons/logout.svg";

const StyledParagraph = styled.p`
  font-size: 0.8rem;
  margin-right: 1.5rem;
  z-index: 2;
  display: ${({ $navigation }) => ($navigation ? "none" : "block")};
`;

const StyledLogoutButton = styled.button`
  color: var(--contrast-text);
  opacity: ${({ $disable }) => ($disable ? "0.5" : "1")};
  border-style: none;
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({ $navigation }) => ($navigation ? "1.4rem" : "1rem")};
`;

const StyledLogout = styled(Logout)`
  width: 1rem;
  fill: var(--contrast-text);
`;

export default function Login({ handleDemoModeOff, disable, navigation }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        <StyledParagraph $navigation={navigation}>
          Signed in as {session.user.name}{" "}
        </StyledParagraph>
        <StyledLogoutButton
          $navigation={navigation}
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
          <StyledLogout /> Sign out
        </StyledLogoutButton>
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
