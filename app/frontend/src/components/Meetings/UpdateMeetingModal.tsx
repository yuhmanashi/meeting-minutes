import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as sessionErrorActions from '../../store/session_errors';
import * as meetingActions from '../../store/meetings';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';

import { LocalizationProvider, DateField, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";

import SelectMenu from "../CommonComponents/SelectMenu";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

type IMeeting = {
  meeting: MeetingWithStudent;
  categories: string[];
}

export default function UpdateMeetingModal({ meeting, categories }: IMeeting) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const userId = useAppSelector(state => state.session.user.id)
  const [open, setOpen] = React.useState(false);
  const [dateTime, setDateTime] = useState(dayjs(meeting.dateString));
  const [category, setCategory] = useState(meeting.category);
  const [email, setEmail] = useState(meeting.studentEmail);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };

  // const [problems, setProblems] = useState(meeting.problems);
  // const [notes, setNotes] = useState(meeting.notes);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const emailFormat = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    // if (emailFormat.test(email)){
    //   handleClose();
    // }
    const id = meeting.id;
    const studentId = meeting.studentId;
    const date = dateTime.toISOString();
    return dispatch(meetingActions.updateMeeting({ id, userId, studentId, category, date }))
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button size='small' onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Box
            component='form'
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end',
              alignItems: 'center', 
            }}
          >
            <List sx={{p: 0}}>
              { errors ? errors.map(error => 
                <ListItem key={error} sx={{color: 'red'}}>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            <DateField
              label='Date'
              maxDate={dayjs().add(2, 'year')}
              minDate={dayjs()}
              value={dateTime}
              onChange={(newDay) => setDateTime(newDay)}
              fullWidth
              sx={{my: 1}}
            />
            <TimeField
              label="Time"
              value={dateTime}
              onChange={(newTime) => setDateTime(newTime)}
              fullWidth
              sx={{my: 1}}
            />
            <SelectMenu 
              name={'Category'}
              options={categories} 
              defaultOption={category} 
              onChange={setCategory}
            />
            <TextField 
              label='Email'
              defaultValue={email}
              onChange={e => setEmail(e.target.value)} 
              variant='outlined'
              size='small'
              sx={{my: 1}}
              fullWidth 
              disabled
            />
            {/* <TextField 
              label='Category'
              defaultValue={category}
              onChange={e => setCategory(e.target.value)} 
              variant='outlined'
              size='small'
              sx={{my: 1}}
              fullWidth
              required
            /> */}
            <Button type='submit'>Update Meeting</Button>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}