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

//Components
import SelectMenu from './SelectMenu';
import GenericTable from './Table';

//Misc
import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

export default function Students() {
    const students = useAppSelector(state => state.students)
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
        if (coach === 'All') return students;
        return Object.values(students).slice().filter((student: Student) => student.coach === coach);
    }

    const filteredStudents = filterStudentsByCoach();

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
                    <GenericTable students={filteredStudents} details={[['Name', 'fullName'], ['Email', 'email']]}/>
                    {/* <List>
                        {Object.values(filteredStudents).map((student: Student) => {
                            return (
                                <ListItem key={student.id}>
                                    <ListItemText>
                                        {student.coach}
                                    </ListItemText>
                                    <ListItemText>
                                        {student.email}
                                    </ListItemText>
                                    <ListItemText>
                                        {`${student.firstName} ${student.lastName}`}
                                    </ListItemText>
                                </ListItem>
                            )
                        })}
                    </List> */}
                </Container>
            </Container>
        </Box>
    )
}