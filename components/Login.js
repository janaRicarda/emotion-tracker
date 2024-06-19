import { useSession, signIn, signOut } from "next-auth/react";
import { StyledButton } from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const StyledParagraph = styled.p`
  font-size: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0.8rem;
`;

export default function Login({ handleDemoModeOff, disable }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { t: translate } = useTranslation(["common"]);

  if (session) {
    return (
      <>
        <StyledParagraph>
          {translate("signedInAs")}
          {session.user.name}
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
          {translate("signOut")}
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
      {translate("signIn")}
    </StyledButton>
  );
}
