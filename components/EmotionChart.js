import Plot from "react-plotly.js";
import styled from "styled-components";

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
  xValues,
  yValues,
  title,
  xTitle,
  yTitle,
  theme,
  type,
  width,
}) {
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
          config={{ displayModeBar: false, scrollZoom: true }}
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
        />
      )}
    </StyledChartSection>
  );
}
