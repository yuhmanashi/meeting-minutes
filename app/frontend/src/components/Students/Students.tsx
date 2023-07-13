import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SelectMenu from './SelectMenu';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

export default function Students() {
    const students = useAppSelector(state => state.students)
    const meetings = useAppSelector(state => state.meetings)
    const dispatch = useAppDispatch();

    const [coachIdx, setCoachIdx] = useState(-1);

    useEffect(() => {
        dispatch(studentActions.fetchStudents())
        dispatch(meetingActions.fetchMeetings())
    }, [dispatch])

    if (Object.keys(students).length < 1 || Object.keys(meetings).length < 1) return null;

    const coachList = Object.values(students).map((student: Student) => student.coach)
    const coachesObj = {...[...new Set(coachList)]}; //turn into menu?
    const coachesArr = Array.from(new Set(coachList));


    function filterStudentsByCoach(){
        if (coachIdx < 0) return students;
        return Object.values(students).slice().filter((student: Student) => student.coach === coachesObj[coachIdx]);
    }

    const filtered = filterStudentsByCoach();
    //coaches into a 

    return (
        <Box>
            <Container>
                <Typography>Students</Typography>
                <SelectMenu name={'Coaches'} options={coachesArr}/>
            </Container>
        </Box>
    )
}