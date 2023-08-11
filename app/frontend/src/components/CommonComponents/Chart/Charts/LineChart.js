import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ chartData, title, max }) {
  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: title
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            max: max <= 10 ? max += 1 : max,
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                if (value % 1 === 0) return value;
              }
            }
          }
        }
      }}
    />
  );
}