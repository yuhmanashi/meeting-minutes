import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';
import * as pinActions from '../../store/pins';
import * as watchlistActions from '../../store/watchlists';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import CreateWatchlistModal from '../Watchlists/Modal';
import CreatePinModal from '../Pins/CreatePinModal';
import GenericChart from '../CommonComponents/Chart';
import GenericMenu from '../CommonComponents/Menu';
import Pins from '../Pins';
import Watchlists from '../Watchlists';
import Calendar from '../Calendar';
import HistoryChart from '../History/HistoryChart';

function Home(){
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

    //how many times a category shows up
    const userMeetings = userFilter(sessionMeetings);
    const userWatchlists = Object.values(sessionWatchlists).filter((watchlist: Watchlist) => watchlist.userId === sessionUser.id)
    const userPins = Object.values(sessionPins).filter((pin: Pin) => pin.authorId === sessionUser.id);
    
    return (
        <Box>
            <Container sx={{ /*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'*/}}>
                <Typography sx={{typography: 'h4', my: 3}}>
                    Dashboard
                </Typography>
                {/* Calendar */}
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', alignItems: "center", my: 2 }}>
                    <Calendar meetings={sessionMeetings} user={sessionUser} students={sessionStudents}/>
                    {/* Chart */}
                    {/* <Box sx={{display: 'flex', justifyContent: 'center', maxHeight: '50%'}} position='relative'>
                        <GenericChart obj={userMeetings} callback={value => value.category} color={'blue'} type={'donut'} title={'categories frequency'} ratio={1}/>
                    </Box> */}
                    <Box sx={{display: {sm: 'none', md: 'flex'}, alignSelf: 'stretch', width: '40%', border: 1}}>
                        <Box position='relative' sx={{display: 'flex', alignItems: 'center', width: 1, border: 1}}>
                            <HistoryChart meetings={userMeetings} selected={'Week'} user={sessionUser}/>
                        </Box>
                    </Box>
                    
                </Box>
                {/* Chart */}
                {/* <Container sx={{ my: 1, width: '90%', display: {md:'flex', lg: 'flex'}, mx: {md: 0, lg: 0}, justifyContent: 'center' }}>
                    <Container sx={{ p: 1, display: {xs: 'block', sm:'none', md: 'none', lg: 'none'} }}>
                        <GenericChart obj={userMeetings} callback={value => value.category} color={'green'} type={'donut'} title={'categories frequency'} ratio={1} />
                    </Container>
                    <Container sx={{ display: {xs: 'none', sm:'block', md: 'block', lg: 'block'}, my: 3 }}>
                        <GenericChart obj={userMeetings} callback={value => value.category} color={'green'} type={'donut'} title={'categories frequency'} />
                    </Container>
                    <Container sx={{ display: {xs: 'none', sm:'block', md: 'block', lg: 'block'}, my: 3 }}>
                        <GenericChart obj={userMeetings} callback={value => sessionStudents[value.studentId].fullName} color={'blue'} type={'bar'} title={'#meetings w/ students'}/>
                    </Container>
                </Container> */}
                <Box sx={{ display: { xs:'block', md:'flex' }, my: 2 }}>
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
                    <Container sx={{ maxWidth: {xs: 600, md: 330}, minWidth: {xs: 320, md: 280, lg: 340}, minHeight: {xs: 380}, maxHeight: {xs: 320, md: 490}, p: {xs: 0}, my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography sx={{typography: 'h5', px: 2}}>
                                Pinboard
                            </Typography>
                            <CreatePinModal authorId={sessionUser.id}/>
                        </Box>
                        <Pins pins={userPins}/>
                    </Container>

                    {/* Meetings */}
                    <Container sx={{ maxWidth: {xs: 600, md: 650, lg: 700}, minWidth: {xs: 320, md: 570}, p: {xs: 0}, my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                            <Typography sx={{typography: 'h5', px: 2}}>
                                Meetings
                            </Typography>
                            <CreateMeetingModal />
                        </Box>
                        <Meetings meetings={sessionMeetings} user={sessionUser} students={sessionStudents}/>
                    </Container>
                </Box>
            </Container>
            <Box>
                Footer
            </Box>
        </Box>
    )
}

export default Home;