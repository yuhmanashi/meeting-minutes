import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import * as studentActions from '../../store/students';
import * as meetingActions from '../../store/meetings';
import * as pinActions from '../../store/pins';

import CreatePinModal from '../Notes/CreateNoteModal';
import Pins from '../Notes';
import Calendar from '../Calendar';
import WeekOverview from '../Calendar/WeekOverview';
import CalendarDetails from '../Calendar/CalendarDetails';

import dayjs from 'dayjs';

function Home(){
    const [selectedDay, setSelectedDay] = useState(null);

    const sessionUser = useAppSelector(state => state.session.user);
    const sessionStudents = useAppSelector(state => state.students);
    const sessionMeetings = useAppSelector(state => state.meetings);
    const sessionPins = useAppSelector(state => state.pins);

    function userFilter(obj){
        const values = Object.values(obj);
        return values.filter((value: any) => value.userId ? value.userId === sessionUser.id : value.authorId === sessionUser.id)
    };

    const userMeetings: any = userFilter(sessionMeetings);
    const userPins: any = userFilter(sessionPins);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentActions.fetchStudents());
        dispatch(meetingActions.fetchMeetings());
        dispatch(pinActions.fetchPins())
    }, [dispatch])

    if (Object.keys(sessionStudents).length < 1) return null;

    const updatedMeetings = userMeetings.map((meeting: Meeting) => {
        const student = sessionStudents[meeting.studentId];
        const newMeeting = { ...meeting }
        newMeeting['studentName'] = `${student.fullName}`;
        newMeeting['studentEmail'] = student.email;
        
        return newMeeting;
    });
    
    function sortDate(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    const sortedMeetings = updatedMeetings.sort((a, b) => sortDate(a.date, b.date));

    function getToday(){
        const days = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        }

        const today = new Date();
        
        return days[today.getDay()] + ', ' + today.toLocaleDateString();
    }

    const notes = 
        <Box sx={{ border: 2, borderColor: '#ff9f79', width: {xs: 320, sm: 1, lg: 385}, height: {xs: 440, lg: 374}, }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    backgroundColor: '#ff9f79'
                }}
            >
                <Typography variant='h5' sx={{ color: 'white', p: 2 }}>
                    Notes
                </Typography>
                <CreatePinModal authorId={sessionUser.id}/>
            </Box>
            <Pins pins={userPins}/>
        </Box>
    
    const bottom = 
        <Box sx={{ display: {xs: 'flex', lg: 'none'}, my: 2, justifyContent: 'center' }}>
            {notes}
        </Box>

    return (
        <Box>
            <Box sx={{ mt: 8, minHeight: 720 }}>
                <Box sx={{ p: {xs: 2, sm: 4} }}>
                    <Box sx ={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h4' fontWeight='bold'>Dashboard</Typography>
                    </Box>

                    {/* Calendar */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: {xs: 'column', sm: 'row'}, 
                            alignItems: {xs: 'center', sm: 'normal',}, 
                            justifyContent: 'space-between', 
                            my: 4,
                            mt: {lg: 10} 
                        }}
                    >
                        <Calendar meetings={sortedMeetings} setSelected={setSelectedDay} />
                        <Box sx={{ width: {xs: 320, sm: .4, md: 220}, mt: {xs: 4, sm: 0} }}>
                            <CalendarDetails selectedDay={selectedDay === null ? dayjs() : selectedDay} meetings={sortedMeetings}/>
                        </Box>

                        <Box sx={{ width: 220, display: { xs: 'none', md: 'block' }}}>
                            <WeekOverview meetings={sortedMeetings} selectedDay={selectedDay === null ? dayjs() : selectedDay}/>
                        </Box>
                        
                        <Box sx={{ display: {xs: 'none', lg: 'flex'} }}>
                            {notes}
                        </Box>
                    </Box>
   
                    {/* Bottom */}
                    {bottom}
                </Box>
            </Box>
        </Box>
    )
}

export default Home;