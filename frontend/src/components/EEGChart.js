import React from 'react';
import Plot from 'react-plotly.js';

export default function EEGChart({ signal }) {
  return (
    <Plot
      data={[
        {
          y: signal,
          type: 'scatter',
          mode: 'lines',
          line: { color: '#2ca02c', width: 2 }, // green and thicker
        },
      ]}
      layout={{
        title: { text: 'Time Domain Signal', font: { size: 20 } },
        height: 400,
        width: 600,
        margin: { t: 40, l: 60, r: 30, b: 50 },
        xaxis: {
          title: 'Samples',
          showgrid: true,
          zeroline: false,
        },
        yaxis: {
          title: 'Amplitude (µV)',
          showgrid: true,
          zeroline: false,
        },
      }}
      config={{ responsive: true }}
    />
  );
}
