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
import AddIcon from '@mui/icons-material/Add';
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

export default function CreateMeetingModal({categories}) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const userId = useAppSelector(state => state.session.user.id);
  const students = useAppSelector(state => state.students);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [day, setDay] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  
  function resetState(){
    setEmail("");
    setCategory('');
    setDay(dayjs());
    setTime(dayjs());
    setCategory('');
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    resetState();
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };

  function findStudentId(email){
    const student: any = Object.values(students).filter((student: Student) => student.email === email);
    if (student.length < 1) return null;
    return student[0].id;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const studentId = findStudentId(email)
    
    const date = day.toISOString().slice(0, 10) + time.toISOString().slice(10);
    
    if (email.match(emailFormat) && studentId){
      handleClose();
    }
    
    return dispatch(meetingActions.createMeeting({ userId, studentId, category, date }))
  };

  function getRandomValidEmail(){
    const numStudents = Object.values(students).length;
    const randomNumber = 1 + Math.floor(Math.random() * (numStudents - 1));
    
    return students[randomNumber].email
  } 

  function handleRandom(){
    setEmail(getRandomValidEmail())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button onClick={handleOpen}>
        <Typography color='white' variant='button' sx={{backgroundColor: 'primary.main', p: 1, borderRadius: 1}}>
          New meeting
        </Typography>
      </Button>
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
              value={day}
              onChange={(newDay) => setDay(newDay)}
              fullWidth
              sx={{my: 1}}
            />
            <TimeField
              label="Time"
              value={time}
              onChange={(newTime) => setTime(newTime)}
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
              label="Student's Email"
              value={email}
              onChange={e => setEmail(e.target.value)} 
              variant='outlined'
              size='small'
              sx={{my: 1}}
              fullWidth
              required
            />
            <Button onClick={handleRandom}>
              don't have email?
            </Button>
            <Button type='submit'>Create Meeting</Button>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}