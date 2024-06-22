import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { StyledStandardLink, StyledTitle } from "@/SharedStyledComponents";
import {
  getAveragePerDay,
  getTimeSinceLastEntry,
  calculateTensionChartData,
  getFilteredEntriesV2,
  getNewestEmotion,
  compareHightToLow,
} from "@/utils/dataAndChartUtils";
import { useRouter } from "next/router";
import ArrowBack from "./../public/icons/arrow-left.svg";
import { shortEmotionDescriptions } from "@/lib/db";
import DashboardChart from "@/components/DashboardChart";
import DashboardWheel from "./DashboardWheel";

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 6fr 6fr;
  grid-template-rows: 4fr 7fr ${({ $gridFactor }) => `${$gridFactor}fr`};
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
  min-height: 120px;
  height: 100%;
  width: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow-small);
  border: var(--circle-border);
`;

const LeftShape = styled.div`
  /* border: 1px solid var(--main-dark); */
  /* width: 170px;
  height: 120px; */
  clip-path: polygon(
    0 0,
    100% 0,
    85% 5%,
    75% 8%,
    68% 15%,
    55% 30%,
    52% 40%,
    50% 50%,
    52% 60%,
    55% 70%,
    68% 80%,
    80% 90%,
    100% 100%,
    0 100%
  );
  border-radius: 18px;
  padding: 0.5rem;
  min-height: 110px;
  height: 100%;
  width: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow-small);
  /* border: var(--circle-border); */
  color: var(--main-dark);
  /* z-index: 2; */
`;

const ProgressBar = styled.div`
  width: 42%;
  max-width: 200px;
  height: 0.8rem;
  border: 1px solid var(--text-on-bright);
  position: relative;
  display: inline-block;
  margin: 0 0.5rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0"};
    background: var(--text-on-bright);
    border-radius: 6px;
    transition: width 400ms;
    transition-delay: ${({ $showDetails }) => ($showDetails ? "500ms" : "0ms")};
  }
`;

const ChartElement = styled.div`
  grid-column: 1 / 3;
  border-radius: 18px;
  padding-top: 0;
  position: relative;
  min-height: 190px;
  height: 100%;
  align-content: center;
  align-items: center;
  background-color: var(--section-background);
  box-shadow: var(--box-shadow-small);
  border: var(--circle-border);
`;
const ElementText = styled.div`
  color: var(--main-dark);
  font-size: ${({ $fontSize }) => `${$fontSize}rem`};
  line-height: ${({ $lineHeight }) => `${$lineHeight}rem`};
  text-align: left;
  padding: 0.5rem 0.42rem;
  margin: 0.1rem;
  border-radius: 12px;
  letter-spacing: -0.2px;
`;

const EmotionText = styled(ElementText)`
  color: var(--text-on-bright);
  padding: 0.6rem 0.8rem 0.6rem 0.6rem;
  margin: 0.1rem 0.5rem 0.1rem 0.1rem;
  background: ${({ $color }) =>
    $color ? $color : "var(--section-background)"};
  width: 98%;
  height: 93%;
`;
const BoldText = styled.span`
  font-weight: 600;
`;

const StyledForwardArrow = styled(ArrowBack)`
  width: 1rem;
  transform: rotate(180deg);
  fill: ${({ $darkArrow }) =>
    $darkArrow ? "var(--text-on-bright)" : "var(--main-dark)"};
`;

const ArrowWrapper = styled.div`
  display: flex;
  padding: 0.4rem 0;
`;

const ChartLinkWrapper = styled.section`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  width: 280px;
  display: flex;
  z-index: 1;
`;

const DashboardLink = styled(StyledStandardLink)`
  width: 100%;
  height: 100%;
  align-self: center;
  padding: 0;
