import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

import SelectMenu from '../CommonComponents/SelectMenu';

import DataTable from './DataTable';

import CreateMeetingModal from './CreateMeetingModal';
import UpdateMeetingModal from './UpdateMeetingModal';

export default function Meetings(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionStudents = useAppSelector((state) => state.students);
    const sessionMeetings = useAppSelector(state => state.meetings);
    const [time, setTime] = useState('Week');
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
        newMeeting['dateString'] = new Date(meeting.date).toISOString();
        newMeeting['studentName'] = `${student.fullName}`;
        newMeeting['studentEmail'] = student.email;

        return newMeeting;
    });

    function sortDate(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    const sortedMeetings = updatedMeetings.sort((a, b) => sortDate(a.date, b.date));

    function getCategories(){
        const categories = {};

        for (let meeting of userMeetings){
            const category = meeting.category;
            if (!categories[category]) categories[category] = 1;
        }

        return Object.keys(categories);
    }

    function handleDelete(id){
        return dispatch(meetingActions.deleteMeeting(id))
    }

    function createButtons(meeting) {
        return [
            <UpdateMeetingModal meeting={meeting} categories={getCategories()}/>,
            <Button size='small' onClick={() => handleDelete(meeting.id)}>
                Delete
            </Button>
        ]
    };

    return (
        <Box sx={{mt: 8, minHeight: 720}}>
            <Box sx={{p: 2}}>
                <Box sx={{mb: 2}}>
                    <Typography variant='h4' sx={{fontWeight: 'bold', p: 2}}>
                        Meetings
                    </Typography>
                </Box>
                
                <Container sx={{}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CreateMeetingModal categories={getCategories()}/>
                    </Box>
                    <Box sx={{ display: 'flex', p: 1 }}>
                        <SelectMenu name={'Time'} options={['Week', 'Month', 'Year', 'All']} defaultOption={'Week'} onChange={setTime}/>
                    </Box>
                    <Box sx={{ px: 1 }}>
                        <DataTable meetings={sortedMeetings} selected={time} createButtons={createButtons}/>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
};