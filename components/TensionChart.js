import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";

import { darkTheme, lightTheme } from "./Theme";

// console.log(theme);
export default function TensionChart({ xValues, yValues, title, theme }) {
  const [themeForChart, chooseThemeForChart] = useState(lightTheme);
  function themeSwitch(theme) {
    theme === "light"
      ? chooseThemeForChart(lightTheme)
      : chooseThemeForChart(darkTheme);
  }
  useEffect(() => {
    themeSwitch(theme);
  }, [theme]);

  return (
    <>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: themeForChart.text },
          },
        ]}
        layout={{
          font: { color: themeForChart.text },
          paper_bgcolor: themeForChart.sectionBackground,
          border_radius: 6,
          plot_bgcolor: themeForChart.background,
          xaxis: { gridcolor: themeForChart.text },
          yaxis: { gridcolor: themeForChart.text },
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
      {/* <button onClick={() => console.log(theme)}>log theme</button> */}
    </>
  );
}
