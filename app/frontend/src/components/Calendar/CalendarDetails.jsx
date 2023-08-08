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

    return (
        <Box sx={{ display: {xs: 'none', sm:'block'}, minWidth: 200, border: 1, mx: 4 }}>
                <Typography variant='h6' sx={{fontWeight:'bold', p: 2, pb: 0}}>
                    {dateString}
                </Typography>
                <Box sx={{p: 1}}>
                    {
                        dateMeetings.length > 0 ? 
                            <List sx={{py: 0}}>
                                {dateMeetings.map(meeting => 
                                    <ListItem key={`${meeting.id}`} sx={{py: 0}}>
                                        <ListItemText
                                            primary={meeting.studentName}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component='span'>
                                                        {meeting.category}
                                                    </Typography>
                                                    {' - xx:xx'}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                )}
                            </List>
                        : 
                            <Typography>
                                {'No meetings on this day'}
                            </Typography>
                    }
                </Box>
            
        </Box>        
    )
}