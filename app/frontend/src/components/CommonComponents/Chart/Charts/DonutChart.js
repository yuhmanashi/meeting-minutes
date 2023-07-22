import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ chartData, title, ratio }) {
  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        aspectRatio: ratio,
        plugins: {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: false
          }
        }
      }}
    />
  );
}