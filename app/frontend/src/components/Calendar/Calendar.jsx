import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import * as meetingActions from '../../store/meetings';

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

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlitedDays] = useState([]);

  const sessionUser = useAppSelector(state => state.session.user);
  const sessionMeetings = useAppSelector((state) => state.meetings);
  
  const dispatch = useAppDispatch();

  function userFilter(obj){
    const userId = sessionUser.id
    return Object.values(obj).filter((value) => value.userId === userId)
  }

  function sortDate(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
  }

  function handleDates(meetings) {
    return userFilter(meetings).map(meeting => meeting.date.slice(0, 10)).sort(sortDate);
  }

  function fetchHighlightedDays(){
    dispatch(meetingActions.fetchMeetings())
    .then(({meetings})=> {
      const meetingDates = handleDates(meetings)
      setHighlitedDays(meetingDates)
    });
  }

  useEffect(() => {
    fetchHighlightedDays()
  }, [dispatch])

  function handleChange(newValue){
    console.log(newValue)
    setValue(newValue)
  }

  if (Object.keys(sessionMeetings).length < 1) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarDetails date={value} meetings={userFilter(sessionMeetings)}/>
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
    </LocalizationProvider>
  );
}