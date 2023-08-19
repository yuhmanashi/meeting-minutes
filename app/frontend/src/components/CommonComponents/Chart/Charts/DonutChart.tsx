import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ chartData }) {
  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        aspectRatio: 2,
        plugins: {
          title: {
            display: true,
          },
          legend: {
            display: false
          }
        }
      }}
    />
  );
}