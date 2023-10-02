import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

export default function Day({day}){
    const [date, setDate] = useState('date');
    const [meetings, setMeetings] = useState('meetings');

    const weekday = day.day();

    return (
        <Box>
            <Typography>
                {days[weekday]}
            </Typography>
        </Box>
        //single day should have
            //day of week
            //date
            //# of meetings
                // if clicked, meeting details
    )
}