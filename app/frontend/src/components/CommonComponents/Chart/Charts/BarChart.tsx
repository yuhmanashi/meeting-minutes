import React from "react";
import { Bar } from "react-chartjs-2";

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
            max: max <= 10 ? max += 1 : max,
            ticks: {
              
              callback: function(value: number) {
                if (value % 1 === 0) return value;
            }
          }}
        }
      }}
    />
  );
}