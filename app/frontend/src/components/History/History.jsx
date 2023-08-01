import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';
import Button from '@mui/material/Button';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';
import GenericChart from '../CommonComponents/Chart';
import GenericAutocomplete from '../CommonComponents/AutoComplete';
import GenericTable from '../CommonComponents/Table/Table';

export default function History(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);

    const dispatch = useAppDispatch();

    if (Object.keys(sessionMeetings).length < 1 || Object.keys(sessionStudents).length < 1) return null;

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
        dispatch(studentActions.fetchStudents());
    }, [dispatch])

    return (
        <Box>
            {/* Charts */}
            <Container>
                {/* Charts go here */}
                {/* <GenericChart obj={} callback={} color={} type={} title={} ratio={}/> */}
                <GenericChart/>
            </Container>
            {/* Data */}
            <Container>
                {/* AutoComplete for toggle */}
                <Container>
                    {/* <GenericAutocomplete options={} label={} onChange={}/> */}
                    <GenericAutocomplete/>
                </Container>
                {/* Table */}
                <Container>
                    {/* <GenericTable list={} values={} rValues={} details={} buttons={} page={} setPage={}/> */}
                    <GenericTable/>
                </Container>
            </Container>
        </Box>
    )
};