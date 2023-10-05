import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';

import * as studentActions from '../../store/students';
import * as meetingActions from '../../store/meetings';
import * as pinActions from '../../store/pins';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import CreatePinModal from '../Pins/CreatePinModal';
import Pins from '../Pins';
import Calendar from '../Calendar';
import WeekOverview from '../Calendar/WeekOverview';
import CalendarDetails from '../Calendar/CalendarDetails';

import CategoriesChart from './CategoriesChart';
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

    // function getDates(){
    //     const days = {
    //         0: 31,
    //         1: 28,
    //         2: 31,
    //         3: 30,
    //         4: 31,
    //         5: 30,
    //         6: 31,
    //         7: 31,
    //         8: 30,
    //         9: 31,
    //         10: 30,
    //         11: 31
    //     }

    //     const selected = selectedDay ? selectedDay : new Date();
    //     const day = selected.getDay();
    //     const monthDay = selected.getDate();
    //     const month = selected.getMonth();
    
    //     const max = 6 - day;
    //     const maxDay = monthDay + max;
    //     const minDay = monthDay - day;

    //     let minDate;
    //     let maxDate;
    
    //     if (minDay < 0){
    //         minDate = [month, days[month - 1] + minDay]
    //     } else {
    //         minDate = [month + 1, minDay]
    //     }

    //     if (maxDay > days[month]){
    //         maxDate = [month + 2, maxDay - days[month]];
    //     } else {
    //         maxDate = [month + 1, maxDay]
    //     }

    //     return 'Categories for Week of ' + minDate.join('/') + ' - ' + maxDate.join('/')
    // }

    // const allCategories = [
    //     'DS&A',
    //     'Systems Design',
    //     'Tech Trivia',
    //     'Practical Skill',
    //     'Other'
    // ]

    const updatedMeetings = userMeetings.map((meeting: Meeting) => {
        const student = sessionStudents[meeting.studentId];
        const newMeeting = { ...meeting }
        newMeeting['studentName'] = `${student.fullName}`;
        newMeeting['studentEmail'] = student.email;
        newMeeting['createdAt'] = new Date(meeting.createdAt).toLocaleDateString()
        return newMeeting;
    });

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
        <Box sx={{ border: 2, borderColor: '#1976d2', minWidth: .25, maxWidth: 350, height: 428, }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    backgroundColor: '#1976d2'
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
        <Box sx={{ display: 'flex', my: 4, width: .8, border: 1, }}>
            {notes}
        </Box>

    // const chart = 
    //     <Box 
    //         sx={{
    //             display: 'flex', 
    //             flexDirection: 'column', 
    //             alignSelf: 'stretch', 
    //             width: .5, 
    //             border: 2, 
    //             borderColor: '#1976d2'
    //         }}
    //     >   
    //         <Box sx={{ p: 2, width: 1, backgroundColor: '#1976d2'}}>
    //             <Typography sx={{ color: 'white' }}>
    //                 {getDates()}
    //             </Typography>
    //         </Box>
    //         <Box 
    //             position='relative' 
    //             sx={{
    //                 display: 'flex', 
    //                 alignItems: 'center', 
    //                 height: 1, 
    //                 width: 1,
    //                 p: 2
    //             }}
    //         >
    //             <CategoriesChart categories={allCategories} meetings={userMeetings} selected={'Week'} selectedDay={selectedDay} />
    //         </Box>
    //     </Box>

    // const meetingsComponent = 
    //     <Container sx={{my: {sm: 2, md: 0}, }}>
    //         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
    //             <Typography variant='h5' sx={{fontWeight: 'bold', p: 2}}>
    //                 Meetings
    //             </Typography>
    //             <CreateMeetingModal categories={allCategories}/>
    //         </Box>
    //         <Box sx={{border: 1, borderColor: 'lightgray'}}>
    //             <Typography sx={{border: 1, borderColor: 'lightgray'}}>
    //                 change this shit to something else, meetings are redundant
    //             </Typography>
    //         </Box >

    //         <Meetings meetings={userMeetings} students={sessionStudents} categories={allCategories}/>
    //     </Container>

    return (
        <Box>
            <Box sx={{ mt: 8 }}>
                <Box sx={{ p: 4 }}>
                    <Box sx ={{ display: 'flex', alignItems: 'center' }}>
                        {/* <Typography variant='h4' fontWeight= 'bold' sx={{  }}>
                            Dashboard
                        </Typography> */}
                        <Typography 
                            sx={{
                                backgroundColor: '#1976d2', 
                                p: 2,
                            }}
                            color='white'
                            variant='h4'
                        >
                            Dashboard
                        </Typography>
                        <Typography 
                            sx={{
                                backgroundColor: '#1976d2', 
                                p: 2,
                                ml: 4
                            }}
                            color='white'
                            variant='h4'
                        >
                            {getToday()}
                        </Typography>
                    </Box>

                    {/* <Box sx={{ mt: 2, display: 'flex', }}>
                        <Typography 
                            sx={{ backgroundColor: '#1976d2', p: 2, }}
                            color='white'
                            variant='h5'
                        >
                            {getToday()}
                        </Typography>
                    </Box> */}
                    {/* Calendar */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 4, p: 1, border: 1, }}>
                        <Calendar meetings={updatedMeetings} setSelected={setSelectedDay} />
                        <CalendarDetails selectedDay={selectedDay === null ? dayjs() : selectedDay} meetings={updatedMeetings}/>
                        <WeekOverview meetings={updatedMeetings}/>
                        {notes}
                    </Box>

                    {/* Bottom */}
                    {/* {bottom} */}
                </Box>
            </Box>
        </Box>
    )
}

export default Home;