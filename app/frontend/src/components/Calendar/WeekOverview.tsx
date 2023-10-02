import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Day from './Day';

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

export default function WeekOverview({setValue, meetings, students, date}){    
    // filter meetings for week
    function filterMeetings(meetings, callback){
        const filteredMeetings = meetings.filter(meeting => callback(new Date(meeting.date)));
        return filteredMeetings;
    }

    function byThisWeek(date){
        const today = new Date();
        const day = today.getDay();
        const monthDay = today.getDate();
        const month = today.getMonth();
    
        const max = 6 - day;
        let maxDay = monthDay + max;
        let minDay = monthDay - day;
        
        const tDay = date.getDate();
        const tMonth = date.getMonth();
    
        if (tMonth === month && tDay >= minDay && tDay <= maxDay) return true;
    
        if (maxDay > days[month]) return tMonth === month + 1 && tDay <= maxDay - days[month];
    
        if (minDay < 0) return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
    }

    const filtered = filterMeetings(meetings, byThisWeek); //returns arr of meetings for this week

    function createWeek(date){
        const day = date.day(); //day of current week
        const week = [];
        
        for (let i = day; i > 0; i--){ //gets days before today;
            const currentDay = date.subtract(i, 'day');
            week.push(currentDay);
        }

        for (let i = 0; i <= 6-day; i++){ //gets today and days after;
            const currentDay = date.add(i, 'day');
            week.push(currentDay);
        }

        // const weekdays = week.map(day => day.toDate())
        return week;
    }

    const week = createWeek(date)
    //gets first and last day of the week in string format
    function getWeek(){
        const first = week[0];
        const last = week[week.length - 1];
        
        function getString(day){
            return [day.month() + 1, day.date(), day.year() % 100].join('/')
        }

        return [getString(first), getString(last)].join(' - ');
    }

    function convertDate(date) {
        const newDate = new Date(date.toISOString());
        return newDate;
    };

    const adjustedDate = convertDate(date);
    let dateArr = adjustedDate.toDateString().split(' ');
    const dateString = dateArr[0] + ', ' + dateArr.slice(1).join(' ');

    const dateMeetings = filtered.filter(meeting => new Date(meeting.date).toLocaleDateString() === adjustedDate.toLocaleDateString());

    function timeString(date){
        const time = new Date(date).toLocaleTimeString();
        return time.slice(0, 4) + time.slice(7)
    }

    return (
        <Box sx={{
            display: {
                xs: 'none', 
                sm: 'block'
            },
            width: 320, 
            border: 1, 
            borderColor: 'lightgray',
            py: 1
        }}>
            <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant='h6' sx={{ fontWeight:'bold' }}>
                    Overview For Week of
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight:'bold' }}>
                    {getWeek()}
                </Typography>
            </Box>
            <Divider variant='fullWidth' />
            <Box 
                sx={{ 
                    p: 2,
                    border: 1,
                }}
            >
                {week.map(day => 
                    <Day key={day} day={day}/>
                )}
            </Box>
        </Box>
    )
}