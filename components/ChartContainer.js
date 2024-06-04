import Icon from "@mdi/react";
import { mdiChartLine, mdiChartBar, mdiFormatListBulleted } from "@mdi/js";
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
  StyledWrapper,
} from "@/SharedStyledComponents";
import { useState } from "react";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

const ChartWrapper = styled.div`
  display: grid;
  width: 80vw;
  min-height: 340px;
  max-height: fit-content;
  margin-top: 8rem;
  /* border: 1px solid var(--main-dark);
  border-radius: 6px; */
  grid-template-columns: 1fr 15fr;
  /* background-color: #8e60d0; */
`;

const ChartPlaceholder = styled.div`
  min-width: 300px;
  min-height: 340px;

  align-items: center;
`;

const StyledGraphButton = styled(StyledButton)`
  width: 5rem;
  padding: 0.3rem;
  border-style: none;
  margin: 1rem 1rem 0 1rem;
`;

const ToggleContainer = styled(StyledWrapper)`
  padding: 0.1rem;
  margin: 1rem 1rem 0 1rem;
  gap: 0.2rem;
  background-color: var(--button-background);
  border-radius: 6px;
`;
const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

const StyledGraphButtonsWrapper = styled(StyledFlexColumnWrapper)`
  align-items: center;
`;

export default function ChartContainer({ shownEntries, theme }) {
  //logic for Graph

  const { tension, emotionShares, emotionIntensity } = chartPresets;

  const [chartState, setChartState] = useState({
    scatter: true,
    type: tension.type,
    preset: tension,
  });

  const width = 340;
  const { type, scatter, preset } = chartState;
  const { title, xTitle, yTitle } = preset;

  const xTensionValues = doTensionChartData(shownEntries).xValues;
  const yTensionValues = doTensionChartData(shownEntries).yValues;

  const countResult = countEmotions(shownEntries);
  const emotions = countResult.map((element) => element.emotion);
  const emotionCounts = countResult.map((element) => element.count);

  const xValues = preset === tension ? xTensionValues : emotions;

  const yValues =
    preset === tension
      ? yTensionValues
      : preset === emotionShares
      ? emotionCounts
      : emotionIntensity;

  function handleChartType() {
    setChartState({
      ...chartState,
      type: type === "scatter" ? "bar" : type === "bar" ? "scatter" : "scatter",
      scatter: !scatter,
    });
  }

  function handleTensionChart() {
    setChartState({
      ...chartState,
      preset: tension,
    });
  }

  function handleEmotionChart() {
    setChartState({
      ...chartState,
      preset: emotionShares,
    });
  }

  function handleIntensityChart() {
    setChartState({
      ...chartState,
      preset: emotionIntensity,
    });
  }

  return (
    <ChartWrapper>
      <StyledGraphButtonsWrapper>
        <ToggleContainer>
          <Icon path={mdiChartLine} size={1} />
          <SwitchSizer>
            <ToggleSwitch
              handleSwitch={handleChartType}
              isChecked={!scatter}
              // text={"Switch type"}
            />
          </SwitchSizer>
          <Icon path={mdiChartBar} size={1} />
        </ToggleContainer>
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
      <ChartPlaceholder>
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
      </ChartPlaceholder>
    </ChartWrapper>
  );
}
