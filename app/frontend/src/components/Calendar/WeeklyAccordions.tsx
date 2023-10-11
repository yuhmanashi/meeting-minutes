import * as React from 'react';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Day from './Day'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const days = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

export default function WeeklyAccordions({ meetings, week }) {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (day: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? day : false);
    };
  
  function convertDate(date) {
    const newDate = new Date(date.toISOString());
    return newDate;
  };
  
  function getDateMeetings(day) {
    const adjustedDate = convertDate(day);
    return meetings.filter(meeting => new Date(meeting.date).toLocaleDateString() === adjustedDate.toLocaleDateString());
  }

  function timeString(date){
    const time = new Date(date).toLocaleTimeString();
    return time.slice(0, 4) + time.slice(7)
  }

  function createAccordion(day){
    const weekday = day.day();
    const dateMeetings = getDateMeetings(day);
    const key = new Date().toISOString();

    return (
      <Accordion sx={{width: 210}} expanded={expanded === weekday} onChange={handleChange(weekday)}>
        <AccordionSummary>
          <Day day={day} handleChange={handleChange} meetings={dateMeetings}/>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          { dateMeetings.length > 0 ? 
            <List sx={{  }}>
                { dateMeetings.map(meeting => (
                    <React.Fragment key={`${meeting.date} ${meeting.createdAt}`}>
                        <ListItem sx={{  }}>
                            <ListItemText
                              primary={meeting.studentName}
                              secondary={`${timeString(meeting.date)} | ${meeting.category ? meeting.category : '-'}`}
                            />
                        </ListItem>
                        <Divider variant='fullWidth' />
                    </React.Fragment>
                ))}
            </List>
                : 
            <React.Fragment>
                {/* <Divider variant='fullWidth'/> */}
                <Typography textAlign='center' sx={{ my: 2 }}>
                    {'No meetings on this day'}
                </Typography>
            </React.Fragment>
          }
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <Box>
      {week.map(day => 
        <React.Fragment key={day.day()}>
          {createAccordion(day)}
        </React.Fragment>  
      )}
    </Box>
  );
}
