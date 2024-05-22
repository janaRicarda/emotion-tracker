import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";

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
            marker: { color: theme.text },
          },
        ]}
        layout={{
          font: { color: theme.text },
          paper_bgcolor: theme.buttonBackground,
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
      {/* <button onClick={() => console.log(theme)}>log theme</button> */}
    </>
  );
}
