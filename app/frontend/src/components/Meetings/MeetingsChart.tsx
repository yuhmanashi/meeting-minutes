import React, { useEffect, useState } from 'react';

import LineChart from '../CommonComponents/Chart/Charts/LineChart';
import BarChart from '../CommonComponents/Chart/Charts/BarChart';

import SelectMenu from '../CommonComponents/SelectMenu';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function toDateString(date) {
    return new Date(date).toDateString()
}

function toLocaleDateString(date) {
    return new Date(date).toLocaleDateString()
}

/* This Week */
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

const monthes = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'May', 
    'Jun', 
    'Jul', 
    'Aug', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dec'
]

function fixDate(str){
    return str.length > 1 ? str : '0' + str;
}

function createThisWeekCount(dates){
    const count = {};
    
    const dateStrings = dates.map(date => {
        const dateString = toLocaleDateString(date).split('/').slice(0, 2).join('/')
        const month = dateString.slice(0, 2);
        const day = dateString.slice(3);

        return fixDate(month) + '/' + fixDate(day);
    });

    const today = new Date();

    const day = today.getDay(); //0-6
    const monthDay = today.getDate();//1-31
    const month = today.getMonth();//0-11

    let max = monthDay + (6 - day);
    let min = monthDay - day;
    let maxMonth = month;
    let minMonth = month;

    if (max > days[month]){
        maxMonth += 1;
        max = max - days[month];
    }

    if (min < 1){
        minMonth -= 1;
        min = days[minMonth] + min;
    }

    let i = 0;
    let currDay = min;
    let currMonth = minMonth;
    
    while (i <= 6){
        if (currDay > days[currMonth]) {
            currDay = 1; 
            currMonth += 1;
        }

        const newDay = `${currDay}`.length < 2 ? '0' + `${currDay}` : `${currDay}`;
        const adjustedMo = `${currMonth + 1}`
        const newMo = adjustedMo.length < 2 ? '0' + adjustedMo : adjustedMo;
        const date = newMo + '/' + newDay

        count[date] = 0;

        currDay++;
        i++;
    }

    for (let date of dateStrings){
      count[date] += 1;
    }

    return count;
}

function createMonthCount(dates){ 
    const count = {};
    const month = new Date().getMonth();

    for (let i = 1; i <= days[month]; i++){
        const mo = fixDate(`${month + 1}`);
        const day = fixDate(`${i}`)
        count[mo + '/' + day] = 0;
    }

    const dateStrings = dates.map(date => {
        const dateString = toLocaleDateString(date).split('/').slice(0, 2).join('/')

        const month = dateString.slice(0, 2);
        const day = dateString.slice(3);

        return fixDate(month) + '/' + fixDate(day);
    });
     
    for (let date of dateStrings){
      count[date] += 1;
    }

    return count;
}

function createYearCount(dates){
    const count = {};
    for (let i = 0; i <= 11; i++){
        const month = monthes[i]
        count[month] = 0;
    }

    const filtered = dates.map(date => toDateString(date).split(' ')[1]);
    for (let date of filtered){
        count[date] += 1;
    }

    return count;
}

function createAllCount(dates){
    const startDate = dates[0];
    const startYr = startDate.getFullYear();
    const startMo = startDate.getMonth();
    const endDate = dates[dates.length - 1];
    const endYr = endDate.getFullYear();
    const endMo = endDate.getMonth() + 1;

    const count = {}

    let currMo = startMo;
    let currYr = startYr;

    while (currMo !== endMo || currYr !== endYr){
        if (currMo > 11){
            currMo = 0;
            currYr += 1;
        }

        const yr = `${currYr}`.slice(2);
        const mo = fixDate(`${currMo + 1}`);
        const date = mo + '-' + yr

        count[date] = 0;
        currMo += 1;
    }

    for (let data of dates){
        const mo = data.getMonth();
        const yr = data.getFullYear();
     
        const fixMo = fixDate(`${mo + 1}`);
        const date = fixMo + '-' + `${yr}`.slice(2)

        count[date] += 1;
    }

    return count;
}

function createData(obj){
    return ({
        labels: Object.keys(obj),
        datasets: [{
            label: ' # meetings',
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
            borderColor: 'black',
            tension: .1
        }]
    })
}

function getMax(count){
    const values: number[] = Object.values(count)
    let max = Math.ceil(Math.max(...values) * 1.5)
    return max % 2 === 0 ? max : max + 1;
}

export default function MeetingsChart({meetings, time}){
    const dates = meetings.map(meeting => new Date(meeting.date));
    const [count, setCount] = useState(handleMeetingsCount(dates))
    const [data, setData] = useState(createData(count));
    const [max, setMax] = useState(getMax(count));
    const [chart, setChart] = useState('Bar');

    useEffect(() => {
        let currCount = handleMeetingsCount(dates)
        setCount(currCount);
        setData(createData(currCount));
        setMax(getMax(currCount));
    }, [meetings]);

    function handleMeetingsCount(dates){
        switch(time) {
          case 'Week':
            return createThisWeekCount(dates);
          case 'Month':
            return createMonthCount(dates);
          case 'Year':
            return createYearCount(dates);
          case 'All':
            return createAllCount(dates);
          default:
            return createThisWeekCount(dates);
        }
    }

    //fix meetings stats

    function handleChart(){
        switch(chart){
            case 'Bar':
                return <BarChart chartData={data} max={max}/>
            case 'Line':
                return <LineChart chartData={data} max={max} />
            default:
                return <BarChart chartData={data} max={max}/>
        }
    }

    return (
        <Box sx={{  }}>
            <Box sx={{ display: 'flex', mt: 1, mb: 2, flexDirection: 'column' }}>
                <Typography variant='h5' textAlign='center' sx={{mb: 1, backgroundColor: '#F67280', color: 'white', maxWidth: 200, p: 1, borderRadius: 1}}>Meetings Count</Typography>
                <Typography variant='h5' sx={{fontWeight: 'bold', maxWidth: 200, p: 1, borderRadius: 1}}>{time === 'All' ? 'All Time' : `This ${time}`}</Typography>
            </Box>
            {handleChart()}
            <Box sx={{ mt: 4 }}>
                <SelectMenu name={'Chart'} options={['Bar', 'Line']} defaultOption={'Bar'} onChange={setChart}/> 
            </Box>
        </Box>
    );
}