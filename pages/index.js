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
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TensionChart = dynamic(() => import("../components/TensionChart"), {
  ssr: false,
});

const StyledTensionForm = styled(StyledForm)`
  margin: 1rem;
  align-items: center;
  width: 80vw;
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

const StyledGraphButton = styled(StyledButton)`
  width: fit-content;
  padding: 0.5rem;
  border-style: none;
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

export default function HomePage({
  onAddEmotionEntry,
  handleToolTip,
  emotionEntries,
  theme,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);
  const [chartIsShown, setChartIsShown] = useState(true);

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

  //logic for Graph
  const currentShortDate = new Date().toISOString().slice(0, 10);
  function compare(a, b) {
    if (a.isoDate < b.isoDate) {
      return -1;
    }
    if (a.isoDate > b.isoDate) {
      return 1;
    }
    return 0;
  }
  const filteredData = emotionEntries
    .filter((entry) => currentShortDate === entry.isoDate?.slice(0, 10))
    .sort(compare);
  const xValues = filteredData.map((entry) => entry.timeAndDate.slice(-5));
  const yValues = filteredData.map((entry) => entry.tensionLevel);
  function handleChart() {
    setChartIsShown(!chartIsShown);
  }

  return (
    <>
      <StyledFlexColumnWrapper>
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
                  href={{ pathname: "/create", query: { id: id } }}
                  forwardedAs={`/create`}
                >
                  {translate("addMoreDetails")}
                </StyledAddDetailsLink>
              </StyledButtonWrapper>
            </>
          )}
        </StyledTensionForm>

        {chartIsShown && (
          <TensionChart
            emotionEntries={emotionEntries}
            theme={theme}
            xValues={xValues}
            yValues={yValues}
            title={translate("graphTitle")}
          />
        )}

        <StyledGraphButton type="button" onClick={handleChart}>
          {chartIsShown === true
            ? `${translate("hideChart")}`
            : `${translate("showChart")}`}
        </StyledGraphButton>
      </StyledFlexColumnWrapper>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
