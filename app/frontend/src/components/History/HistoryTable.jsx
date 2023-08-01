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
import LineChart from '../CommonComponents/Chart/Charts/LineChart';
import GenericAutocomplete from '../CommonComponents/AutoComplete';
import GenericTable from '../CommonComponents/Table/Table';
import SelectMenu from '../CommonComponents/SelectMenu';

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

/* This Week */
function byThisWeek(meeting){
    const today = new Date();
    const day = today.getDay();
    const monthDay = today.getDate();
    const month = today.getMonth();

    const max = 6 - day;
    let maxDay = monthDay + max;
    let minDay = monthDay - day;

    const tDay = new Date(meeting.date).getDate();
    const tMonth = new Date(meeting.date).getMonth();

    if (tMonth === month && tDay >= minDay && tDay <= maxDay) return true;

    if (maxDay > days[month]) return tMonth === month + 1 && tDay <= maxDay - days[month];

    if (minDay < 0) return tMonth === month - 1 && tDay >= days[month - 1] + minDay;
}

/* This Month */
function byThisMonth(meeting){
    const currentMonth = new Date().getMonth();
    return new Date(meeting.date).getMonth() === currentMonth
}

/* This Year */
function byThisYear(meeting){
    const currentYear = new Date().getYear();
    return new Date(meeting.date).getYear() === currentYear
}

function handleMeetings(meetings, selected){
    switch(selected) {
        case 'Week':
          return meetings.filter(byThisWeek)
        case 'Month':
          return meetings.filter(byThisMonth)
        case 'Year':
          return meetings.filter(byThisYear)
        case 'All':
          return meetings
        default: 
        return meetings.filter(byThisWeek)
      }
}

export default function HistoryTable({meetings, selected}) {
    const [page, setPage] = useState(0);
    const [filtered, setFiltered] = useState(handleMeetings(meetings, selected))

    useEffect(() => {
        let newSelected = handleMeetings(meetings, selected)
        setFiltered(newSelected)
    }, [selected])

    const values = [
        {
          label: 'Name',
          id: 'studentName'
        },
        {
          label: 'Email',
          id: 'studentEmail'
        },
        {
          label: 'Category',
          id: 'category'
        },
        {
          label: 'Date',
          id: 'createdAt'
        }
    ];

    const responsiveValues = [
        {
          label: 'Name',
          id: 'studentName'
        },
        {
          label: 'Category',
          id: 'category'
        },
    ];
    
    return (
        <GenericTable list={filtered} values={values} rValues={responsiveValues} details={[]} buttons={() => {}} page={page} setPage={setPage}/> 
    )
}