//React Redux
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

//MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

//Components
import SelectMenu from './SelectMenu';
import GenericTable from '../Table';

//Misc
import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

export default function Students() {
    const students: Student[] = useAppSelector(state => state.students)
    const meetings = useAppSelector(state => state.meetings)
    const dispatch = useAppDispatch();

    const [coach, setCoach] = useState('All')

    useEffect(() => {
        dispatch(studentActions.fetchStudents())
        dispatch(meetingActions.fetchMeetings())
    }, [dispatch])

    if (Object.keys(students).length < 1 || Object.keys(meetings).length < 1) return null;

    const coachList = Object.values(students).map((student: Student) => student.coach)
    const coachesObj = {...[...new Set(coachList)]}; //turn into menu?
    const coachesArr = Array.from(new Set(coachList));

    function filterStudentsByCoach(){
        if (coach === 'All') return Object.values(students);
        return Object.values(students).slice().filter((student: Student) => student.coach === coach);
    }

    const buttons = []

    const filteredStudents = filterStudentsByCoach();
    const values = [
        {
            label: 'Name', 
            id: 'fullName'
        }, 
        {
            label: 'Email', 
            id: 'email'
        }
    ]

    return (
        <Box>
            <Container>
                <Container sx={{py: 4}}>
                    <Typography>Students</Typography>
                </Container>
                <Container>
                    <SelectMenu name={'Coaches'} options={coachesArr} onChange={setCoach}/>
                </Container>
                <Container>
                    <GenericTable list={filteredStudents} values={values} details={[]} buttons={[]}/>
                </Container>
            </Container>
        </Box>
    )
}