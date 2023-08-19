import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

import SelectMenu from '../CommonComponents/SelectMenu';

import DataChart from './DataChart';
import DataTable from './DataTable';

export default function Data(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionStudents = useAppSelector((state) => state.students);
    const sessionMeetings = useAppSelector(state => state.meetings);
    const [time, setTime] = useState('Week');
    const [data, setData] = useState('Meeting');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentActions.fetchStudents());
        dispatch(meetingActions.fetchMeetings());
    }, [dispatch])

    if (Object.keys(sessionStudents).length < 1) return null;

    const userMeetings = Object.values(sessionMeetings).filter((meeting: Meeting) => meeting.userId === sessionUser.id);

    const updatedMeetings = userMeetings.map((meeting: Meeting) => {
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
            <Container sx={{mt: 11}}>
                <DataChart meetings={userMeetings} selected={[data, time]} user={sessionUser}/>
            </Container>
            {/* Data */}
            <Container sx={{my: 2}}>
                <Container sx={{display: 'flex'}}>
                    <SelectMenu name={'Data'} options={['Meeting', 'Category']} defaultOption={'Meeting'} onChange={setData}/>
                    <SelectMenu name={'Time'} options={['Week', 'Month', 'Year', 'All']} defaultOption={'Week'} onChange={setTime}/>
                </Container>
                {/* Table */}
                <Container>
                    <DataTable meetings={userMeetingsByDate} selected={time}/>
                </Container>
            </Container>
        </Box>
    )
};