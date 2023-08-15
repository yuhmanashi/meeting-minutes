import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';
import * as pinActions from '../../store/pins';
import * as watchlistActions from '../../store/watchlists';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import CreatePinModal from '../Pins/CreatePinModal';
import Pins from '../Pins';
import Calendar from '../Calendar';
import CategoriesChart from './CategoriesChart';

function Home(){
    const [selectedDay, setSelectedDay] = useState(null);

    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);
    const sessionWatchlists = useAppSelector(state => state.watchlists);
    const sessionPins = useAppSelector(state => state.pins);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
        dispatch(studentActions.fetchStudents());
        dispatch(watchlistActions.fetchWatchlists());
        dispatch(pinActions.fetchPins());
    }, [dispatch])

    if (Object.keys(sessionMeetings).length < 1 || Object.keys(sessionStudents).length < 1 || Object.keys(sessionWatchlists).length < 1) return null;

    //data for graph
    function userFilter(obj){
        const userId = sessionUser.id
        return Object.values(obj).filter((value: any) => value.userId === userId)
    }

    const userMeetings = userFilter(sessionMeetings);
    const userPins = Object.values(sessionPins).filter((pin: Pin) => pin.authorId === sessionUser.id);
    
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
    const allCategories = Array.from(new Set(
        Object.values(sessionMeetings)
            .map((meeting: Meeting) => meeting.category)
            .filter((category: string) => category.length > 0)
    ))

    return (
        <Box>
            <Box>
                <Typography variant='h4' sx={{ m: 3, fontWeight: 'bold' }}>
                    Dashboard
                </Typography>
                {/* Calendar */}
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', alignItems: "center", m: 2,  }}>
                    <Calendar meetings={userMeetings} user={sessionUser} students={sessionStudents} setSelected={setSelectedDay}/>
                    {/* Chart */}
                    <Box sx={{display: {xs: 'none', sm: 'none', md: 'flex'}, flexDirection: 'column', alignSelf: 'stretch', width: .35}}>
                        <Typography sx={{fontWeight: 'bold', alignSelf: 'center', p: 1, width: 280}}>
                            {getDates()}
                        </Typography>
                        <Box position='relative' sx={{display: 'flex', alignItems: 'center', height: 1, width: 1}}>
                            <CategoriesChart categories={allCategories} meetings={meetingsForWeek} selected={'Week'} user={sessionUser} selectedDay={selectedDay} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', m: 2 }}>
                    {/* Watchlist */}
                    {/* <Container sx={{ maxWidth: {xs: 600, md: 330}, minWidth: {xs: 320, md: 280, lg: 340}, minHeight: {xs: 380}, maxHeight: {xs: 320, md: 490}, p: {xs: 0}, my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography sx={{typography: 'h5', px: 2}}>
                                Watchlists
                            </Typography>
                            <CreateWatchlistModal watchlists={userWatchlists} students={sessionStudents} />
                        </Box>
                        <Watchlists watchlists={userWatchlists} students={sessionStudents}/>
                    </Container> */}
                    {/* <Container sx={{ maxWidth: {xs: 600, md: 330, lg: 400}, minWidth: {xs: 320, md: 280, lg: 340}, minHeight: {xs: 380}, maxHeight: {xs: 320, md: 490}, p: {xs: 0}, m: 2 }}> */}
                    <Container sx={{maxWidth: {md: .35}}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography variant='h5' sx={{fontWeight: 'bold', px: 2}}>
                                Pinboard
                            </Typography>
                            <CreatePinModal authorId={sessionUser.id}/>
                        </Box>
                        <Pins pins={userPins}/>
                    </Container>

                    {/* Meetings */}
                    {/* <Container sx={{ maxWidth: {xs: 600, md: 700, lg: 800}, minWidth: {xs: 320, md: 570}, p: {xs: 0}, m: 2 }}> */}
                    <Container sx={{my: {sm: 2, md: 0}}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography variant='h5' sx={{fontWeight: 'bold', px: 2}}>
                                Meetings
                            </Typography>
                            <CreateMeetingModal categories={allCategories}/>
                        </Box>
                        <Meetings meetings={sessionMeetings} user={sessionUser} students={sessionStudents} categories={allCategories}/>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default Home;