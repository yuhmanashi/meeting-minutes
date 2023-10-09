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

    if (Object.keys(sessionStudents).length < 1 || Object.keys(sessionMeetings).length < 1) return null;

    function userFilter(obj){
        const values = Object.values(obj);
        return values.filter((value: any) => value.userId ? value.userId === sessionUser.id : value.authorId === sessionUser.id)
    };

    const userMeetings: any = userFilter(sessionMeetings);

    function handleDateString(date){
        const dateString = new Date(date).toLocaleDateString();
        if (dateString.length === 10) return dateString;
        const strs = dateString.split('/');
        if (strs[0].length < 2) strs[0] = '0' + strs[0];
        if (strs[1].length < 2) strs[1] = '0' + strs[1]; 
        return strs.join('/');
    }

    const updatedMeetings = userMeetings.map((meeting: Meeting) => {
        const student = sessionStudents[meeting.studentId];
        const newMeeting = { ...meeting }
        newMeeting.date = handleDateString(meeting.date);

        newMeeting['studentName'] = `${student.fullName}`;
        newMeeting['studentEmail'] = student.email;

        return newMeeting;
    });

    function sortDate(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    const sortedMeetings = updatedMeetings.sort((a, b) => sortDate(a.date, b.date));

    return (
        <Box sx={{mt: 8, minHeight: 720}}>
            <Box sx={{p: 2}}>
                <Box>

                </Box>
                {/* Charts */}
                {/* <Container sx={{mt: 11}}>
                    <DataChart meetings={userMeetings} selected={[data, time]} user={sessionUser}/>
                </Container> */}
                {/* Data */}
                <Container sx={{my: 2}}>
                    <Container sx={{display: 'flex'}}>
                        <SelectMenu name={'Data'} options={['Meeting', 'Category']} defaultOption={'Meeting'} onChange={setData}/>
                        <SelectMenu name={'Time'} options={['Week', 'Month', 'Year', 'All']} defaultOption={'Week'} onChange={setTime}/>
                    </Container>
                    {/* Table */}
                    <Container>
                        <DataTable meetings={sortedMeetings} selected={time}/>
                    </Container>
                </Container>
            </Box>
        </Box>
    )
};