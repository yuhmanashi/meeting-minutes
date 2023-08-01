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
import { miniSerializeError } from '@reduxjs/toolkit';

export default function History(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);
    const sessionStudents = useAppSelector((state) => state.students);

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
    const dates = userMeetings.map(meeting => meeting.date)
    
    function toDate(date) {
        return new Date(date);
    }

    function toDateString(date) {
        return new Date(date).toDateString()
    }

    function sortDate(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    const sortedDates = dates.sort(sortDate);
    
    //filters
    function filterDates(dates, callback) {
        return dates.map(toDate).filter(callback);
    }
    /* This Month */
    function byThisMonth(date){
        const currentMonth = new Date().getMonth() + 1; //+1 accounts for end of this month
        return date.getMonth() === currentMonth
    }
    /* This Year */
    function byThisYear(date){
        const currentYear = new Date().getYear();
        return date.getYear() === currentYear
    }

    function byThisWeek(date){
        const days = {
            0: 31,
            1: 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31
        }
        
        const today = new Date();
        const day = today.getDay();
        const monthDay = today.getDate();
        const month = today.getMonth();

        const max = 6 - day;
        let maxDay = monthDay + max;
        let minDay = monthDay - day;

        const tDay = date.getDate();
        const tMonth = date.getMonth();

        if (tMonth === month && tDay >= minDay && tDay <= maxDay) return true;

        if (maxDay > days[month]){
            maxDay = maxDay - days[month];
            return tMonth === month + 1 && tDay <= maxDay
        }

        if (minDay < 0){
            minDay = days[month - 1] + minDay;
            return tMonth === month - 1 && tDay >= minDay
        }
    }

    const test = filterDates(sortedDates, byThisWeek).map(toDateString);

    return (
        <Box>
            {/* Charts */}
            <Container>
                {/* Charts go here */}
                {/* <GenericChart obj={} callback={} color={} type={} title={} ratio={}/> */}
                <GenericChart obj={userMeetings} callback={() => {}} color={'blue'} type={'line'} title={'meetings'}/>
            </Container>
            {/* Data */}
            <Container>
                {/* AutoComplete for toggle */}
                <Container>
                    {/* <GenericAutocomplete options={} label={} onChange={}/> */}
                    {/* <GenericAutocomplete/> */}
                </Container>
                {/* Table */}
                <Container>
                    {/* <GenericTable list={} values={} rValues={} details={} buttons={} page={} setPage={}/> */}
                    {/* <GenericTable/> */}
                </Container>
            </Container>
        </Box>
    )
};