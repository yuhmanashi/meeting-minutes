import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import * as sessionErrorActions from '../../store/session_errors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

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

export default function LoginModal() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const [email, setEmail] = useState('demo3@user.io');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ email, password }))
  }

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
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
            sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200}}
          >
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
              label='Password'
              defaultValue={password}
              type='password' 
              onChange={e => setPassword(e.target.value)} 
              variant='standard'
              required
            />
            <Button type='submit'>Log In</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}