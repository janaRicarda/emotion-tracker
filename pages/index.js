import styled from "styled-components";
import { useState } from "react";
import { uid } from "uid";
import {
  StyledWrapper,
  StyledButton,
  StyledStandardLink,
  StyledInput,
  StyledForm,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";
import Tooltip from "@/components/Tooltip";
import dynamic from "next/dynamic";

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
  background-color: ${({ $actionButton }) =>
    $actionButton ? "var(--button-background)" : "white"};
  border: ${({ $actionButton }) =>
    $actionButton ? "1px solid black" : "none"};
`;

export default function HomePage({
  onAddEmotionEntry,
  handleToggleTooltip,
  emotionEntries,
  theme,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);
  const [chartIsShown, setChartIsShown] = useState(true);

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

  const xValues = emotionEntries
    .filter((entry) => currentShortDate === entry.isoDate?.slice(0, 10))
    .sort(compare)
    .map((entry) => entry.timeAndDate.slice(-5));

  const yValues = emotionEntries
    .filter((entry) => currentShortDate === entry.isoDate?.slice(0, 10))
    .sort(compare)
    .map((entry) => entry.tensionLevel);

  function handleChart() {
    setChartIsShown(!chartIsShown);
  }

  return (
    <>
      <Tooltip onClick={handleToggleTooltip}>
        On this page, you can indicate your level of tension on a range scale
        from 0 to 100. Afterward, simply press the Save-button to record your
        input.
      </Tooltip>
      <StyledFlexColumnWrapper>
        <StyledTensionForm onSubmit={handleSubmit}>
          <StyledTensionLabel htmlFor="tension-level">
            On a scale from 0 to 100, how tense do you feel in this moment?
          </StyledTensionLabel>
          <StyledInput
            aria-label="Adjust tension level between 0 and 100"
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
              <StyledButton type="submit">Save</StyledButton>
            </>
          )}

          {isFormSubmitted && (
            <>
              <StyledMessage>Your entry was successfully saved!</StyledMessage>
              <StyledButtonWrapper>
                <StyledBackButton
                  type="reset"
                  value={"Done"}
                  onClick={() => {
                    setIsFormSubmitted(!isFormSubmitted);
                    setTension("0");
                  }}
                ></StyledBackButton>
                <StyledAddDetailsLink
                  href={{ pathname: "/create", query: { id: id } }}
                  forwardedAs={`/create`}
                >
                  Add more details
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
            title="Daily Tension Graph"
          />
        )}

        <StyledGraphButton type="button" onClick={handleChart}>
          {chartIsShown === true ? "Hide chart" : "Show chart"}
        </StyledGraphButton>
      </StyledFlexColumnWrapper>
    </>
  );
}
