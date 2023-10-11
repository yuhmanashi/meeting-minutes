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

export default function Login({ open }) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionErrorActions.removeSessionErrors());
    return dispatch(sessionActions.login({ email, password }))
  }

  return (
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
        height: 200,
        width: 1
      }}
    >
      { open ? null : 
        <List sx={{p: 0}}>
          { errors ? errors.map(error => 
            <ListItem key={error} sx={{color: 'red'}}>
              <ListItemText primary={error} />
            </ListItem>)
            : null
          }
        </List>
      }
      <TextField 
        label='Email'
        defaultValue={email}
        onChange={e => setEmail(e.target.value)} 
        variant='outlined'
        size='small'
        fullWidth
        required
      />
      <TextField 
        label='Password'
        defaultValue={password}
        type='password' 
        onChange={e => setPassword(e.target.value)} 
        variant='outlined'
        size='small'
        sx={{m: 2}}
        fullWidth
        required
      />
      <Button 
        type='submit' 
        variant='contained'
        size='small'
        fullWidth
      >
        Log In
      </Button>
    </Box>
  );
}