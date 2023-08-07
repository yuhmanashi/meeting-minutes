import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
export default function CalendarDetails({date, meetings}){
    
    
    function convertDate(date) {
        const newDate = new Date(date.valueOf() + date.utcOffset()*60*1000);
        return newDate;
    };

    const adjustedDate = convertDate(date);
    const dateString = adjustedDate.toDateString();
    
    const dateISOString = convertDate(date).toISOString().slice(0, 10);
    // const dateString = date.toISOString().slice(0, 10)
    
    const dateMeetings = meetings.filter(meeting => meeting.date.slice(0, 10) === dateISOString);
    console.log(dateMeetings);
    return (
        <Box>
            <Typography>
                {dateString}
            </Typography>
            <Container>
                {
                    dateMeetings.length > 0 ? 
                        <List>
                            {dateMeetings.map(meeting => 
                                <ListItem key={meeting}>
                                    <ListItemText>
                                        
                                    </ListItemText>
                                    
                                </ListItem>
                            )}
                        </List>
                    : 
                        <Typography>
                            {'No meetings on this day'}
                        </Typography>
                }
            </Container>
        </Box>        
    )
}