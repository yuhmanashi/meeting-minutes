import React, { useEffect, useState } from 'react';

import BarChart from '../CommonComponents/Chart/Charts/BarChart';

function getMax(count = {}){
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
            label: ' count',
            data: Object.values(obj),
            backgroundColor: [
                '#F8B195', 
                '#F67280', 
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

export default function CategoriesChart({ categories, meetings, selected, selectedDay }){
    const meetingsForWeek = meetings.filter(byWeek)
    const [count, setCount] = useState(handleCategoriesCount(categories, meetingsForWeek))
    const [data, setData] = useState(createCategoriesData(count));
    const [max, setMax] = useState(getMax(count));

    function byWeek(meeting){
        const days = {
            0: 31,
            1: 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31
        }
    
        const today = selectedDay ? selectedDay : new Date();
        const day = today.getDay();
        const monthDay = today.getDate();
        const month = today.getMonth();
    
        const max = 6 - day;
        let maxDay = monthDay + max;
        let minDay = monthDay - day;
    
        const tDay = new Date(meeting.date).getDate();
        const tMonth = new Date(meeting.date).getMonth();
    
        if (tMonth === month && tDay >= minDay && tDay <= maxDay) return true;
    
        if (maxDay > days[month]) return tMonth === month + 1 && tDay <= maxDay - days[month];
    
        if (minDay < 0) return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
    }

    useEffect(() => {
        let currCount = handleCategoriesCount(categories, meetingsForWeek)
        setCount(currCount);
        setData(createCategoriesData(currCount));
        setMax(getMax(currCount));
    }, [meetings, selected]);

    return (
        <BarChart chartData={data} max={max}/>
    )
}