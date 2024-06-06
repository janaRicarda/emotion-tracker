import Icon from "@mdi/react";
import { mdiChartLine, mdiChartBar } from "@mdi/js";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import ToggleSwitch from "./ToggleSwitch";
import {
  chartPresets,
  doTensionChartData,
  countEmotions,
} from "@/utils/chartUtils";
import styled from "styled-components";
import {
  StyledFlexColumnWrapper,
  StyledButton,
} from "@/SharedStyledComponents";
import { useState, useEffect } from "react";
import { breakpoints } from "@/utils/breakpoints";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90vw;
  min-height: 450px;
  max-height: 700px;
  margin-top: 5rem;
  align-items: center;
  border-radius: 12px;
  justify-content: center;
  background-color: var(--section-background);

  @media ${breakpoints.mobileLandscape} {
    top: 100px;
  }
  @media ${breakpoints.tablet} {
    display: block;
    padding: 1rem;
    left: 5rem;
    width: 92%;
  }
  @media ${breakpoints.laptop} {
    display: block;
    box-shadow: none;
    padding: 1rem;
    left: 5rem;
    width: 92%;
  }
`;

const StyledGraphButton = styled(StyledButton)`
  width: 5rem;
  padding: 0.3rem;
  font-size: 0.8rem;
  border-style: none;
  margin: 0.4rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  height: 24px;
  padding: 0.2rem;
  width: inherit;
  margin: 0 0 0.8rem;
  gap: 0.1rem;
  background-color: var(--section-background);
  border-radius: 6px;
`;
const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

const StyledGraphButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 0.3rem;
  max-width: 50vw;
  align-items: center;
`;
const Chartwrapper = styled(StyledFlexColumnWrapper)`
  @media ${breakpoints.tablet} {
    margin-left: 10rem;
  }
  @media ${breakpoints.laptop} {
    margin-left: 20rem;
  }
`;

export default function ChartContainer({ shownEntries, theme }) {
  //logic for Graph
  const { tension, emotionShares, emotionIntensity } = chartPresets;
  const [chartState, setChartState] = useState(tension);
  const { title, xTitle, yTitle, scatter } = chartState;
  const type = scatter ? "scatter" : "bar";

  //logic

  const xTensionValues = doTensionChartData(shownEntries).xValues;
  const yTensionValues = doTensionChartData(shownEntries).yValues;

  const countResult = countEmotions(shownEntries);

  const xEmotions = countResult.map((element) => element.emotion);
  const yEmotionCount = countResult.map((element) => element.percentage);
  const yAverageIntensities = countResult.map(
    (element) => element.averageIntensity
  );

  const xValues = title === "Tension Chart" ? xTensionValues : xEmotions;

  const yValues =
    title === "Tension Chart"
      ? yTensionValues
      : title === "Emotion Shares"
      ? yEmotionCount
      : yAverageIntensities;

  //responsive
  console.log(breakpoints);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const width = Math.max(340, Math.round(windowWidth / 2));
  const height = Math.round(width * 1.2);

  function handleChartType() {
    setChartState({
      ...chartState,
      scatter: !scatter,
    });
  }

  function handleTensionChart() {
    setChartState(tension);
  }

  function handleEmotionChart() {
    setChartState(emotionShares);
  }

  function handleIntensityChart() {
    setChartState(emotionIntensity);
  }

  return (
    <ChartSection>
      <Chartwrapper>
        <EmotionChart
          theme={theme}
          type={type}
          xValues={xValues}
          yValues={yValues}
          xTitle={xTitle}
          yTitle={yTitle}
          title={title}
          width={width}
          height={height}
        />

        <StyledFlexColumnWrapper>
          <ToggleContainer>
            <Icon path={mdiChartLine} size={1} />
            <SwitchSizer>
              <ToggleSwitch
                handleSwitch={handleChartType}
                isChecked={!scatter}
              />
            </SwitchSizer>
            <Icon path={mdiChartBar} size={1} />
          </ToggleContainer>
        </StyledFlexColumnWrapper>
        <StyledFlexColumnWrapper>
          <StyledGraphButtonsWrapper>
            <StyledGraphButton type="button" onClick={handleTensionChart}>
              Tension
            </StyledGraphButton>
            <StyledGraphButton type="button" onClick={handleEmotionChart}>
              Emotions
            </StyledGraphButton>
            <StyledGraphButton type="button" onClick={handleIntensityChart}>
              Intensity
            </StyledGraphButton>
          </StyledGraphButtonsWrapper>
        </StyledFlexColumnWrapper>
      </Chartwrapper>
      <p>
        Windowwith: {windowWidth} Width: {width} Height: {height}
      </p>
    </ChartSection>
  );
}
