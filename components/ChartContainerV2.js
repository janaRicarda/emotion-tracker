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
import { breakpoints } from "@/utils/breakpoints";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 90vw;
  min-height: 100px;
  max-height: fit-content;
  margin: 1rem;
  align-items: center;
  border-radius: 18px;
  justify-content: center;
  background-color: var(--section-background);

  @media ${breakpoints.mobileLandscape} {
  }
  @media ${breakpoints.tablet} {
  }
  @media ${breakpoints.laptop} {
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
  width: 8rem;
  margin: 0;
  gap: 0.1rem;
  background-color: var(--section-background);
  border-radius: 6px;
`;
const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

export default function ChartContainerV2({
  shownEntries,
  theme,
  heightFactor,
  xValues,
  yValues,
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

  const width = Math.max(240, Math.round(windowWidth / 2));

  const height = Math.round(width * Number(heightFactor));
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
      <StyledFlexColumnWrapper>
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
      </StyledFlexColumnWrapper>
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
    </ChartSection>
  );
}
