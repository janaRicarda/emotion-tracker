import Icon from "@mdi/react";
import { mdiChartLine, mdiChartBar } from "@mdi/js";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import ToggleSwitch from "./ToggleSwitch";
import { chartPresets } from "@/utils/dataAndChartUtils";
import styled from "styled-components";
import { StyledFlexColumnWrapper } from "@/SharedStyledComponents";
import { useState, useEffect } from "react";

const EmotionChart = dynamic(() => import("./EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading chart" />,
});

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  left: calc(50% - ${({ $centerOffset }) => `${$centerOffset}px`});
  top: 0.2rem;
  margin: 0.5rem;
  border-radius: 18px;
  background-color: var(--section-background);
  width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  max-width: 800px;
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

export default function DashboardChart({
  theme,
  heightFactor,
  xValues,
  yValues,
  width,
  autosize,
  showSwitches,
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

  function handleChartType() {
    setChartState({
      ...chartState,
      scatter: !scatter,
    });
  }

  return (
    <ChartSection $width={width + 20} $centerOffset={chartWidth / 2 + 19}>
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
