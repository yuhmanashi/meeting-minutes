import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ chartData, title }) {
  
  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: {
              callback: function(value, index, ticks) {
                let label = this.getLabelForValue(value);
                const split = label.split(' ');
                split[1] = split[1][0] + '.';

                return split.join(' ');
              }
            }
          },
          y: {
            ticks: {
              beginAtZero: true,
              callback: function(value) {if (value % 1 === 0) {return value;}}
            }
          }
        }
      }}
    />
  );
}