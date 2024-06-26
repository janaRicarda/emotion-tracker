import Icon from "@mdi/react";
import { mdiChartLine, mdiChartBar } from "@mdi/js";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import ToggleSwitch from "./ToggleSwitch";
import {
  chartPresets,
  calculateTensionChartData,
  countEmotions,
} from "@/utils/dataAndChartUtils";

import styled from "styled-components";
import { StyledButton } from "@/SharedStyledComponents";
import { useState, useEffect, useRef } from "react";
import { breakpoints } from "@/utils/breakpoints";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 2rem;
  border-radius: 18px;
  border: var(--circle-border);
  background-color: var(--section-background);
  width: 80vw;
  min-width: ${({ $width }) => `${$width}px`};
  max-width: 575px;
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
  align-items: center;
  padding: 0.4rem;
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
  max-width: 90vw;
  align-items: center;
  @media ${breakpoints.tablet} {
    max-width: 50vw;
  }
  @media ${breakpoints.laptop} {
    max-width: 50vw;
  }
`;

export default function ChartContainer({
  shownEntries,
  theme,
  handleChartRef,
  locale,
}) {
  //logic for Graph
  const { tension, emotionShares, emotionIntensity } = chartPresets;
  const [chartState, setChartState] = useState(tension);
  const { title, xTitle, yTitle, scatter } = chartState;
  const type = scatter ? "scatter" : "bar";

  const xTensionValues = calculateTensionChartData(
    shownEntries,
    locale
  ).xValues;
  const yTensionValues = calculateTensionChartData(shownEntries).yValues;

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

  ////

  //make chart responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const width = Math.max(330, Math.round(windowWidth / 2));
  const height = Math.round(width * 1.15);

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
    <ChartSection $width={width + 20}>
      <EmotionChart
        handleChartRef={handleChartRef}
        isExportable
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
      <ToggleContainer>
        <Icon path={mdiChartLine} size={1} />
        <SwitchSizer>
          <ToggleSwitch
            handleSwitch={handleChartType}
            isChecked={!scatter}
            useButtonColor={true}
          />
        </SwitchSizer>
        <Icon path={mdiChartBar} size={1} />
      </ToggleContainer>
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
    </ChartSection>
  );
}
