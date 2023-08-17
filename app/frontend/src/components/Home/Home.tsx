import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';

import * as studentActions from '../../store/students';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import CreatePinModal from '../Pins/CreatePinModal';
import Pins from '../Pins';
import Calendar from '../Calendar';
import CategoriesChart from './CategoriesChart';

function Home(){
    const [selectedDay, setSelectedDay] = useState(null);

    const sessionUser = useAppSelector(state => state.session.user);
    const sessionStudents = useAppSelector((state) => state.students);
    const userMeetings: Meeting[] = Object.values(sessionUser.meetings);
    const userPins: Pin[] = Object.values(sessionUser.pins);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentActions.fetchStudents());
    }, [dispatch])

    if (Object.keys(sessionStudents).length < 1) return null;

    function byWeek(meeting){
        const days = {
            0: 31,
            1: 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31
        }

        const today = selectedDay ? selectedDay : new Date();
        const day = today.getDay();
        const monthDay = today.getDate();
        const month = today.getMonth();
    
        const max = 6 - day;
        let maxDay = monthDay + max;
        let minDay = monthDay - day;
    
        const tDay = new Date(meeting.date).getDate();
        const tMonth = new Date(meeting.date).getMonth();

        if (tMonth === month && tDay >= minDay && tDay <= maxDay) return true;
    
        if (maxDay > days[month]) return tMonth === month + 1 && tDay <= maxDay - days[month];
    
        if (minDay < 0) return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
    }

    function getDates(){
        const days = {
            0: 31,
            1: 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31
        }

        const selected = selectedDay ? selectedDay : new Date();
        const day = selected.getDay();
        const monthDay = selected.getDate();
        const month = selected.getMonth();
    
        const max = 6 - day;
        const maxDay = monthDay + max;
        const minDay = monthDay - day;

        let minDate;
        let maxDate;
    
        if (minDay < 0){
            minDate = [month, days[month - 1] + minDay]
        } else {
            minDate = [month + 1, minDay]
        }

        if (maxDay > days[month]){
            maxDate = [month + 2, maxDay - days[month]];
        } else {
            maxDate = [month + 1, maxDay]
        }

        return 'Categories for Week of ' + minDate.join('/') + ' - ' + maxDate.join('/')
    }

    const meetingsForWeek = userMeetings.filter(byWeek)
    const allCategories = [
        'DS&A',
        'Systems Design',
        'Tech Trivia',
        'Practical Skill',
        'Other'
    ]

    return (
        <Box>
            <Box sx={{mt: 11}}>
                <Typography variant='h4' sx={{ m: 3, fontWeight: 'bold' }}>
                    Dashboard
                </Typography>
                {/* Calendar */}
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', alignItems: "center", m: 2,  }}>
                    <Calendar meetings={userMeetings} students={sessionStudents} setSelected={setSelectedDay}/>
                    {/* Chart */}
                    <Box sx={{display: {xs: 'none', sm: 'none', md: 'flex'}, flexDirection: 'column', alignSelf: 'stretch', width: .35}}>
                        <Typography sx={{fontWeight: 'bold', alignSelf: 'center', p: 1, width: 300}}>
                            {getDates()}
                        </Typography>
                        <Box position='relative' sx={{display: 'flex', alignItems: 'center', height: 1, width: 1}}>
                            <CategoriesChart categories={allCategories} meetings={meetingsForWeek} selected={'Week'} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', m: 2 }}>
                    <Container sx={{maxWidth: {md: .35}}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography variant='h5' sx={{fontWeight: 'bold', p: 2}}>
                                Pinboard
                            </Typography>
                            <CreatePinModal authorId={sessionUser.id}/>
                        </Box>
                        <Pins pins={userPins}/>
                    </Container>

                    {/* Meetings */}
                    <Container sx={{my: {sm: 2, md: 0}}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography variant='h5' sx={{fontWeight: 'bold', p: 2}}>
                                Meetings
                            </Typography>
                            <CreateMeetingModal categories={allCategories}/>
                        </Box>
                        <Meetings meetings={userMeetings} students={sessionStudents} categories={allCategories}/>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;