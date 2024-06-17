import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Logout from "../public/icons/logout.svg";

const StyledParagraph = styled.p`
  font-size: 0.7rem;
  display: ${({ $navigation }) => ($navigation ? "none" : "block")};
`;

const StyledLogoutButton = styled.button`
  color: ${({ $navigation }) =>
    $navigation ? "var(--contrast-text)" : "var(--main-dark)"};
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
  fill: ${({ $navigation }) =>
    $navigation ? "var(--contrast-text)" : "var(--main-dark)"};
`;

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
}
