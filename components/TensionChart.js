import Plot from "react-plotly.js";
import styled from "styled-components";

const StyledChartSection = styled.section`
  background-color: var(--section-background);
  align-self: center;
  color: var(--contrast-text);
  width: fit-content;
  border-radius: 6px;
  margin: 2.5rem 1rem 1rem;
  padding: 0.5rem;
`;

export default function TensionChart({ xValues, yValues, title, theme }) {
  return (
    <StyledChartSection>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: theme.text },
          },
        ]}
        layout={{
          font: { color: theme.text },
          paper_bgcolor: theme.sectionBackground,
          border_radius: 6,
          plot_bgcolor: theme.background,
          xaxis: { gridcolor: theme.text },
          yaxis: { gridcolor: theme.text },
          width: 340,
          title: {
            font: {
              family: "system-ui",
              weight: "bold",
            },
          },
          autosize: true,
          margin: { b: 50, l: 30, r: 30, t: 50 },
          title: title,
        }}
      />
    </StyledChartSection>
  );
}
