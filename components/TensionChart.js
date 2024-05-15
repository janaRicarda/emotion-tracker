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
            background: { color: "transparent" },
          },
        ]}
        layout={{
          width: 320,
          height: 300,
          autosize: true,
          margin: { b: 40, l: 40, r: 40, t: 40 },
          title: title,
        }}
      />
      {/* <button onClick={() => console.log(xValues)}>Console log data</button> */}
    </>
  );
}
