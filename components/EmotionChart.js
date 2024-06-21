import Plot from "react-plotly.js";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

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
  const router = useRouter();
  const { t: translate } = useTranslation(["common"]);

  const chartRef = useRef(null);

  useEffect(() => {
    isExportable ? handleChartRef(chartRef) : null;
  });

  return (
    <StyledChartSection>
      {xValues.length < 2 ? (
        <p>{translate("notEnoughData")}</p>
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
          config={{
            displayModeBar: isExportable ? true : false,
            scrollZoom: true,
          }}
          layout={{
            font: { color: theme.text, size: 10 },
            paper_bgcolor: theme.sectionBackground,
            border_radius: 6,
            plot_bgcolor: theme.background,
            xaxis: {
              gridcolor: theme.text,
              title: { text: xTitle },
              font: {
                family: "system-ui",
                size: 10,
                color: theme.text,
              },
              automargin: true,
            },
            yaxis: {
              gridcolor: theme.text,
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
                size: 15,
              },
            },
            autosize: autosize,
            margin: { autoexpand: true, b: 30, l: 35, r: 30, t: 30 },
          }}
          ref={chartRef}
          onInitialized={(graphDiv) => (chartRef.current = { el: graphDiv })}
          onUpdate={(graphDiv) => (chartRef.current = { el: graphDiv })}
        />
      )}
    </StyledChartSection>
  );
}
