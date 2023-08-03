import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CalendarDetails({date, meetings}){
    function convertDate(date) {
        const newDate = new Date(date.valueOf() + date.utcOffset()*60*1000);
        return newDate;
    }
    const dateString = convertDate(date).toISOString().slice(0, 10)
    // const dateString = date.toISOString().slice(0, 10)
    const dateMeetings = meetings.filter(meeting => meeting.date.slice(0, 10) === dateString)
    console.log(dateMeetings);
    return (
        <Box>
            <Typography>

            </Typography>
            <Container>

            </Container>
        </Box>        
    )
}