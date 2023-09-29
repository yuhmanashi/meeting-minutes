import React from "react";
import { Bar } from "react-chartjs-2";

import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";

Chart.register(CategoryScale);

export default function BarChart({ chartData, max }) {  
  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,

        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            min: 0,
            max: max,
            ticks: {
              callback: function(value: number) {
                if (value % 1 === 0) return value;
              }
            }
          }
        }
      }}
    />
  );
}