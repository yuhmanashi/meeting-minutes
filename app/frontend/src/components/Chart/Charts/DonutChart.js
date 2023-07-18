import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Donut Chart</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Donut"
            }
          }
        }}
      />
    </div>
  );
}