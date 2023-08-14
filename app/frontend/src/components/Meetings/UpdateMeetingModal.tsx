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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type IMeeting = {
  meeting: MeetingWithStudent;
}

export default function UpdateMeetingModal({ meeting }: IMeeting) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const userId = useAppSelector(state => state.session.user.id)
  const [open, setOpen] = React.useState(false);
  const id = meeting.id;
  const studentId = meeting.studentId;
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const [email, setEmail] = useState(meeting.studentEmail);
  const [name, setName] = useState(meeting.studentName);
  const [category, setCategory] = useState(meeting.category);
  const [problems, setProblems] = useState(meeting.problems);
  const [notes, setNotes] = useState(meeting.notes);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const emailFormat = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    // if (emailFormat.test(email)){
    //   handleClose();
    // }
    return dispatch(meetingActions.updateMeeting({ id, userId, studentId, category, problems, notes }))
  };
  console.log(errors)
  return (
    <div>
      <Button size="small" onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component='form'
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 300}}
          >
            <List>
              { errors ? errors.map(error => 
                <ListItem key={error}>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            <TextField 
              label='Email'
              defaultValue={email}
              onChange={e => setEmail(e.target.value)} 
              variant='standard' 
              disabled
            />
            <TextField 
              label='Name'
              defaultValue={name}
              onChange={e => setName(e.target.value)} 
              variant='standard' 
              disabled
            />
            <TextField 
              label='Category'
              defaultValue={category}
              onChange={e => setCategory(e.target.value)} 
              variant='standard' 
              required
            />
            <Button type='submit'>Update Meeting</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}