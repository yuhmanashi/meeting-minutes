import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


export default function CalendarDetails({ selectedDay, meetings }){
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

    const dateMeetings = meetings.filter(meeting => new Date(meeting.date).toLocaleDateString() === adjustedDate.toLocaleDateString());

    function timeString(date){
        const time = new Date(date).toLocaleTimeString();
        return time.slice(0, 4) + time.slice(7)
    }

    return (
        <Box 
            sx={{ 
                border: 2,
                borderColor: 'primary.main',
                height: {xs: 300, sm: 374},
            }}
        >
            <Box sx={{ p: 1, backgroundColor: 'primary.main' }}>
                <Typography color='white' variant='h6' textAlign='center' sx={{ px: 1 }} >
                    Meetings 
                </Typography>
                <Typography color='white' variant='subtitle1' textAlign='center' sx={{ px: 1 }} >
                    {getString()}
                </Typography>
            </Box>
            <Box 
                sx={{
                    height: {xs: 220, sm: 290}, 
                    overflowY: 'auto',
                    "&::-webkit-scrollbar": {
                        width: "3px"
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: "5px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: 'darkgray',
                        borderRadius: "5px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "grey",
                    }, 
                }}
            >                    
                { dateMeetings.length > 0 ? 
                    <List sx={{ py: 0 }}>
                        { dateMeetings.map(meeting => (
                            <React.Fragment key={`${meeting.id}`}>
                                <ListItem sx={{ p: 1, px: 3 }}>
                                    <ListItemText
                                        primary={meeting.studentName}
                                        secondary={`${timeString(meeting.date)} | ${meeting.category ? meeting.category : '-'}`}
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