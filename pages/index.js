import styled from "styled-components";
import { useEffect, useState } from "react";
import { StyledStandardLink, StyledTitle } from "@/SharedStyledComponents";
import Head from "next/head";
import ToggleSwitch from "@/components/ToggleSwitch";
import ChartContainerV2 from "@/components/ChartContainerV2";
import {
  getAveragePerDay,
  getTimeSinceLastEntry,
  calculateTensionChartData,
  getFilteredEntriesV2,
} from "@/utils/dataAndChartUtils";
import { emotionData } from "@/lib/db";

const ToggleSwitchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  top: -30px;
  left: -27%;
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

const DashboardTitle = styled(StyledTitle)`
  margin-top: -10px;
`;

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 4fr 4fr 8fr;
  gap: 0.5rem;
  width: 92vw;
  min-width: ${({ $dashboardWidth }) => `${$dashboardWidth}px`};
  height: ${({ $dashboardHeight }) => `${$dashboardHeight}px`};
  /* min-height: 360px; */
  max-height: 1200px;
  margin: 0;
  align-items: center;
  border-radius: 18px;
  justify-content: center;
`;
const GridElement = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  padding: 0.5rem;
  min-height: 108px;
  height: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow);
`;
const ChartElement = styled.div`
  grid-column: 1 / 3;
  border-radius: 18px;
  padding: 0.2rem;
  min-height: 144px;
  height: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow);
`;
const ElementText = styled.p`
  font-size: 0.9rem;
  line-height: 1.2rem;
  text-align: left;
  padding: 0.2rem;
  margin: 0.1rem;
  background: ${({ $color }) =>
    $color ? $color : "var(--section-background)"};
  border-radius: 6px;
`;

const DashboardLink = styled(StyledStandardLink)`
  font-size: 0.9rem;
  width: 100%;
  height: 100%;
  align-self: center;
  padding: 0;
  /* border: 1px solid var(--main-dark); */
`;
export default function HomePage({
  handleToolTip,
  emotionEntries,
  toggleExampleData,
  useExampleData,
  theme,
}) {
  const [showInfoBox, setShowInfoBox] = useState(false);

  const newestDbEntryID = emotionEntries[emotionEntries.length - 1]._id;

  //make dashboard responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const dashboardWidth = Math.max(360, Math.round(windowWidth / 2));
  const dashboardHeight = Math.round(dashboardWidth * 1.25);
  // console.log(dashboardHeight);

  //for dashboard
  const averageEntriesPerDay = getAveragePerDay(emotionEntries);
  const timeSinceLastEntry = getTimeSinceLastEntry(emotionEntries);
  const sevenEmotions = emotionData.map((element) => element.name);
  const newestEmotionEntry = emotionEntries.find(
    (entry) => sevenEmotions.includes(entry.emotion) === true
  );
  const { emotion, intensity } = newestEmotionEntry;
  const slug = emotionData
    .filter((element) => element.name === emotion)
    .map((element) => element.slug);

  //chart logic
  const today = new Date().toISOString();
  const filteredEntries = getFilteredEntriesV2(today, emotionEntries);
  const xValues = calculateTensionChartData(filteredEntries).xValues;
  const yValues = calculateTensionChartData(filteredEntries).yValues;

  useEffect(() => {
    handleToolTip({
      text: "This is your dashboard ...",
    });
  }, []);

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
          text={"Use Example data "}
        />
      </ToggleSwitchWrapper>

      <DashboardTitle>Hallo emotion lover</DashboardTitle>
      <DashboardSection
        $dashboardWidth={dashboardWidth}
        $dashboardHeight={dashboardHeight}
      >
        <GridElement>
          <DashboardLink href="/app-manual">
            <ElementText>
              Track and explore your feelings ... how? You can look at the
              manual!
            </ElementText>
          </DashboardLink>

          {/* <p>
            Welcome to What a Feeling! Track and explore your feelings
            effortlessly. Log your tension level and dive into the depths of
            your emotions. From joy to sadness, our app helps you understand it
            all. Start your journey today. Welcome to What a Feeling - where
            emotions meet clarity.
          </p> */}
        </GridElement>
        <GridElement>
          <DashboardLink href="/add-entry">
            {" "}
            <ElementText>
              Your newest entry is {timeSinceLastEntry} hours ago. Do you want
              to record a new entry?
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <DashboardLink href="/emotion-records">
            <ElementText>
              Your average rate is {averageEntriesPerDay} entries per day. Click
              to see your recorded emotions.
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <ElementText>
            Last recorded emotion:<br></br>
          </ElementText>
          <ElementText $color={`var(--${slug})`}>
            {emotion}
            <br></br>Intensity: {intensity} %
          </ElementText>
        </GridElement>
        <ChartElement>
          <ChartContainerV2
            theme={theme}
            heightFactor={0.48}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
            autosize={false}
            showSwitches={false}
          ></ChartContainerV2>
        </ChartElement>
        {/* <GridElement>5</GridElement>
        <GridElement>6</GridElement> */}
      </DashboardSection>
    </>
  );
}
