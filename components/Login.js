import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Logout from "../public/icons/logout.svg";

const StyledParagraph = styled.p`
  font-size: 0.7rem;
  display: ${({ $navigation }) => ($navigation ? "none" : "block")};
`;

const StyledLogoutButton = styled.button`
  color: ${({ $navigation }) =>
    $navigation ? "var(--contrast-text)" : "var(--main-dark)"};
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

export default function Login({ navigation }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { t: translate } = useTranslation(["common"]);

  if (session) {
    return (
      <>
        <StyledParagraph $navigation={navigation}>
          {translate("signedInAs")}
          {session.user.name}{" "}
        </StyledParagraph>
        <StyledLogoutButton
          $navigation={navigation}
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <StyledLogout $navigation={navigation} />
          {translate("signOut")}
        </StyledLogoutButton>
      </>
    );
  }
}
