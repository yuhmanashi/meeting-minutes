import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ chartData, text }) {
  return (
    <Doughnut
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