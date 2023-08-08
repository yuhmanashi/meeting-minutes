import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import * as meetingActions from '../../store/meetings';
import * as studentActions from '../../store/students';

import CalendarDetails from './CalendarDetails';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

export default function Calendar({meetings, user, students}) {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlitedDays] = useState(handleDates(meetings));

  const dispatch = useAppDispatch();

  function userFilter(obj){
    const userId = user.id
    return Object.values(obj).filter((value) => value.userId === userId)
  }

  function sortDate(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
  }

  function handleDates(meetings) {
    return userFilter(meetings).map(meeting => meeting.date.slice(0, 10)).sort(sortDate);
  }

  // function fetchHighlightedDays(){
  //   dispatch(meetingActions.fetchMeetings())
  //   .then(({meetings})=> {
  //     const meetingDates = handleDates(meetings)
  //     setHighlitedDays(meetingDates)
  //   });
  // }

  // useEffect(() => {
  //   dispatch(studentActions.fetchStudents());
  //   fetchHighlightedDays();
  // }, [dispatch])

  function handleChange(newValue){
    setValue(newValue)
  }

  if (Object.keys(meetings).length < 1 || Object.keys(students).length < 1) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{display: 'flex', justifyContent:'space-evenly'}}>
        <CalendarDetails date={value} meetings={userFilter(meetings)} students={students}/>
        <DateCalendar
          value={value} 
          onChange={newValue => handleChange(newValue)}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}