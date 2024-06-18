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
import ArrowBack from "./../public/icons/arrow-left.svg";

const ProgressBar = styled.div`
  width: 42%;
  max-width: 200px;
  height: 0.8rem;
  border: 1px solid var(--contrast-text);
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
  min-height: 110px;
  height: 100%;
  width: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow);
  border: var(--circle-border);
`;
const ChartElement = styled.div`
  grid-column: 1 / 3;
  border-radius: 18px;
  padding: 0;
  min-height: 170px;
  height: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow);
  border: var(--circle-border);
`;
const ElementText = styled.p`
  color: var(--main-dark);
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};
  line-height: ${({ $lineHeight }) => `${$lineHeight}rem`};
  text-align: left;
  padding: 0.5rem 0.42rem;
  margin: 0.1rem;
  border-radius: 12px;
`;

const EmotionText = styled(ElementText)`
  color: var(--text-on-bright);
  padding: 0.42rem;
  margin: -5px 0.5rem 0.5rem;
  background: ${({ $color }) =>
    $color ? $color : "var(--section-background)"};
  width: 92%;
`;
const BoldText = styled.span`
  font-weight: 600;
`;

const StyledForwardArrow = styled(ArrowBack)`
  width: 1rem;
  transform: rotate(180deg);
  fill: var(--main-dark);
`;

const ArrowWrapper = styled.div`
  display: flex;
  padding: 0.4rem 0;
`;

const DashboardLink = styled(StyledStandardLink)`
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
  demoMode,
  handleChartRef,
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
  const gridFactor = 1.9 + windowWidth / 100;
  const dashboardHeight = Math.round(dashboardWidth * 1.3 + gridFactor * 6);
  const fontSize = Math.min(1.24, Math.max(0.8, windowWidth / 1000));
  console.log("gridfactor: ", gridFactor);
  console.log("FontSize: ", fontSize);

  const showDetails = true;

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
      text: "This is your dashboard. You can use it to get an overview about what the app can do for you and what you did with it recently.",
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
        $gap={fontSize * 0.25}
        $gridFactor={gridFactor}
      >
        <GridElement>
          <DashboardLink href="/app-manual">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
              Track and explore your feelings... how? <br></br>You can look at
              the
              <ArrowWrapper>
                {" "}
                <StyledForwardArrow />
                <BoldText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
                  {" "}
                  manual
                </BoldText>
              </ArrowWrapper>
            </ElementText>
          </DashboardLink>
        </GridElement>
        <GridElement>
          <DashboardLink href="/add-entry">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
              <BoldText>Last entry: </BoldText> <br></br> {timeSinceLastEntry}{" "}
              hours ago. <br></br>
              <BoldText>Average: </BoldText>
              <br></br>
              {averageEntriesPerDay} entries per day.
              <ArrowWrapper>
                <StyledForwardArrow />
                <BoldText>add new entry</BoldText>
              </ArrowWrapper>
            </ElementText>
            <ElementText
              $fontSize={fontSize}
              $lineHeight={fontSize * 0.5}
            ></ElementText>
          </DashboardLink>
        </GridElement>

        <GridElement onClick={() => handleGridEmotion(demoMode ? id : _id)}>
          <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
            Last recorded emotion:
          </ElementText>
          <EmotionText
            $fontSize={fontSize}
            $lineHeight={fontSize * 1.3}
            $color={`var(--${slug})`}
          >
            <BoldText>{emotion}</BoldText>
            <br></br>Intensity:{" "}
            <ProgressBar $showDetails={showDetails} $progress={intensity} />
            {intensity} %
          </EmotionText>
        </GridElement>
        <GridElement>
          <DashboardLink href={`/emotions/${slug}`}>
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.33}>
              <BoldText>{emotion}</BoldText>
              <br></br> {description}
              <ArrowWrapper>
                {" "}
                <StyledForwardArrow />
                <BoldText>more about {slug} </BoldText>
              </ArrowWrapper>
            </ElementText>
          </DashboardLink>
        </GridElement>
        <ChartElement>
          <ChartContainerV2
            theme={theme}
            width={Math.max(290, Math.round(36 + windowWidth / 1.6))}
            heightFactor={0.46}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
            autosize={false}
            showSwitches={false}
            locale={locale}
            handleChartRef={handleChartRef}
          ></ChartContainerV2>
        </ChartElement>
      </DashboardSection>
    </>
  );
}
