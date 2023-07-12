import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

export default function Students() {
    const students = useAppSelector(state => state.students)
    const meetings = useAppSelector(state => state.meetings)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings())
    }, [dispatch])

    useEffect(() => {
        dispatch(studentActions.fetchStudents())
    }, [dispatch])

    if (!students || !meetings) return null;

    const coachList = Object.values(students).map(student => student.coach)
    const coaches = Array.from(new Set(coachList)); //turn into menu?

    const currCoach = coaches[0];

    function filterStudentsByCoach(coach){
        return Object.values(students).slice().filter(student => student.coach === coach)
    }
    
    const filtered = filterStudentsByCoach(currCoach);
    console.log(filtered);

    return (
        <Box>
            Students
        </Box>
    )
}