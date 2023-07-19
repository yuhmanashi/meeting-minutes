import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ chartData }) {
  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'title'
          }
        }
      }}
    />
  );
}