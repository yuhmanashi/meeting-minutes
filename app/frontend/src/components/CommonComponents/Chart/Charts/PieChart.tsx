import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";

Chart.register(CategoryScale);

export default function PieChart({ chartData, text, ratio }) {
  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        aspectRatio: ratio,
        plugins: {
          title: {
            display: true,
            text: text
          },
          legend: {
            display: false
          }
        }
      }}
    />
  );
}