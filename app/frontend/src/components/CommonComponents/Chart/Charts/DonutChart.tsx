import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";

Chart.register(CategoryScale);

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