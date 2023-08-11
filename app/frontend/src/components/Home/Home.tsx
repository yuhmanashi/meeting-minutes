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

    //how many times a category shows up
    const userMeetings = userFilter(sessionMeetings);
    const userWatchlists = Object.values(sessionWatchlists).filter((watchlist: Watchlist) => watchlist.userId === sessionUser.id)
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
        
        function convertDate(date) {
            const newDate = new Date(date.valueOf() + date.utcOffset()*60*1000);
            return newDate;
        };

        const today = selectedDay ? convertDate(selectedDay) : new Date();
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

    return (
        <Box>
            <Container sx={{ /*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'*/}}>
                <Typography sx={{typography: 'h4', my: 3}}>
                    Dashboard
                </Typography>
                {/* Calendar */}
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, justifyContent: 'center', alignItems: "center", my: 2 }}>
                    <Calendar meetings={userMeetings} user={sessionUser} students={sessionStudents} setSelected={setSelectedDay}/>
                    {/* Chart */}
                    {/* <Box sx={{display: 'flex', justifyContent: 'center', maxHeight: '50%'}} position='relative'>
                        <GenericChart obj={userMeetings} callback={value => value.category} color={'blue'} type={'donut'} title={'categories frequency'} ratio={1}/>
                    </Box> */}
                    <Box sx={{display: {xs: 'none', sm: 'none', md: 'flex'}, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'space-evenly', width: .35, border: 1}}>
                        <Typography sx={{alignSelf: 'center'}}>
                            Meetings for week of xx/xx - xx/xx
                        </Typography>
                        <Box position='relative' sx={{display: 'flex', alignItems: 'center', width: 1, border: 1}}>
                            <HistoryChart meetings={userMeetings.filter(byWeek)} selected={'Week'} user={sessionUser}/>
                        </Box>
                    </Box>
                    
                </Box>
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