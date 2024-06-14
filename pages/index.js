import styled from "styled-components";
import { useEffect, useState } from "react";
import { StyledStandardLink, StyledTitle } from "@/SharedStyledComponents";
import Head from "next/head";
import ChartContainerV2 from "@/components/ChartContainerV2";
import {
  getAveragePerDay,
  getTimeSinceLastEntry,
  calculateTensionChartData,
  getFilteredEntriesV2,
  getNewestEmotion,
  compareHightToLow,
} from "@/utils/dataAndChartUtils";

import { useSession } from "next-auth/react";

const DashboardTitle = styled(StyledTitle)`
  margin-top: -10px;
`;

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 4fr 4fr 8fr;
  color: var(--main-dark);
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
  color: var(--main-dark);
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
const BoldText = styled.span`
  font-weight: 600;
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
  theme,
  demoMode,
}) {
  const { data: session } = useSession();

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
  //console.log(dashboardHeight);

  //dashboard logic

  const dashboardEntries = emotionEntries.toSorted(compareHightToLow);

  const averageEntriesPerDay = getAveragePerDay(dashboardEntries);
  const timeSinceLastEntry = getTimeSinceLastEntry(dashboardEntries);
  const { emotion, intensity, slug } = getNewestEmotion(dashboardEntries);

  //chart logic
  const today = new Date().toISOString();
  const filteredEntries = getFilteredEntriesV2(today, emotionEntries);
  const xValues = calculateTensionChartData(filteredEntries).xValues;
  const yValues = calculateTensionChartData(filteredEntries).yValues;

  useEffect(() => {
    handleToolTip({
      text: "This is your dashboard. You can use it to get an overview abouzt what th app can do for you and what you did with it recently.",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <DashboardTitle>
        Hallo {session ? session.user.name : "demo user"}
      </DashboardTitle>
      <DashboardSection
        $dashboardWidth={dashboardWidth}
        $dashboardHeight={dashboardHeight}
      >
        <GridElement>
          <DashboardLink href="/app-manual">
            <ElementText>
              Track and explore your feelings ... how? You can look at the
              <BoldText> manual</BoldText>!
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
            <ElementText>
              Your newest entry is <BoldText>{timeSinceLastEntry}</BoldText>{" "}
              hours ago. Do you want to record a <BoldText>new entry</BoldText>?
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <DashboardLink href="/emotion-records">
            <ElementText>
              Your average rate is <BoldText>{averageEntriesPerDay}</BoldText>{" "}
              entries per day. Click to see your{" "}
              <BoldText>recorded emotions</BoldText>.
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
