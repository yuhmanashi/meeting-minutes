import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ chartData, title }) {
  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: {title}
          }
        }
      }}
    />
  );
}