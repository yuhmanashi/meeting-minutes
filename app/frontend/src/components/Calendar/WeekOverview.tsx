import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import { Typography, Divider } from '@mui/material';

export default function WeekOverview({date, meetings, students}){
    const updatedMeetings = meetings.map(meeting => {
        const student = students[meeting.studentId];
        const newMeeting = { ...meeting }
        
        newMeeting['studentName'] = `${student.fullName}`;
        newMeeting['studentEmail'] = student.email;
        
        return newMeeting;
    });

    function convertDate(date) {
        const newDate = new Date(date.toISOString());
        return newDate;
    };

    const adjustedDate = convertDate(date);
    let dateArr = adjustedDate.toDateString().split(' ');
    const dateString = dateArr[0] + ', ' + dateArr.slice(1).join(' ');

    const dateMeetings = updatedMeetings.filter(meeting => new Date(meeting.date).toLocaleDateString() === adjustedDate.toLocaleDateString());

    function timeString(date){
        const time = new Date(date).toLocaleTimeString();
        return time.slice(0, 4) + time.slice(7)
    }

    //

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
                Weekly Overview
            </Typography>
            <Divider variant='fullWidth' />
            <Box 
                sx={{ 
                    p: 2
                }}
            >
                {}
            </Box>
        </Box>
    )
}