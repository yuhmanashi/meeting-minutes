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

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import GenericChart from '../Chart';

function Home(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
        dispatch(studentActions.fetchStudents());
    }, [dispatch])

    if (Object.keys(sessionMeetings).length < 1 || Object.keys(sessionStudents).length < 1) return null;

    
    //data for graph
    const meetings = Object.values(sessionMeetings);
    const data = {
        labels: meetings.map((meeting: Meeting) => meeting.category),
        datasets: [{
            label: 'Category',
            data: meetings.map((meeting: Meeting) => meeting.category),
        }],
        backgroundColor: [
            "rgba(75,192,192,1)",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
    }
    
    console.log(data);
    return (
        <Box>
            <Container sx={{ /*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'*/}}>
                <Typography sx={{typography: 'h4', my: 2}}>
                    Dashboard
                </Typography>
                <Container sx={{ maxWidth: 300, minWidth: 320 }}>
                    <GenericChart data={data} type={'donut'} title={'Category'} />
                </Container>
                <Container sx={{ maxWidth: 600, minWidth: 320, p: {xs: 0} }}>
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