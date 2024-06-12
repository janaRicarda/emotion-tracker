import {
  StyledFlexColumnWrapper,
  StyledWrapper,
  StyledButton,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const StyledMessageWrapper = styled(StyledFlexColumnWrapper)`
  height: fit-content;
  background-color: var(--section-background);
  border-radius: 6px;
  border: 1px solid var(--main-dark);
  margin-top: 2rem;
  & > * {
    margin: 1rem 0;
  }
`;

const StyledErrorButtonBox = styled(StyledWrapper)`
  justify-content: space-evenly;
`;
const StyledErrorButton = styled(StyledButton)`
  width: 8rem;
`;

export default function ErrorMessage({ errorMessage }) {
  const router = useRouter();
  const previousURL = router.query.currentURL;
  const isHomePage = router.route === "/";

  const { t: translate } = useTranslation("common");

  return (
    <StyledMessageWrapper>
      <h2>{translate("sorryError")}</h2>
      <b>{translate("gotRedirected")}</b>
      <p>{translate("typeOfErrorMessage")}</p>
      <p>{errorMessage}</p>
      <StyledErrorButtonBox>
        <StyledErrorButton
          onClick={() =>
            previousURL ? router.push(previousURL) : router.reload()
          }
        >
          {translate("tryAgainButton")}
        </StyledErrorButton>
        <StyledErrorButton
          onClick={() => (isHomePage ? router.reload() : router.push("/"))}
        >
          {translate("backToHomepageButton")}
        </StyledErrorButton>
      </StyledErrorButtonBox>
    </StyledMessageWrapper>
  );
}
