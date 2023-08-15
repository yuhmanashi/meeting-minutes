import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

import SelectMenu from '../CommonComponents/SelectMenu';

import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';

export default function History(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);

    const [selected, setSelected] = useState('Week');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
        dispatch(studentActions.fetchStudents());
    }, [dispatch])

    if (Object.keys(sessionMeetings).length < 1 || Object.keys(sessionStudents).length < 1) return null;

    function userFilter(obj){
        const userId = sessionUser.id
        return Object.values(obj).filter(value => value.userId === userId)
    }

    const userMeetings = userFilter(sessionMeetings);

    const updatedMeetings = userMeetings.map(meeting => {
        const student = sessionStudents[meeting.studentId];
        const newMeeting = { ...meeting }
        newMeeting['studentName'] = `${student.fullName}`;
        newMeeting['studentEmail'] = student.email;
        newMeeting['createdAt'] = new Date(meeting.createdAt).toLocaleDateString()
        return newMeeting;
    });

    const userMeetingsByDate = updatedMeetings.sort((a, b) => 
        a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    )

    return (
        <Box>
            {/* Charts */}
            <Container sx={{my: 4}}>
                <Typography variant='h5' sx={{my: 3, fontWeight: 'bold'}}>{selected === 'All' ? 'All Meetings To Date' : `Meetings For This ${selected}`}</Typography>
                <HistoryChart meetings={userMeetings} selected={selected} user={sessionUser}/>
            </Container>
            {/* Data */}
            <Container sx={{mt: 2}}>
                <Container>
                    <SelectMenu name={'Time'} options={['Week', 'Month', 'Year', 'All']} defaultOption={'Week'} onChange={setSelected}/>
                </Container>
                {/* Table */}
                <Container>
                    <HistoryTable meetings={userMeetingsByDate} selected={selected}/>
                </Container>
            </Container>
        </Box>
    )
};