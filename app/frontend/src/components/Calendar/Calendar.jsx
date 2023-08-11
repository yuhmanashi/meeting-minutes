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
  
  const formattedDay = day.format("M/D/YYYY")
  
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(formattedDay);

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

export default function Calendar({meetings, user, students, setSelected}) {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlitedDays] = useState(handleDates(meetings));

  function sortDate(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
  }

  function handleDates(meetings) {
    return meetings.map(meeting => new Date(meeting.date).toLocaleDateString().slice(0, 10)).sort(sortDate);
  }

  function handleChange(newValue){
    setValue(newValue)
    setSelected(new Date(newValue.valueOf() + newValue.utcOffset()*60*1000))
  }

  if (Object.keys(meetings).length < 1 || Object.keys(students).length < 1) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{display: 'flex', justifyContent: 'space-evenly', width: {sm: .9, md: '55%'}}}>
        <CalendarDetails date={value} meetings={meetings} students={students}/>
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
          sx={{width: 320}}
        />
      </Box>
    </LocalizationProvider>
  );
}