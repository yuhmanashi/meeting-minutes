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
  const [email, setEmail] = useState("mikki_larkin@example.com");
  const [category, setCategory] = useState("");
  const [problems, setProblems] = useState("");
  const [notes, setNotes] = useState("");
  const [day, setDay] = useState(dayjs());
  const [time, setTime] = useState(dayjs());


  function resetState(){
    setEmail("mikki_larkin@example.com");
    setCategory('');
    setDay(dayjs());
    setTime(dayjs());
    setCategory('');
    setProblems('');
    setNotes('');
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    resetState();
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const testDate = day.toISOString().slice(0, 10);
  const testTime = time.toISOString().slice(10);

  // console.log(testDate + testTime);

  function findStudentId(email){
    const student: any = Object.values(students).filter((student: Student) => student.email === email);
    if (student.length < 1) return null;
    return student[0].id;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const studentId = findStudentId(email)
    // if (date.length < 1) setDate(new Date().toISOString());
    const date = day.toISOString().slice(0, 10) + time.toISOString().slice(10);
    
    if (email.match(emailFormat) && studentId){
      handleClose();
    }
    
    return dispatch(meetingActions.createMeeting({ userId, studentId, category, problems, notes, date }))
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button onClick={handleOpen}>
        <AddIcon/>
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
            {/* <SelectMenu name={'students'} options={[]} onChange={() => {}}/> */}
            <List sx={{p: 0}}>
              { errors ? errors.map(error => 
                <ListItem key={error} sx={{color: 'red'}}>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            {/* <Box 
              sx={{
                // display: 'flex'
              }}
            > */}
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
            {/* </Box> */}
            <SelectMenu 
              name={'Category'}
              options={categories} 
              defaultOption={category} 
              onChange={setCategory}
            />
            <TextField 
              label="Student's Email"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)} 
              variant='outlined'
              size='small'
              sx={{my: 1}}
              fullWidth
              required
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
            {/* <TextField 
              label="Date"
              defaultValue={email}
              onChange={e => setDate(e.target.value)} 
              variant='outlined'
              size='small'
              sx={{my: 1}}
              fullWidth
              required
            />
            <TextField 
              label="Date"
              defaultValue={email}
              onChange={e => setTime(e.target.value)}
              variant='outlined'
              size='small'
              sx={{my: 1}}
              fullWidth
              required
            /> */}
            {/* <TextField 
              label='Problems'
              defaultValue={problems}
              onChange={e => setProblems(e.target.value)} 
              variant='standard'
              required
            />
            <TextField 
              label='Notes'
              defaultValue={notes}
              onChange={e => setNotes(e.target.value)} 
              variant='standard'
              required
            /> */}
            <Button type='submit'>Create Meeting</Button>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}