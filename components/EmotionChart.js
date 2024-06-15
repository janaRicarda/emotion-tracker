import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import styled from "styled-components";
import { useRef, useEffect } from "react";

const StyledChartSection = styled.section`
  background-color: var(--section-background);
  align-self: center;
  color: var(--contrast-text);
  border-radius: 6px;
  border: var(--circle-border);
  margin: 1rem;
  padding: 0.5rem;
`;

export default function EmotionChart({
  handleChartRef,
  xValues,
  yValues,
  title,
  xTitle,
  yTitle,
  theme,
  type,
  width,
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    handleChartRef(chartRef);
  });

  // console.log(chartRef);

  // function handleDownload(fileFormat) {
  //   Plotly.downloadImage(chartRef.current.el, {
  //     format: fileFormat,
  //     filename: "test",
  //     height: 1000,
  //     width: 1000,
  //   });
  // }

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
                marker: { color: theme.buttonBackground },
              },
            ]}
            config={{ scrollZoom: true }}
            layout={{
              font: { color: theme.text },
              paper_bgcolor: theme.sectionBackground,
              border_radius: 6,
              plot_bgcolor: theme.background,
              xaxis: {
                gridcolor: theme.text,
                title: { text: xTitle },
                font: {
                  size: 15,
                  color: theme.text,
                },
                automargin: true,
              },
              yaxis: {
                gridcolor: theme.text,
                title: { text: yTitle },
                font: {
                  size: 15,
                  color: theme.text,
                },
              },
              width: width,
              title: {
                text: title,
                font: {
                  family: "system-ui",
                },
              },
              autosize: true,
              margin: { autoexpand: true, b: 40, l: 30, r: 30, t: 50 },
            }}
            ref={chartRef}
            onInitialized={(graphDiv) => (chartRef.current = { el: graphDiv })}
            onUpdate={(graphDiv) => (chartRef.current = { el: graphDiv })}
          />

      )}
    </StyledChartSection>
  );
}
