import styled from "styled-components";
import { useEffect, useState } from "react";
import { uid } from "uid";
import {
  StyledWrapper,
  StyledButton,
  StyledStandardLink,
  StyledInput,
  StyledForm,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";
import ToggleSwitch from "@/components/ToggleSwitch";
import Icon from "@mdi/react";
import { useRouter } from "next/router";

const StyledTensionForm = styled(StyledForm)`
  margin: 1rem;
  padding: 1rem;
  align-items: center;
  width: 80vw;
  background: var(--section-background);
  border-radius: 6px;
  @media ${breakpoints.mobileLandscape} {
    height: 60vh;
    padding: 1rem;
    margin-top: 0;
  }
  @media ${breakpoints.tablet} {
    width: 60vw;
  }
  @media ${breakpoints.laptop} {
    width: 40vw;
  }
`;

const StyledTensionLabel = styled.label`
  padding: 1rem 1rem 2rem;
  text-align: center;
`;

const StyledSpan = styled.span`
  padding: 0.6rem 0 0;
  font-size: 1.2rem;
`;

const StyledTensionDisplay = styled.p`
  font-size: 1.2rem;
  margin: 0 0 1rem;
`;

const StyledMessage = styled.p`
  align-self: center;
  text-align: center;
  font-weight: 600;
  margin: 1rem auto;
`;

const StyledButtonWrapper = styled(StyledWrapper)`
  justify-content: center;
`;

const SaveButton = styled(StyledButton)`
  border: none;
`;

const StyledBackButton = styled.input`
  width: 10rem;
  text-decoration: none;
  color: var(--contrast-text);
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  border-style: none;
  text-align: center;
  background-color: var(--button-background);
`;
const StyledAddDetailsLink = styled(StyledStandardLink)`
  color: var(--contrast-text);
  width: 10rem;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: var(--button-background);
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  margin: 0 0 0.8rem;
  gap: 0.1rem;
  background-color: var(--section-background);
  border-radius: 6px;
`;

const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

export default function HomePage({
  onAddEmotionEntry,
  handleToolTip,
  emotionEntries,
  useExampleData,
}) {
  const router = useRouter();

  const { pathname, asPath, query, locale, defaultLocale } = router;

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);

  const newestDbEntryID = emotionEntries?.length
    ? emotionEntries[emotionEntries.length - 1]?._id
    : null;

  const { t: translate } = useTranslation("common");

  useEffect(() => {
    handleToolTip({
      text: `${translate("toolTipText")}`,
    });
  }, [translate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newId = uid();

    onAddEmotionEntry(data, newId);
    setId(newId);
    setIsFormSubmitted(!isFormSubmitted);
  }

  function handleChangeLanguage() {
    const newLocale = locale === "en" ? "de" : "en";
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <StyledFlexColumnWrapper>
        <ToggleContainer>
          en
          <SwitchSizer>
            <ToggleSwitch
              handleSwitch={handleChangeLanguage}
              useButtonColor={true}
            />
          </SwitchSizer>
          de
        </ToggleContainer>
        <StyledTensionForm onSubmit={handleSubmit}>
          <StyledTensionLabel htmlFor="tension-level">
            {translate("introQuestion")}
          </StyledTensionLabel>
          <StyledInput
            aria-label={translate("inputAriaLabel")}
            id="tension-level"
            name="tensionLevel"
            type="range"
            value={tension}
            $value={tension}
            max={100}
            onChange={(event) => setTension(event.target.value)}
          />
          <StyledWrapper>
            <StyledSpan>0</StyledSpan>
            <StyledSpan>100</StyledSpan>
          </StyledWrapper>

          {!isFormSubmitted && (
            <>
              <StyledTensionDisplay>{tension}</StyledTensionDisplay>
              <SaveButton type="submit">{translate("save")}</SaveButton>
            </>
          )}

          {isFormSubmitted && (
            <>
              <StyledMessage>{translate("successMessage")}</StyledMessage>
              <StyledButtonWrapper>
                <StyledBackButton
                  type="reset"
                  value={translate("done")}
                  onClick={() => {
                    setIsFormSubmitted(!isFormSubmitted);
                    setTension("0");
                  }}
                />

                <StyledAddDetailsLink
                  href={{
                    pathname: "/create",
                    query: { id: useExampleData ? id : newestDbEntryID },
                  }}
                  forwardedAs={`/create`}
                >
                  {translate("addMoreDetails")}
                </StyledAddDetailsLink>
              </StyledButtonWrapper>
            </>
          )}
        </StyledTensionForm>
      </StyledFlexColumnWrapper>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  };
}
