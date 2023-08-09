import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as sessionErrorActions from '../../store/session_errors';
import * as pinsActions from '../../store/pins';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/material/Divider";

import GenericAutocomplete from "../CommonComponents/AutoComplete";

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

export default function CreatePinModal({ authorId }) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setBody('');
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.length === 0 || body.length === 0) return;
    
    handleClose();
    return dispatch(pinsActions.createPin({ authorId, title, body }))
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
      >
        <Box sx={style}>
          <Box
            component='form'
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <List>
              { errors ? errors.map(error => 
                <ListItem key={error}>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            <Box>
              <Input 
                placeholder='Title'
                defaultValue={title}
                onChange={e => setTitle(e.target.value)} 
                inputProps={{'aria-label': 'description'}} 
                required
              />
              <Input 
                placeholder='Body'
                defaultValue={body}
                onChange={e => setBody(e.target.value)} 
                inputProps={{'aria-label': 'description'}} 
                required
              />
            </Box>
            <Button type='submit'>Add Pin</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}