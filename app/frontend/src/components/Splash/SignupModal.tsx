import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as sessionActions from '../../store/session';
import * as sessionErrorActions from '../../store/session_errors';

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
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

export default function SignupModal({ setModalOpen }) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const [open, setOpen] = useState(false);
  
  
  const handleOpen = () => {
    dispatch(sessionErrorActions.removeSessionErrors());
    setModalOpen(true);
    setOpen(true);
  }

  const handleClose = () => {
    dispatch(sessionErrorActions.removeSessionErrors());
    setModalOpen(false)
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
  };

  return (
    <div>
      <Button onClick={handleOpen} size='small' sx={{p: 0}}>Sign up</Button>
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
              height: 310,
              width: 1
            }}
          >
            <List>
              { errors ? errors.map(error => 
                <ListItem key={error} sx={{color: 'red'}}>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            <TextField 
              label='First Name'
              defaultValue={firstName}
              onChange={e => setFirstName(e.target.value)} 
              variant='outlined'
              sx={{my: 1}}
              size='small'
              fullWidth 
              required
            />
            <TextField 
              label='Last Name'
              defaultValue={lastName}
              onChange={e => setLastName(e.target.value)} 
              variant='outlined'
              sx={{my: 1}}
              size='small'
              fullWidth 
              required
            />
            <TextField 
              label='Email'
              defaultValue={email}
              onChange={e => setEmail(e.target.value)} 
              variant='outlined'
              sx={{my: 1}}
              size='small'
              fullWidth 
              required
            />
            <TextField 
              label='Password'
              defaultValue={password}
              onChange={e => setPassword(e.target.value)} 
              type='password' 
              variant='outlined'
              sx={{my: 1}}
              size='small'
              fullWidth
              required
            />
            <Button type='submit'>Sign Up</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}