import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Logout from "../public/icons/logout.svg";

const StyledParagraph = styled.p`
  font-size: 0.7rem;
  display: ${({ $navigation }) => ($navigation ? "none" : "block")};
`;

const StyledLogoutButton = styled.button`
  color: var(--contrast-text);
  opacity: ${({ $disable }) => ($disable ? "0.5" : "1")};
  border-style: none;
  background: transparent;
  text-align: center;
  padding-right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({ $navigation }) => ($navigation ? "1.4rem" : "0.7rem")};
  font-weight: ${({ $navigation }) => ($navigation ? "500" : "400")};
`;

const StyledLogout = styled(Logout)`
  width: ${({ $navigation }) => ($navigation ? "1.4rem" : "0.7rem")};
  fill: var(--contrast-text);
`;
/* const StyledLoginButton = styled.button`
  border-style: none;
  background: transparent;
  color: var(--contrast-text);
  opacity: ${({ $disable }) => ($disable ? "0.5" : "1")};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
`; */

export default function Login({ disable, navigation }) {
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
          <StyledLogout $navigation={navigation} /> Sign out
        </StyledLogoutButton>
      </>
    );
  }
  return {
    /* <StyledLoginButton
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
      quit to log in
    </StyledLoginButton> */
  };
}
