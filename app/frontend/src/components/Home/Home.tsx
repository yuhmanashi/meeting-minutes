import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import type { RootState, AppDispatch } from '../../store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';
import Button from '@mui/material/Button';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';
import * as watchlistActions from '../../store/watchlists';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import CreateWatchlistModal from '../Watchlists/Modal';
import GenericChart from '../CommonComponents/Chart';
import Watchlists from '../Watchlists';


function Home(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);
    const sessionWatchlists = useAppSelector(state => state.watchlists);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
        dispatch(studentActions.fetchStudents());
        dispatch(watchlistActions.fetchWatchlists());
    }, [dispatch])

    if (Object.keys(sessionMeetings).length < 1 || Object.keys(sessionStudents).length < 1 || Object.keys(sessionWatchlists).length < 1) return null;

    
    //data for graph
    const categoryCount = {}
    const categoryData = Object.values(sessionMeetings).map((meeting: Meeting) => meeting.category);
    
    for (let category of categoryData){
        if (!categoryCount[category]) categoryCount[category] = 0;
        categoryCount[category] += 1;
    }

    const data = {
        labels: Object.keys(categoryCount),
        datasets: [{
            label: 'Category',
            data: Object.values(categoryCount),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
        }]
    }

    const userWatchlists = Object.values(sessionWatchlists).filter((watchlist: Watchlist) => watchlist.userId === sessionUser.id)


    return (
        <Box>
            <Container sx={{ /*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'*/}}>
                <Typography sx={{typography: 'h4', my: 2}}>
                    Dashboard
                </Typography>
                <Container sx={{ maxWidth: 300, minWidth: 320, border: 1, my: 1, p: 2 }}>
                    <Typography sx={{typography: 'h5'}}>
                        Charts
                    </Typography>
                    <GenericChart data={data} type={'donut'} />
                </Container>
                <Container sx={{ maxWidth: 600, minWidth: 320, p: {xs: 0}, border: 1, my: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                        <Typography sx={{typography: 'h5'}}>
                            Watchlists
                        </Typography>
                        <CreateWatchlistModal watchlists={userWatchlists} students={sessionStudents} />
                    </Box>
                    <Watchlists watchlists={userWatchlists} students={sessionStudents}/>
                </Container>
                <Container sx={{ maxWidth: 600, minWidth: 320, p: {xs: 0}, border: 1, my: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
                        <Typography sx={{typography: 'h5'}}>
                            Meetings
                        </Typography>
                        <CreateMeetingModal />
                    </Box>
                    <Meetings meetings={sessionMeetings} user={sessionUser} students={sessionStudents}/>
                </Container>
            </Container>
        </Box>
    )
}

export default Home;