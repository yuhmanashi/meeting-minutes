import * as React from 'react';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const days = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

export default function WeeklyAccordions({ meetings, week, selectedDate }) {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange =
    (day: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? day : false);
    };

  console.log(meetings, selectedDate, week);

  function createAccordion(day){
    const weekday = day.day();

    return (
      <Accordion expanded={expanded === weekday} onChange={handleChange(weekday)}>
         <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${weekday}-content`}
          id={`${weekday}-header`}
        >
          {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
          <Typography>{days[weekday]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{day.toString()}</Typography>
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
