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
  StyledTitle,
} from "@/SharedStyledComponents";

import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";
import ToggleSwitch from "@/components/ToggleSwitch";

import {
  getAveragePerDay,
  getTimeSinceLastEntry,
} from "@/utils/dataAndChartUtils";

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

const ToggleSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  top: 0px;
  left: 100px;
  transform: scale(0.7);
  padding: 0.1rem;
`;

const StyledInfoIcon = styled.span`
  background-color: var(--button-background);
  color: var(--contrast-text);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.1rem;
  line-height: 1.5rem;
  text-align: center;
`;

const StyledInfoBox = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  left: -6rem;
  top: 3rem;
  border: 1px solid white;
  border-radius: 6px;
  padding: 0.5rem;
  background-color: var(--button-background);
  color: var(--contrast-text);

  & > span {
    display: block;
  }

  & > :nth-child(2) {
    margin-top: 1rem;
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

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 6fr 6fr 6fr;
  gap: 0.5rem;
  width: 92vw;
  min-height: 420px;
  max-height: fit-content;
  margin: 0;
  align-items: center;
  border-radius: 18px;
  justify-content: center;
  /* background-color: var(--section-background); */

  @media ${breakpoints.mobileLandscape} {
  }
  @media ${breakpoints.tablet} {
  }
  @media ${breakpoints.laptop} {
    display: block;
    padding: 1rem;
    left: 5rem;
    width: 92vw;
  }
`;
const GridElement = styled.div`
  border-radius: 18px;
  padding: 0.5rem;
  border: 1px solid var(--main-dark);
  min-height: 136px;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
`;
const ChartElement = styled.div`
  grid-column: 1 / 3;
  border-radius: 18px;
  padding: 0.5rem;
  border: 1px solid var(--main-dark);
  min-height: 136px;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
`;
const ElementText = styled.p`
  font-size: 0.9rem;
  padding: 0.3rem;
  margin: 0.3rem;
`;

const DashboardLink = styled(StyledStandardLink)`
  font-size: 0.9rem;
  color: var(--contrast-text);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  padding: 0.5rem;
  background-color: var(--button-background);
`;
export default function HomePage({
  onAddEmotionEntry,
  handleToolTip,
  emotionEntries,
  toggleExampleData,
  useExampleData,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);
  const [showInfoBox, setShowInfoBox] = useState(false);

  //for dashboard
  const averageEntriesPerDay = getAveragePerDay(emotionEntries);
  const timeSinceLastEntry = getTimeSinceLastEntry(emotionEntries);

  const newestDbEntryID = emotionEntries[emotionEntries.length - 1]._id;

  useEffect(() => {
    handleToolTip({
      text: "On this page, you can indicate your level of tension on a range scale from 0 to 100. Afterward, simply press the Save-button to record your input.",
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newId = uid();

    onAddEmotionEntry(data, newId);
    setId(newId);
    setIsFormSubmitted(!isFormSubmitted);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <StyledTitle>Dashboard</StyledTitle>
      <DashboardSection>
        <GridElement>
          {/* click for more */}
          <ElementText>
            Welcome to What a Feeling! Track and explore your feelings ...
          </ElementText>
          {/* <p>
            Welcome to What a Feeling! Track and explore your feelings
            effortlessly. Log your tension level and dive into the depths of
            your emotions. From joy to sadness, our app helps you understand it
            all. Start your journey today. Welcome to What a Feeling - where
            emotions meet clarity.
          </p> */}
        </GridElement>
        <GridElement>
          <p>Your last entry is {timeSinceLastEntry} hours ago. </p>
          <br></br>
          <DashboardLink href="/add-entry">add new entry</DashboardLink>
        </GridElement>
        <GridElement>
          <ElementText>
            Great job! Your average rate is {averageEntriesPerDay} entries per
            day.
          </ElementText>
          <DashboardLink href="/emotion-records">emotion records</DashboardLink>
        </GridElement>
        <GridElement>4</GridElement>
        <ChartElement></ChartElement>
        {/* <GridElement>5</GridElement>
        <GridElement>6</GridElement> */}
      </DashboardSection>
      <StyledFlexColumnWrapper>
        <ToggleSwitchWrapper>
          <StyledInfoIcon
            onClick={() => {
              setShowInfoBox(!showInfoBox);
            }}
          >
            &#8505;
          </StyledInfoIcon>
          <StyledInfoBox
            onClick={() => {
              setShowInfoBox(false);
            }}
            $show={showInfoBox}
          >
            <span>
              OFF: Displayed Data is real and comes from your own database.
            </span>
            <span> ON: Data is generated locally and fictional.</span>
          </StyledInfoBox>
          <ToggleSwitch
            handleSwitch={toggleExampleData}
            isChecked={useExampleData}
            text={"Use Example data"}
          />
        </ToggleSwitchWrapper>
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
              <SaveButton type="submit">Save</SaveButton>
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
                />
                <StyledAddDetailsLink
                  href={{
                    pathname: "/create",
                    query: { id: useExampleData ? id : newestDbEntryID },
                  }}
                  forwardedAs={`/create`}
                >
                  Add more details
                </StyledAddDetailsLink>
              </StyledButtonWrapper>
            </>
          )}
        </StyledTensionForm>
      </StyledFlexColumnWrapper>
    </>
  );
}
