import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

export default function Day({ day, handleChange, meetings }){
    const weekday = day.day();

    function convertDate(date) {
        const newDate = new Date(date.toISOString());
        return newDate;
    };

    const adjustedDate = convertDate(day);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: .9}}>
            <Typography variant='button' >
                {days[weekday]}
            </Typography>
            <Typography variant='button' >
                {meetings.length}
            </Typography>
        </Box>
    )
}