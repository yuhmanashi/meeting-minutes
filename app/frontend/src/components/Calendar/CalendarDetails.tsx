import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';

export default function CalendarDetails({ selectedDay, meetings }){
    // const updatedMeetings = meetings.map(meeting => {
    //     const student = students[meeting.studentId];
    //     const newMeeting = { ...meeting }
        
    //     newMeeting['studentName'] = `${student.fullName}`;
    //     newMeeting['studentEmail'] = student.email;
        
    //     return newMeeting;
    // });

    function convertDate() {
        const newDate = new Date(selectedDay.toISOString());
        return newDate;
    };
    
    function getString(){
        const days = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        }
        
        return days[selectedDay.day()] + ', ' + [selectedDay.month() + 1, selectedDay.date(), selectedDay.year()].join('/')
    }

    const adjustedDate = convertDate();
    let dateArr = adjustedDate.toDateString().split(' ');
    const dateString = dateArr[0] + ', ' + dateArr.slice(1).join(' ');

    const dateMeetings = meetings.filter(meeting => new Date(meeting.date).toLocaleDateString() === adjustedDate.toLocaleDateString());

    function timeString(date){
        const time = new Date(date).toLocaleTimeString();
        return time.slice(0, 4) + time.slice(7)
    }

    return (
        <Box 
            sx={{ 
                border: 2,
                borderColor: '#1976d2',
                height: 358,
                minWidth: 220,
                // mx: 4
            }}
        >
            <Box sx={{ p: 1, backgroundColor: '#1976d2' }}>
                <Typography color='white' variant='h6' sx={{ px: 1 }} textAlign='center'>
                    Meetings 
                </Typography>
                <Typography color='white' variant='subtitle1' sx={{ px: 1 }} textAlign='center'>
                    {getString()}
                </Typography>
            </Box>
            <Box sx={{}}>                    
                { dateMeetings.length > 0 ? 
                    <List sx={{ py: 0 }}>
                        { dateMeetings.map(meeting => (
                            <React.Fragment key={`${meeting.id}`}>
                                <ListItem sx={{ p: 1, px: 3 }}>
                                    <ListItemText
                                        primary={meeting.studentName}
                                        secondary={`${timeString(meeting.date)} | ${meeting.category ? meeting.category : '-'}`}
                                        // primaryTypographyProps={{variant: 'subtitle1'}}
                                    />
                                </ListItem>
                                <Divider variant='fullWidth' sx={{ backgroundColor: '#1976d2' }} />
                            </React.Fragment>
                        ))}
                    </List>
                        : 
                    <React.Fragment>
                        {/* <Divider variant='fullWidth'/> */}
                        <Typography textAlign='center' sx={{ my: 2 }}>
                            {'No meetings on this day'}
                        </Typography>
                    </React.Fragment>
                }
            </Box>
            
        </Box>        
    )
}