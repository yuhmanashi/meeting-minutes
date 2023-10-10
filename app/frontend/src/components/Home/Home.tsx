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
        
        return newMeeting;
    });
    
    function sortDate(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    const sortedMeetings = updatedMeetings.sort((a, b) => sortDate(a.date, b.date));

    // console.log(sortedMeetings);

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
    // minWidth: 270, maxWidth: 350
    const notes = 
        <Box sx={{ border: 2, borderColor: '#ff9f79', width: {xs: 320, sm: 1, lg: 1}, height: {xs: 440, lg: 374}, }}>
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
            <Box sx={{ mt: 8, minHeight: 720 }}>
                <Box sx={{ p: {xs: 2, sm: 4} }}>
                    <Box sx ={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                            variant='h4' 
                            fontWeight='bold'
                            sx={{
                                // display: {xs: 'none', sm: 'block'},
                                // backgroundColor: 'primary.main',
                                // p: 2,
                                // typography: { sm: 'h5', md: 'h4' }
                                
                            }}
                            
                            // color='white'
                        >
                            Dashboard
                        </Typography>
                        {/* <Typography 
                            variant='h4' 
                            fontWeight='bold'
                            sx={{
                                // backgroundColor: 'primary.main',
                                p: 2,
                                // typography: { xs: 'h5', md: 'h4' },
                                mx: {xs: 'auto', sm: 4}
                            }}
                            
                            // color='white'
                        >
                            {getToday()}
                        </Typography> */}
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
                        {/* <CalendarDetails selectedDay={selectedDay === null ? dayjs() : selectedDay} meetings={updatedMeetings}/> */}
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