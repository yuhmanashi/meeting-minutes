import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ chartData, text }) {
  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: text
          }
        }
      }}
    />
  );
}