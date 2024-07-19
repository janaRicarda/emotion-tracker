import Plot from "react-plotly.js";
import styled from "styled-components";
import { useRef, useEffect } from "react";

const StyledChartSection = styled.section`
  background-color: var(--section-background);
  align-self: center;
  color: var(--contrast-text);
  border-radius: 6px;
  margin: 0.5rem;
  padding: 0.5rem;
`;

export default function EmotionChart({
  isExportable,
  handleChartRef,
  xValues,
  yValues,
  title,
  xTitle,
  yTitle,
  theme,
  type,
  width,
  height,
  autosize,
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    isExportable ? handleChartRef(chartRef) : null;
  });

  return (
    <StyledChartSection>
      {xValues.length < 2 ? (
        <p>Sorry, there is not enough data to draw the chart!</p>
      ) : (
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              type: type,
              mode: "lines+markers",
              marker: { color: theme.text },
            },
          ]}
          config={{
            displayModeBar: isExportable ? "hover" : false,
            scrollZoom: true,
          }}
          layout={{
            font: { color: theme.text, size: 10 },
            paper_bgcolor: theme.sectionBackground,
            border_radius: 6,
            plot_bgcolor: theme.background,
            xaxis: {
              gridcolor: theme.buttonBackground,
              title: { text: xTitle, standoff: 36 },
              font: {
                family: "system-ui",
                size: 10,
                color: theme.text,
              },
              automargin: true,
            },
            yaxis: {
              gridcolor: theme.buttonBackground,
              title: { text: yTitle },
              font: {
                family: "system-ui",
                size: 10,
                color: theme.text,
              },
            },
            width: width,
            height: height,
            title: {
              text: title,
              font: {
                family: "system-ui",
                size: 13,
              },
            },
            autosize: autosize,
            margin: { autoexpand: true, b: 20, l: 35, r: 30, t: 32 },
          }}
          ref={chartRef}
          onInitialized={(graphDiv) => (chartRef.current = { el: graphDiv })}
          onUpdate={(graphDiv) => (chartRef.current = { el: graphDiv })}
        />
      )}
    </StyledChartSection>
  );
}
