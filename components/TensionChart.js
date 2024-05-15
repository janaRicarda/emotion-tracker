import React from "react";

import Plot from "react-plotly.js";

export default function TensionChart({ xValues, yValues, title }) {
  return (
    <>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "var(--main-dark)" },
          },
        ]}
        layout={{
          width: 320,
          height: 240,
          title: title,
          setBackground: "transparent",
        }}
      />
      {/* <button onClick={() => console.log(xValues)}>Console log data</button> */}
    </>
  );
}
