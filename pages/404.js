import {
  StyledButton,
  StyledFlexColumnWrapper,
  StyledStandardLink,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Wrapper = styled(StyledFlexColumnWrapper)`
  margin-top: 4rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StyledLink = styled(StyledStandardLink)`
  width: 8rem;
  padding: 0.5rem;
  background-color: var(--button-background);
`;

const StyledBackButton = styled(StyledButton)`
  width: 8rem;
  border: none;
  padding: 0.5rem;
  height: auto;
`;

export default function Custom404() {
  const { t: translate } = useTranslation("common");

  const router = useRouter();

  return (
    <Wrapper>
      <h2>{translate("404")}</h2>
      <h2>{translate("pageDoesntExist")}</h2>
      <LinkWrapper>
        <StyledLink href={"/"}>{translate("backToHomepageButton")}</StyledLink>
        <StyledBackButton onClick={() => router.back()}>
          {translate("backToPreviousPage")}
        </StyledBackButton>
      </LinkWrapper>
    </Wrapper>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "emotions",
        "common",
        "navigation",
      ])),
    },
  };
}
