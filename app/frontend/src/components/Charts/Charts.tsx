import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

import SelectMenu from '../CommonComponents/SelectMenu';

import DataChart from '../Meetings/DataChart';

export default function Charts(){
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

    function sortDate(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    const sortedMeetings = userMeetings.sort((a, b) => sortDate(a.date, b.date));

    function getCategories(){
        const categories = {};

        for (let meeting of userMeetings){
            const category = meeting.category;
            if (!categories[category]) categories[category] = 1;
        }

        return Object.keys(categories);
    }

    const categories = [
        'DS&A',
        'Systems Design',
        'Tech Trivia',
        'Practical Skill',
        'Debugging',
        'Walkthrough',
        'Other'
    ]

    return (
        <Box sx={{mt: 8, minHeight: 720}}>
            <Box sx={{p: 2}}>
                <Box>
                    <Typography variant='h4' sx={{fontWeight: 'bold', p: 2}}>
                        Charts
                    </Typography>
                </Box>

                <Container sx={{}}>
                    <Box sx={{px: 1}}>
                        <DataChart meetings={sortedMeetings} selected={[data, time]} categories={categories}/>
                    </Box>
                    <Box sx={{ display: 'flex', p: 1 }}>
                        <SelectMenu name={'Data'} options={['Meeting', 'Category']} defaultOption={'Meeting'} onChange={setData}/>
                        <SelectMenu name={'Time'} options={['Week', 'Month', 'Year', 'All']} defaultOption={'Week'} onChange={setTime}/>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
};