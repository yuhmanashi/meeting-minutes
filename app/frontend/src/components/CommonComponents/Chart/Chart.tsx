import React, { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";
import DonutChart from "./Charts/DonutChart";
import LineChart from "./Charts/LineChart";

Chart.register(CategoryScale);

const pinks = [
  "#FFC0CB",
  "#FFB6C1",
  "#FF69B4",
  "#FF1493",
  "#DB7093",
  "#C71585"
]

const purples = [
  "#D8BFD8",
  "#DDA0DD",
  "#DA70D6",
  "#EE82EE",
  "#FF00FF",
  "#BA55D3",
  "#9932CC",
  "#9400D3"
]

const blues = [
  "#00FFFF",
  "#AFEEEE",
  "#7FFFD4",
  "#40E0D0",
  "#87CEEB",
  "#00CED1",
  "#ADD8E6",
  "#B0E0E6",
  "#87CEFA",
  "#48D1CC",
]

const reds = [
  "#FFA07A",
  "#FA8072",
  "#E9967A",
  "#F08080",
  "#CD5C5C",
  "#DC143C"
]

const greens = [
  "#ADFF2F",
  "#7FFF00",
  "#7CFC00",
  "#00FF00",
  "#32CD32",
  "#98FB98",
  "#90EE90",
  "#00FA9A",
  "#00FF7F"
]

const colors = {
  'pink': pinks,
  'purple': purples,
  'blue': blues,
  'red': reds,
  'green': greens
}

export default function GenericChart({ obj, callback, color, type, title, ratio = 2 }){
    if (obj.length < 1) return null;
    
    function createData(obj, color, title = 'count'){
      return ({
          labels: Object.keys(obj),
          datasets: [{
              label: title,
              data: Object.values(obj),
              backgroundColor: colors[color],
              borderColor: "black",
              borderWidth: 2
          }]
      })
    }
    
    //how many times a student has had a meeting w u
    function getCount(obj, callback){ 
      const count = {};
      const filtered = obj.map(callback);
        
      for (let data of filtered){
        if (!count[data]) count[data] = 0;
        count[data] += 1;
      }

      return count;
    }

    const count = getCount(obj, callback);
    const data = createData(count, color);

    switch(type) {
      case 'pie':
        return <PieChart chartData={data} title={title} ratio={ratio}/>
      case 'donut':
        return <DonutChart chartData={data} title={title} ratio={ratio}/>
      case 'bar':
        return <BarChart chartData={data} title={title} />
      case 'line':
        return <LineChart chartData={data} title={title} />
      default: 
        return <BarChart chartData={data} title={title} />
    }
}