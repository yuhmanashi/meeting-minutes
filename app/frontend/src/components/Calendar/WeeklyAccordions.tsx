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

    return (
      <Accordion expanded={expanded === weekday} onChange={handleChange(weekday)}>
         <AccordionSummary aria-controls={`${weekday}-content`} id={`${weekday}-header`}>
          {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
          {/* <Typography>{days[weekday]}</Typography> */}
          <Day day={day} handleChange={handleChange} meetings={dateMeetings}/>
        </AccordionSummary>
        <AccordionDetails>
          { dateMeetings.length > 0 ? 
                    <List sx={{ py: 0 }}>
                        { dateMeetings.map(meeting => (
                            <React.Fragment key={`${meeting.id}`}>
                                <ListItem sx={{ py: 0 }}>
                                    <ListItemText
                                        primary={meeting.studentName}
                                        secondary={`${timeString(meeting.date)} | ${meeting.category ? meeting.category : '-'}`}

                                    />
                                </ListItem>
                                {/* <Divider variant='fullWidth' sx={{ backgroundColor: '#1976d2' }} /> */}
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
          {/* <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography> */}
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <Box>
      {week.map(day => { return createAccordion(day) })}
    </Box>
    // <React.Fragment>
    //   <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1bh-content"
    //       id="panel1bh-header"
    //     >
    //       <Typography sx={{ width: '33%', flexShrink: 0 }}>
    //         General settings
    //       </Typography>
    //       <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
    //         Aliquam eget maximus est, id dignissim quam.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel2bh-content"
    //       id="panel2bh-header"
    //     >
    //       <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
    //       <Typography sx={{ color: 'text.secondary' }}>
    //         You are currently not an owner
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
    //         varius pulvinar diam eros in elit. Pellentesque convallis laoreet
    //         laoreet.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel3bh-content"
    //       id="panel3bh-header"
    //     >
    //       <Typography sx={{ width: '33%', flexShrink: 0 }}>
    //         Advanced settings
    //       </Typography>
    //       <Typography sx={{ color: 'text.secondary' }}>
    //         Filtering has been entirely disabled for whole web server
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
    //         amet egestas eros, vitae egestas augue. Duis vel est augue.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel4bh-content"
    //       id="panel4bh-header"
    //     >
    //       <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
    //         amet egestas eros, vitae egestas augue. Duis vel est augue.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    // </React.Fragment>
  );
}
