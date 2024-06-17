import Icon from "@mdi/react";
import { mdiChartLine, mdiChartBar } from "@mdi/js";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import ToggleSwitch from "./ToggleSwitch";
import {
  chartPresets,
  calculateTensionChartData,
  getFilteredEntriesV2,
  countEmotions,
} from "@/utils/dataAndChartUtils";
import styled from "styled-components";
import {
  StyledFlexColumnWrapper,
  StyledButton,
} from "@/SharedStyledComponents";
import { useState, useEffect } from "react";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading chart" />,
});

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  border-radius: 18px;
  background-color: var(--section-background);
  width: 80vw;
  min-width: ${({ $width }) => `${$width}px`};
  max-width: 800px;
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
  margin: -1.3rem 0 0.8rem;
  gap: 0.1rem;
  background-color: var(--section-background);
  border-radius: 6px;
`;
const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

export default function ChartContainerV2({
  theme,
  heightFactor,
  xValues,
  yValues,
  width,
  autosize,
  showSwitches,
  locale,
}) {
  //logic for Graph
  const { tension, emotionShares, emotionIntensity } = chartPresets;
  const [chartState, setChartState] = useState(tension);
  const { title, xTitle, yTitle, scatter } = chartState;
  const type = scatter ? "scatter" : "bar";

  //make chart responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function updateWidth() {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const chartWidth = autosize
    ? Math.max(330, Math.round(windowWidth / 1.7))
    : width;

  // const height = Math.round(width * Number(heightFactor));
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
  // console.log("Width in ChartContainer:", width);
  return (
    <ChartSection $width={width + 20}>
      <StyledFlexColumnWrapper>
        <EmotionChart
          theme={theme}
          type={type}
          xValues={xValues}
          yValues={yValues}
          xTitle={xTitle}
          yTitle={yTitle}
          title={title}
          width={chartWidth}
          height={chartWidth * heightFactor}
          autosize={autosize}
        />
      </StyledFlexColumnWrapper>
      {showSwitches && (
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
      )}
    </ChartSection>
  );
}
