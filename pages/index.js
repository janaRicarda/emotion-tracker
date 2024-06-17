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

const ProgressBar = styled.div`
  width: 90%;
  height: 0.8rem;
  border: 1px solid var(--main-dark);
  position: relative;
  display: inline-block;
  margin: 0 0.5rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    top: 20%;
    height: 60%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0"};
    background: var(--main-bright);
    border-radius: 6px;
    transition: width 400ms;
    transition-delay: ${({ $showDetails }) => ($showDetails ? "500ms" : "0ms")};
  }
`;

const DashboardTitle = styled(StyledTitle)`
  margin-top: -10px;
`;

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 5fr 5fr;
  grid-template-rows: 5.5fr 5.5fr 9fr;
  color: var(--main-dark);
  gap: ${({ $gap }) => `${$gap}rem`};
  /* gap: 2rem; */
  width: 90vw;
  min-width: ${({ $dashboardWidth }) => `${$dashboardWidth}px`};
  height: ${({ $dashboardHeight }) => `${$dashboardHeight}px`};
  max-width: 1200px;
  max-height: 1000px;
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
  width: 100%;
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
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};
  line-height: ${({ $lineHeight }) => `${$lineHeight}rem`};
  text-align: left;
  padding: 0.6rem 0.4rem;
  margin: 0.1rem;
  border-radius: 12px;
`;

const EmotionText = styled(ElementText)`
  padding: 0.4rem;
  margin: 0;
  margin-top: -10px;
  background: ${({ $color }) =>
    $color ? $color : "var(--section-background)"};
  width: 80%;
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
  locale,
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

  const dashboardWidth = Math.min(
    1080,
    Math.max(344, Math.round(windowWidth / 2))
  );
  const dashboardHeight = Math.round(dashboardWidth * 1.33);
  const fontSize = Math.min(1.4, Math.max(0.8, windowWidth / 1000));
  const showDetails = true;

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
      text: "This is your dashboard. You can use it to get an overview abouzt what the app can do for you and what you did with it recently.",
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
        $gap={fontSize * 0.3}
      >
        <GridElement>
          <DashboardLink href="/app-manual">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
              Track and explore your feelings ... how? You can look at the
              <BoldText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
                {" "}
                manual
              </BoldText>
              !
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
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
              Your newest entry is <BoldText>{timeSinceLastEntry}</BoldText>{" "}
              hours ago. Do you want to record a <BoldText>new entry</BoldText>?
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <DashboardLink href="/emotion-records">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
              Your average is <BoldText>{averageEntriesPerDay}</BoldText>{" "}
              entries per day. You can go to your{" "}
              <BoldText>recorded emotions</BoldText>.
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
            Last recorded emotion:
          </ElementText>
          <EmotionText
            $fontSize={fontSize}
            $lineHeight={fontSize * 1.33}
            $color={`var(--${slug})`}
          >
            <BoldText>{emotion}</BoldText>
            <br></br>Intensity: {intensity} %<br></br>
            <ProgressBar $showDetails={showDetails} $progress={intensity} />
          </EmotionText>
        </GridElement>
        <ChartElement>
          <ChartContainerV2
            theme={theme}
            width={dashboardWidth - 45}
            heightFactor={0.48}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
            autosize={false}
            showSwitches={false}
            locale={locale}
          ></ChartContainerV2>
        </ChartElement>
        {/* <GridElement>5</GridElement>
        <GridElement>6</GridElement> */}
      </DashboardSection>
    </>
  );
}
