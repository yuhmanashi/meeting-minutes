import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function CalendarDetails({date, meetings, students}){
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

    return (
        <Box sx={{ display: {xs: 'none', sm:'block'}, minWidth: {xs: 240, sm: 200, md: 160}, width: {sm: .3, md: .35}, border: 1, px: 1, py: 1 }}>
                <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>
                    Meetings for
                </Typography>
                <Typography variant='h6' sx={{fontWeight:'bold'}}>
                    {dateString}
                </Typography>
                <Box sx={{}}>
                    {
                        dateMeetings.length > 0 ? 
                            <List sx={{py: 0}}>
                                {dateMeetings.map(meeting =>
                                    <React.Fragment key={`${meeting.id}`}>
                                        
                                        <ListItem sx={{ py: 0}}>
                                            {/* <ListItemText
                                                primary={meeting.studentName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component='span'>
                                                            {meeting.category}
                                                        </Typography>
                                                        {timeString(meeting.date)}
                                                    </React.Fragment>
                                                }
                                            /> */}
                                            <ListItemText
                                                primary={meeting.studentName}
                                                secondary={`${meeting.category} | ${timeString(meeting.date)}`}
                                            />
                                        </ListItem>
                                    </React.Fragment> 
                                )}
                            </List>
                        : 
                            <Typography textAlign='center' sx={{mt: 1}}>
                                {'No meetings on this day'}
                            </Typography>
                    }
                </Box>
            
        </Box>        
    )
}