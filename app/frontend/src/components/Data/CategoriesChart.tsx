import React, {useState} from 'react';

import BarChart from '../CommonComponents/Chart/Charts/BarChart';
import DonutChart from '../CommonComponents/Chart/Charts/DonutChart';

import SelectMenu from '../CommonComponents/SelectMenu';

import Box from '@mui/material/Box';

export default function CategoriesChart({ meetings, time }){
    // const [count, setCount] = useState(handleMeetingsCount(dates))
    // const [data, setData] = useState(createData(count));
    // const [max, setMax] = useState(getMax(count));
    const [chart, setChart] = useState('Bar');
    
    function handleChart(){
        switch(chart){
            case 'Bar':
                return <BarChart chartData={{}} max={0} />
            case 'Donut':
                return <DonutChart chartData={{}} />
            default:
                return <BarChart chartData={{}} max={0} />
        }
    }

    return (
        <Box>
            {handleChart()}
            <SelectMenu name={'Chart'} options={['Bar', 'Donut']} defaultOption={'Bar'} onChange={setChart}/>
        </Box>
    );
}