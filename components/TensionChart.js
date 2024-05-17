import React from "react";

import Plot from "react-plotly.js";

//testing ways to work with the color themes
import { darkTheme, lightTheme } from "./Theme";

const lightThemeBgColor = "#f1eaea";

function convertThemeColors(theme) {
  const themeColors = "test";
}
// console.log(theme);
export default function TensionChart({ xValues, yValues, title, theme }) {
  return (
    <>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "lightskyblue" },
          },
        ]}
        layout={{
          font: { color: "#030352" },
          paper_bgcolor: lightTheme.background,
          border_radius: 6,
          plot_bgcolor: "#f1eaea",
          width: 320,
          height: 300,
          title: {
            font: { family: "system-ui", weight: "bold", color: "#030352" },
          },
          autosize: true,
          margin: { b: 50, l: 30, r: 30, t: 50 },
          title: title,
        }}
      />
      <button onClick={() => console.log(theme)}>log theme</button>
    </>
  );
}
