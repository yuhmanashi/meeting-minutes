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
import SelectMenu from '../CommonComponents/SelectMenu';

function toDate(date) {
    return new Date(date);
}

function toDateString(date) {
    return new Date(date).toDateString()
}

function sortDate(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
}

//filters
function filterDates(dates, callback) {
    return dates.map(toDate).filter(callback);
}
/* This Month */
function byThisMonth(date){
    const currentMonth = new Date().getMonth();
    return date.getMonth() === currentMonth
}
/* This Year */
function byThisYear(date){
    const currentYear = new Date().getYear();
    return date.getYear() === currentYear
}
/* This Week */
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

    if (maxDay > days[month]) return tMonth === month + 1 && tDay <= maxDay - days[month];

    if (minDay < 0) return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
}

/* 3 Monthes */
function by3Monthes(date){
    const currentMonth = new Date().getMonth();
    const month = date.getMonth()
    return month === currentMonth || month === currentMonth - 1 || month === currentMonth + 1;
}

function byDays(date){
    return date.getDate()
}

function byMonthes(date){
    const month = date.getMonth();
    return month
}

export default function HistoryChart({dates, selected}){
    const sortedDates = dates.sort(sortDate);
    const [test, setTest] = useState(filterDates(sortedDates, byThisWeek));
    const [testFn, setTestFn] = useState(() => byDays);
    
    useEffect(() => {
        if (selected === 'Week') {
            setTest(filterDates(sortedDates, byThisWeek));
            setTestFn(() => byDays)
        }
        if (selected === 'Month') {
            setTest(filterDates(sortedDates, byThisMonth));
            setTestFn(() => byDays)
        }
        if (selected === 'Year') {
            setTest(filterDates(sortedDates, byThisYear));
            setTestFn(() => byMonthes)
        }
        if (selected === 'All') {
            setTest(sortedDates);
            setTestFn(() => byMonthes)
        }
    }, [selected])
    
    console.log(testFn);
    // fix this
    return (
        <Box>
            <GenericChart obj={test} callback={testFn} color={'blue'} type={'line'} title={'meetings'}/>
        </Box>
    )
}