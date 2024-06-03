import Plot from "react-plotly.js";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

const StyledChartSection = styled.section`
  background-color: var(--section-background);
  align-self: center;
  color: var(--contrast-text);
  width: fit-content;
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
}) {
  return (
    <StyledChartSection>
      {xValues.length === 0 ? (
        <ErrorMessage itemText="No Data for Graph" />
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
          config={{ displayModeBar: false, scrollZoom: true, responsive: true }}
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
            width: 340,
            title: {
              font: {
                family: "system-ui",
                weight: "bold",
              },
            },
            autosize: true,
            margin: { autoexpand: true, b: 50, l: 30, r: 30, t: 50 },
            title: title,
          }}
        />
      )}
    </StyledChartSection>
  );
}