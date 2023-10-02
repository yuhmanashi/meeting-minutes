import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

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
        const today = new Date();
        const day = today.getDay();
        const monthDay = today.getDate();
        const month = today.getMonth();

        const max = 6 - day;
        let maxDay = monthDay + max;
        let minDay = monthDay - day;
        
        const tDate = new Date(date);
        let tMonth = tDate.getMonth();
        let tDay = tDate.getDate();
        let tWeekday = tDate.getDay();

        const week = {};
        for (let i = 0; i < 7; i++){
            week[i] = null;
        }

        // days after today
        for (let i = tWeekday; i < 7; i++){
            if (maxDay > days[month]){
                
            } return tMonth === month + 1 && tDay <= maxDay - days[month];
            
        }

        for (let i = tWeekday; i >= 0; i--){
            if (minDay < 0){

            } return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
        }

        return [tMonth, tDay, tWeekday];
    }

    createWeek(date);

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
            <Typography variant='h6' sx={{ px: 2, pb: 1, fontWeight:'bold' }}>
                This Week's Overview
            </Typography>
            <Typography>
                {}
            </Typography>
            <Divider variant='fullWidth' />
            <Container 
                sx={{ 
                    p: 2,
                    border: 1,
                }}
            >
                {}
            </Container>
        </Box>
    )
}