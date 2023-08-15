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

export default function CreateMeetingModal() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const userId = useAppSelector(state => state.session.user.id)
  const [open, setOpen] = React.useState(false);
  
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [problems, setProblems] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailFormat)){
      handleClose();
    }
    return dispatch(meetingActions.createMeeting({ userId, email, name, category, problems, notes }))
  };

  return (
    <div>
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
            sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 250}}
          >
            {/* <SelectMenu name={'students'} options={[]} onChange={() => {}}/> */}
            <List>
              { errors ? errors.map(error => 
                <ListItem>
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
              required
            />
            <TextField 
              label='Name'
              defaultValue={name}
              onChange={e => setName(e.target.value)} 
              variant='standard'
              required
            />
            <TextField 
              label='Category'
              defaultValue={category}
              onChange={e => setCategory(e.target.value)} 
              variant='standard'
              required
            />
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
    </div>
  );
}