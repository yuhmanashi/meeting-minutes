import React, { useState, useEffect } from 'react';

import BarChart from '../CommonComponents/Chart/Charts/BarChart';
import DonutChart from '../CommonComponents/Chart/Charts/DonutChart';

import SelectMenu from '../CommonComponents/SelectMenu';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function createData(obj){
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
            ],
        }]
    })
}

function getMax(count){
    const values: number[] = Object.values(count)
    let max = Math.ceil(Math.max(...values) * 1.5)
    return max % 2 === 0 ? max : max + 1;
}

export default function CategoriesChart({ meetings, time, categories }){
    const [count, setCount] = useState(handleCount())
    const [data, setData] = useState(createData(count));
    const [max, setMax] = useState(getMax(count));
    const [chart, setChart] = useState('Bar');
    
    useEffect(() => {
        let currCount = handleCount()
        setCount(currCount);
        setData(createData(currCount));
        setMax(getMax(currCount));
    }, [meetings]);

    function handleCount(){
        const count = {};
        for (let category of categories){
            const catString = category === '' ? 'Other' : category;
            count[catString] = 0;
        }

        for (let meeting of meetings){
            const catString = meeting.category === '' ? 'Other' : meeting.category;
            count[catString] += 1;
        }

        return count;
    }
    
    function handleChart(){
        switch(chart){
            case 'Bar':
                return <BarChart chartData={data} max={max} />
            case 'Donut':
                return <DonutChart chartData={data} />
            default:
                return <BarChart chartData={data} max={max} />
        }
    }

    return (
        <Box sx={{  }}>
            <Box sx={{ display: 'flex', mt: 1, mb: 2, flexDirection: 'column' }}>
                <Typography variant='h5' textAlign='center' sx={{mb: 1, backgroundColor: '#F8B195', color: 'white', maxWidth: 240, p: 1, borderRadius: 1}}>Category Frequency</Typography>
                <Typography variant='h5'  sx={{fontWeight: 'bold', maxWidth: 200, p: 1, borderRadius: 1}}>{time === 'All' ? 'All Time' : `This ${time}`}</Typography>
            </Box>
            {handleChart()}
            <Box sx={{ mt: 4 }}>
                <SelectMenu name={'Chart'} options={['Bar', 'Donut']} defaultOption={'Bar'} onChange={setChart}/>
            </Box>
        </Box>
    );
}