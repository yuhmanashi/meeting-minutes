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

const dummyDates = [
    "2023-08-01",
    "2023-08-09",
    "2023-08-21",
    "2024-08-12"
  ]

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlitedDays] = useState(dummyDates);

  const sessionUser = useAppSelector(state => state.session.user);
  const sessionMeetings = useAppSelector((state) => state.meetings);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(meetingActions.fetchMeetings());
  }, [dispatch])

  if (Object.keys(sessionMeetings).length < 1) return null;

  function userFilter(obj){
    const userId = sessionUser.id
    return Object.values(obj).filter((value) => value.userId === userId)
  }

  const userMeetings = userFilter(sessionMeetings);
  const dates = userMeetings.map(meeting => meeting.date.slice(0, 10));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value} 
        onChange={(newValue) => setValue(newValue)}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            dummyDates,
          },
        }}
      />
    </LocalizationProvider>
  );
}