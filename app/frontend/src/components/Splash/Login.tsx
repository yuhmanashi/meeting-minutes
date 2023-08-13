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

export default function Login() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  
  const [email, setEmail] = useState('demo3@user.io');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ email, password }))
  }

  return (


          <Box
            component='form'
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200, border: 1, p: 4}}
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

  );
}