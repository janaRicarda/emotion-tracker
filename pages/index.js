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
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import EmotionListDashboard from "@/components/EmotionListDashboard";
import { breakpoints } from "@/utils/breakpoints";

const ProgressBar = styled.div`
  width: 42%;
  max-width: 200px;
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
  margin-top: -1.5rem;
`;

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 3.8fr 3.8fr ${({ $gridFactor }) => `${$gridFactor}fr`};
  color: var(--main-dark);
  gap: ${({ $gap }) => `${$gap}rem`};
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
  min-height: 110px;
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
  min-height: 175px;
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
  padding: 0.5rem 0.42rem;
  margin: 0.1rem;
  border-radius: 12px;
`;

const EmotionText = styled(ElementText)`
  padding: 0.42rem;
  margin: -5px 0.5rem 0.5rem;
  background: ${({ $color }) =>
    $color ? $color : "var(--section-background)"};
  width: 92%;
`;
const BoldText = styled.span`
  font-weight: 600;
`;

const DashboardLink = styled(StyledStandardLink)`
  /* font-size: 0.8rem; */
  width: 100%;
  height: 100%;
  align-self: center;
  padding: 0;
`;

export default function HomePage({
  handleToolTip,
  emotionEntries,
  theme,
  locale,
  onHandleGridEmotion,
}) {
  const { data: session } = useSession();
  const router = useRouter();

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
  const gridFactor = 1.8 + windowWidth / 100;
  const showDetails = true;

  // console.log("Dashboardwidth:", dashboardWidth);
  // console.log(fontSize);
  // console.log("Gridfactor:", gridFactor);

  //dashboard logic
  const dashboardEntries = emotionEntries.toSorted(compareHightToLow);
  const averageEntriesPerDay = getAveragePerDay(dashboardEntries);
  const timeSinceLastEntry = getTimeSinceLastEntry(dashboardEntries);
  const { emotion, intensity, slug, id, _id, description } =
    getNewestEmotion(dashboardEntries);

  function handleGridEmotion(id) {
    router.push("/emotion-records");
    onHandleGridEmotion(id);
  }

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
        $gridFactor={gridFactor}
      >
        <GridElement>
          <DashboardLink href="/app-manual">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
              Track and explore your feelings. Start your journey today ... how?
              You can look at the
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
              hours ago. Your average is{" "}
              <BoldText>{averageEntriesPerDay}</BoldText> entries per day. Do
              you want to record a <BoldText>new entry</BoldText>?
            </ElementText>
          </DashboardLink>
        </GridElement>

        <GridElement onClick={() => handleGridEmotion(_id)}>
          <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
            Last recorded emotion:
          </ElementText>
          <EmotionText
            $fontSize={fontSize}
            $lineHeight={fontSize * 1.33}
            $color={`var(--${slug})`}
          >
            <BoldText>{emotion}</BoldText>
            <br></br>Intensity:{" "}
            <ProgressBar $showDetails={showDetails} $progress={intensity} />
            {intensity} %
          </EmotionText>
        </GridElement>
        <GridElement>
          <DashboardLink href="/emotions">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
              <BoldText>{emotion}</BoldText>
              <br></br>
              {description} Want to know more about the{" "}
              <BoldText>7 basic emotions</BoldText>?
            </ElementText>
          </DashboardLink>
        </GridElement>
        <ChartElement>
          <ChartContainerV2
            theme={theme}
            width={Math.max(300, Math.round(50 + windowWidth / 2))}
            heightFactor={0.45}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
            autosize={false}
            showSwitches={false}
            locale={locale}
          ></ChartContainerV2>
        </ChartElement>
      </DashboardSection>
    </>
  );
}
