import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';

import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import CalendarDetails from './CalendarDetails';
import WeekOverview from './WeekOverview';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const ServerDay = (props: any) => {
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

export default function Calendar({meetings, students, setSelected}) {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlitedDays] = useState(handleDates(meetings));

  useEffect(() => {
    setHighlitedDays(handleDates(meetings))
  }, [meetings])

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between',
          width: .9,
          height: 360
        }}
      >
        <WeekOverview meetings={meetings} />
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
            } as any,
          }}
          sx={{
            minWidth: 320,
            width: 320,
            m: 0,
            border: 2,
            borderColor: '#1976d2'
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}