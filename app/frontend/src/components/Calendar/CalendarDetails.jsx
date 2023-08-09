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
        newMeeting['createdAt'] = new Date(meeting.createdAt).toLocaleDateString()
        return newMeeting;
    });

    function convertDate(date) {
        const newDate = new Date(date.valueOf() + date.utcOffset()*60*1000);
        return newDate;
    };

    const adjustedDate = convertDate(date);
    let dateArr = adjustedDate.toDateString().split(' ');
    const dateString = dateArr[0] + ', ' + dateArr.slice(1).join(' ');

    
    const dateISOString = convertDate(date).toISOString().slice(0, 10);
    // const dateString = date.toISOString().slice(0, 10)
    
    const dateMeetings = updatedMeetings.filter(meeting => meeting.date.slice(0, 10) === dateISOString);
    
    function timeString(date){
        const time = new Date(date).toLocaleTimeString();
        return time.slice(0, 4) + time.slice(7)
    }

    return (
        <Box sx={{ display: {xs: 'none', sm:'block'}, minWidth: 200, border: 1, mx: 4 }}>
                <Typography variant='h6' sx={{fontWeight:'bold', p: 2, pb: 0}}>
                    Meetings for
                </Typography>
                <Typography variant='h6' sx={{fontWeight:'bold', px: 2, py: 0}}>
                    {dateString}
                </Typography>
                <Box sx={{p: 1}}>
                    {
                        dateMeetings.length > 0 ? 
                            <List sx={{py: 0}}>
                                {dateMeetings.map(meeting =>
                                    <React.Fragment>
                                        
                                        <ListItem key={`${meeting.id}`} sx={{ py: 0}}>
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
                            <Typography textAlign='center'>
                                {'No meetings on this day'}
                            </Typography>
                    }
                </Box>
            
        </Box>        
    )
}