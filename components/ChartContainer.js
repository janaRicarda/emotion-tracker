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
import { useState } from "react";

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
  margin-top: 8rem;
  align-items: center;
  border-radius: 6px;
  justify-content: center;
  background-color: var(--section-background);
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

export default function ChartContainer({ shownEntries, theme }) {
  //logic for Graph
  const { tension, emotionShares, emotionIntensity } = chartPresets;
  const [chartState, setChartState] = useState(tension);
  const { title, xTitle, yTitle, scatter } = chartState;
  const type = scatter ? "scatter" : "bar";

  //wird noch responsive
  const width = 340;
  //wird noch responsive

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
      <EmotionChart
        theme={theme}
        type={type}
        xValues={xValues}
        yValues={yValues}
        xTitle={xTitle}
        yTitle={yTitle}
        title={title}
        width={width}
      />
      <StyledFlexColumnWrapper>
        <ToggleContainer>
          <Icon path={mdiChartLine} size={1} />
          <SwitchSizer>
            <ToggleSwitch handleSwitch={handleChartType} isChecked={!scatter} />
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
    </ChartSection>
  );
}
