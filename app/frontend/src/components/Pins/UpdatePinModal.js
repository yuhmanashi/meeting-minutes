import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as sessionErrorActions from '../../store/session_errors';
import * as pinsActions from '../../store/pins';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';

import GenericAutocomplete from "../CommonComponents/AutoComplete";

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

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 300px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

export default function UpdatePinModal({ pin }) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const [title, setTitle] = useState(pin.title);
  const [body, setBody] = useState(pin.body);
  const [authorId, setAuthorId] = useState(pin.authorId);
  const id = pin.id

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.length !== 0 && body.length !== 0) handleClose();
    return dispatch(pinsActions.updatePin({ id, authorId, title, body }))
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        Update
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
              minHeight: 250
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

            <TextField
                label='Title'
                defaultValue={title}
                onChange={e => setTitle(e.target.value)} 
                variant='outlined'
                size='small'
                sx={{my: 1}}
                fullWidth
                required
            />
            <StyledTextarea
                defaultValue={body}
                placeholder="Type here"
                onChange={e => setBody(e.target.value)}
                minRows={4}
                maxRows={4}
                required
            />

            <Button type='submit'>Update Pin</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}