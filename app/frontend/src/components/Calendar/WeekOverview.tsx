import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import WeeklyAccordions from './WeeklyAccordions';

import dayjs from "dayjs";

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

export default function WeekOverview({ meetings }){    
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

        for (let i = 0; i <= 6 - day; i++){ //gets today and days after;
            const currentDay = date.add(i, 'day');
            week.push(currentDay);
        }

        // const weekdays = week.map(day => day.toDate())
        return week;
    }

    const week = createWeek(dayjs())
    //gets first and last day of the week in string format
    function getWeek(){
        const first = week[0];
        const last = week[week.length - 1];
        
        function getString(day){
            return [day.month() + 1, day.date(), day.year() % 100].join('/')
        }

        return [getString(first), getString(last)].join(' - ');
    }

    return (
        <Box sx={{}}>
            <Box sx={{ border: 2, borderColor: '#1976d2' }}>
                <Box sx={{ p: 1, backgroundColor: '#1976d2' }}>
                    <Typography color='white' variant='h6' sx={{ px: 1 }}>
                        Week Overview
                    </Typography>
                    <Typography color='white' variant='subtitle1' sx={{ px: 1 }}>
                        {getWeek()}
                    </Typography>
                </Box>
                <Divider variant='fullWidth' />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <WeeklyAccordions meetings={filtered} week={week}/>
                </Box>
            </Box>
        </Box>
    )
}