`;

export default function Dashboard({
  emotionEntries,
  theme,
  locale,
  onHandleGridEmotion,
  onHandleChartLink,
  demoMode,
  handleChartRef,
}) {
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
  const gridFactor = 1.2 + windowWidth / 100;
  const dashboardHeight = Math.round(dashboardWidth * 1.32 + gridFactor * 6);
  const fontSize = Math.min(1.2, Math.max(0.8, windowWidth / 1000));

  //for ProgressBar
  const showDetails = true;

  //dashboard logic
  const dashboardEntries =
    emotionEntries.length === 0
      ? []
      : emotionEntries.toSorted(compareHightToLow);
  const averageEntriesPerDay =
    emotionEntries.length === 0 ? 0 : getAveragePerDay(dashboardEntries);
  const timeSinceLastEntry =
    emotionEntries.length === 0
      ? "You did not make any entries yet!"
      : getTimeSinceLastEntry(dashboardEntries);
  const { emotion, intensity, slug, id, _id } =
    getNewestEmotion(dashboardEntries);

  function handleGridEmotion(id) {
    router.push("/emotion-records/");
    onHandleGridEmotion(id);
  }

  function handleChartLink() {
    router.push("/emotion-records");
    onHandleChartLink();
  }

  //chart logic
  const today = new Date().toISOString();
  const filteredEntries = getFilteredEntriesV2(today, emotionEntries);
  const xValues = calculateTensionChartData(filteredEntries).xValues;
  const yValues = calculateTensionChartData(filteredEntries).yValues;
  return (
    <>
      {" "}
      {/* <DashboardWheel wheelwidth={dashboardWidth * 0.3} /> */}
      <DashboardSection
        $dashboardWidth={dashboardWidth}
        $dashboardHeight={dashboardHeight}
        $gap={fontSize * 0.2}
        $gridFactor={gridFactor}
      >
        {/* 1 */}
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
        {/* 2 */}
        <GridElement>
          <DashboardLink href="/add-entry">
            <ElementText $fontSize={fontSize} $lineHeight={fontSize * 1.3}>
              <BoldText>Last entry: </BoldText> <br></br>{" "}
              {emotionEntries.length === 0 ? (
                <>You did not make any entries yet!</>
              ) : (
                <>
                  {timeSinceLastEntry} hours ago. <br></br>
                  <BoldText>Your average: </BoldText>
                  <br></br>
                  {averageEntriesPerDay} entries per day.
                </>
              )}
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
        {/* 3 */}
        <LeftShape>
          <EmotionText
            $fontSize={fontSize}
            $lineHeight={fontSize * 1.3}
            $color={`var(--${slug})`}
          >
            Last recorded emotion: <br></br>
            {emotionEntries.length === 0 ? (
              <>You did not record any emotions yet!</>
            ) : (
              <>
                <BoldText>{emotion}</BoldText>
                <br></br>
                <br></br>
                <br></br>Intensity:{" "}
                <ProgressBar $showDetails={showDetails} $progress={intensity} />
                <ArrowWrapper>
                  <StyledForwardArrow $darkArrow />
                  <BoldText>more details</BoldText>
                </ArrowWrapper>
              </>
            )}
          </EmotionText>
        </LeftShape>
        {/* <GridElement onClick={() => handleGridEmotion(demoMode ? id : _id)}>
          <LeftShape />
          <EmotionText
            $fontSize={fontSize}
            $lineHeight={fontSize * 1.3}
            $color={`var(--${slug})`}
          >
            Last recorded emotion: <br></br>
            {emotionEntries.length === 0 ? (
              <>You did not record any emotions yet!</>
            ) : (
              <>
                <BoldText>{emotion}</BoldText>
                <br></br>Intensity:{" "}
                <ProgressBar $showDetails={showDetails} $progress={intensity} />
                <ArrowWrapper>
                  <StyledForwardArrow $darkArrow />
                  <BoldText>more details</BoldText>
                </ArrowWrapper>
              </>
            )}
          </EmotionText>
        </GridElement> */}

        <GridElement>
          <DashboardLink href={`/emotions/${slug}`}>
            <ElementText
              $fontSize={fontSize * 0.98}
              $lineHeight={fontSize * 1.33}
            >
              <BoldText>{emotion}</BoldText>
              <br></br> {shortEmotionDescriptions[emotion]}
              <ArrowWrapper>
                {" "}
                <StyledForwardArrow />
                <BoldText>more about {slug} </BoldText>
              </ArrowWrapper>
            </ElementText>
          </DashboardLink>
        </GridElement>
        <ChartElement>
          {/* <DashboardChart
            theme={theme}
            width={Math.max(250, Math.round(36 + windowWidth / 1.6))}
            heightFactor={0.4}
            shownEntries={emotionEntries}
            xValues={xValues}
            yValues={yValues}
            autosize={false}
            showSwitches={false}
            locale={locale}
            handleChartRef={handleChartRef}
          /> */}
          <ChartLinkWrapper onClick={handleChartLink}>
            <ElementText
              $fontSize={fontSize * 0.98}
              $lineHeight={fontSize * 1.33}
            >
              <ArrowWrapper>
                <StyledForwardArrow />
                <BoldText>more charts </BoldText>
              </ArrowWrapper>
            </ElementText>
          </ChartLinkWrapper>
        </ChartElement>
      </DashboardSection>
    </>
  );
}
