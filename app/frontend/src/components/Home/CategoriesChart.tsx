import React, { useEffect, useState } from 'react';

import BarChart from '../CommonComponents/Chart/Charts/BarChart';

function getMax(count){
    const values: number[] = Object.values(count)
    let max = Math.ceil(Math.max(...values) * 1.5)
    return max % 2 === 0 ? max : max + 1;
}

function handleCategoriesCount(categories, meetings){
    const count = {};
    for (let category of categories){
        count[category] = 0;
    }

    for (let meeting of meetings){
        if (meeting.category.length > 0) count[meeting.category] += 1;
    }

    return count;
}

function createCategoriesData(obj){
    return ({
        labels: Object.keys(obj),
        datasets: [{
            label: '#meetings',
            data: Object.values(obj),
            backgroundColor: [
                '#F8B195', 
                '#F67280', 
                '#CO6C84', 
                '#6C5B7B', 
                '#355C7D', 
                '#A8E6CE', 
                '#DCEDC2', 
                '#FFD3B5', 
                '#FFAAA6', 
                '#FF8C94' 
            ]
        }]
    })
}

export default function CategoriesChart({ categories, meetings, selected }){
    const [count, setCount] = useState(handleCategoriesCount(categories, meetings))
    const [data, setData] = useState(createCategoriesData(count));
    const [max, setMax] = useState(getMax(count));

    useEffect(() => {
        let currCount = handleCategoriesCount(categories, meetings)
        setCount(currCount);
        setData(createCategoriesData(currCount));
        setMax(getMax(currCount));
    }, [meetings, selected]);

    return (
        <BarChart chartData={data} max={max}/>
    )
}