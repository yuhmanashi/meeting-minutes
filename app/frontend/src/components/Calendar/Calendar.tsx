import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import dayjs from "dayjs";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type {} from '@mui/x-date-pickers/themeAugmentation';

import CalendarDetails from './CalendarDetails';
import WeekOverview from './WeekOverview';

// const HighlightedDay = styled(PickersDay)(({ theme }) => ({
//   "&.Mui-selected": {
//     backgroundColor: '#eedde5',
//     color: 'black'
//   },
//   "&.Mui-selected:hover": {
//     backgroundColor: '#cb99b1',
//     color: '#fff'
//   }
// }));
const HighlightedDay = styled(PickersDay)(({theme}) => ({
  
}))

const test = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          ":focus": {

          },
          "&.Mui-selected": {
            backgroundColor: '#eedde5'
          },
          "&.Mui-selected:hover": {}
        },
        today: {
          ":focus": {
            
          },
          "&.Mui-selected": {
            backgroundColor: '#eedde5'
          }
        }
      }
    },
    MuiDateCalendar: {

    }
  }
})

const ServerDay = (props: any) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
  const formattedDay = day.format("M/D/YYYY")
  
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(formattedDay);

  return (
    <HighlightedDay
      {...other}
      theme={test}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

export default function Calendar({meetings, setSelected}) {
  const [value, setValue] = useState(dayjs().add(2, 'day'));
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
    // setSelected(new Date(newValue.valueOf() + newValue.utcOffset()*60*1000))
    setSelected(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
          
        }}
      >
        <Typography variant='h5' sx={{ color: 'white', p: 2, backgroundColor: '#ef5350' }}>
          Calendar
        </Typography>
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
            border: 2, borderColor: '#ef5350', height: 310
          }}
        />


      </Box>
    </LocalizationProvider>
  );
}