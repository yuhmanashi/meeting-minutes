import React, { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";
import DonutChart from "./Charts/DonutChart";
import LineChart from "./Charts/LineChart";

Chart.register(CategoryScale);

const sampleData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
];

// const sampleData = {
//     labels: ['Red', 'Orange', 'Blue'],
//     // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
//     datasets: [
//         {
//           label: 'Popularity of colours',
//           data: [55, 23, 96],
//           // you can set indiviual colors for each bar
//           backgroundColor: [
//             'rgba(255, 255, 255, 0.6)',
//             'rgba(255, 255, 255, 0.6)',
//             'rgba(255, 255, 255, 0.6)'
//           ],
//           borderWidth: 1,
//         }
//     ]
// }

const data2 = {
    labels: sampleData.map((data) => data.year), 
    datasets: [{
        label: "Users Gained ",
        data: sampleData.map((data) => data.userGain),
        backgroundColor: [
        "rgba(75,192,192,1)",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
    }]
}

export default function GenericChart({ data, type, text }){
    const [chartData, setChartData] = useState(data)
    if (data.length < 1) return null;
    console.log(data, type, text)
    switch(type) {
      case 'pie':
        return <PieChart chartData={chartData} text={text} />
      case 'bar':
        return <BarChart chartData={chartData} text={text} />
      case 'donut':
        return <DonutChart chartData={chartData} text={text} />
      case 'line':
        return <LineChart chartData={chartData} text={text} />
      default: 
        return <BarChart chartData={chartData} text={text} />
    }
}