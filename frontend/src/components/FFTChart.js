import React from 'react';
import Plot from 'react-plotly.js';

export default function FFTChart({ data }) {
  if (!data) return null;
  return (
    <Plot
      data={[
        {
          x: data.freqs,
          y: data.power,
          type: 'scatter',
          mode: 'lines',
          name: 'FFT',
          line: { color: '#1f77b4', width: 2 },
        },
        {
          x: [6],
          y: [data.bands["Theta (4–8 Hz)"]],
          type: 'bar',
          name: 'Theta',
          marker: { color: '#9467bd' },
        },
        {
          x: [10],
          y: [data.bands["Alpha (8–13 Hz)"]],
          type: 'bar',
          name: 'Alpha',
          marker: { color: '#ff7f0e' },
        },
        {
          x: [20],
          y: [data.bands["Beta (13–30 Hz)"]],
          type: 'bar',
          name: 'Beta',
          marker: { color: '#2ca02c' },
        },
      ]}
      layout={{
        title: { text: 'Frequency Domain (FFT)', font: { size: 20 } },
        height: 400,
        width: 600,
        margin: { t: 40, l: 60, r: 30, b: 50 },
        xaxis: {
          title: 'Frequency (Hz)',
          showgrid: true,
        },
        yaxis: {
          title: 'Power',
          showgrid: true,
        },
        barmode: 'group',
      }}
      config={{ responsive: true }}
    />
  );
}
