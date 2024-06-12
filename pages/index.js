import styled from "styled-components";
import { useEffect, useState } from "react";
import { uid } from "uid";
import {
  StyledWrapper,
  StyledButton,
  StyledStandardLink,
  StyledInput,
  StyledForm,
  StyledTitle,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";

import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";
import ToggleSwitch from "@/components/ToggleSwitch";
import {
  getAveragePerDay,
  getTimeSinceLastEntry,
  calculateTensionChartData,
  getFilteredEntriesV2,
} from "@/utils/dataAndChartUtils";

import ChartContainerV2 from "@/components/ChartContainerV2";

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

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 6fr 6fr 6fr;
  gap: 0.5rem;
  width: 92vw;
  min-height: 420px;
  max-height: 1200px;
  margin: 0;
  align-items: center;
  border-radius: 18px;
  justify-content: center;

  @media ${breakpoints.mobileLandscape} {
  }
  @media ${breakpoints.tablet} {
  }
  @media ${breakpoints.laptop} {
    display: block;
    padding: 1rem;
    width: 92vw;
  }
`;
const GridElement = styled.div`
  display: flex;
  flex-direction: column;
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
  theme,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);

  const newestDbEntryID = emotionEntries[emotionEntries.length - 1]._id;

  //for dashboard
  const averageEntriesPerDay = getAveragePerDay(emotionEntries);
  const timeSinceLastEntry = getTimeSinceLastEntry(emotionEntries);

  //chart
  // const { title, xTitle, yTitle, scatter } = chartPresets.tension;
  const today = new Date().toISOString();
  const filteredEntries = getFilteredEntriesV2(today, emotionEntries);
  const xValues = calculateTensionChartData(filteredEntries).xValues;
  const yValues = calculateTensionChartData(filteredEntries).yValues;

  useEffect(() => {
    handleToolTip({
      text: "This is your dashboard ...",
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
        <ChartElement>
          <ChartContainerV2
            theme={theme}
            heightFactor={0.25}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
          ></ChartContainerV2>
        </ChartElement>
        {/* <GridElement>5</GridElement>
        <GridElement>6</GridElement> */}
      </DashboardSection>
    </>
  );
}
