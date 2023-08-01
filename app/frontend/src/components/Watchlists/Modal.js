import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as sessionErrorActions from '../../store/session_errors';
import * as watchlistActions from '../../store/watchlists';

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

export default function CreateWatchlistModal({ watchlists, students }) {
  const studentsArr = Object.values(students);
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const userId = useAppSelector(state => state.session.user.id)
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTag('');
    setStudentEmail('');
    dispatch(sessionErrorActions.removeSessionErrors());
  };
  
  const [studentEmail, setStudentEmail] = useState("hear0@student.io");
  const [tag, setTag] = useState("");

  const set = new Set(
    Object.values(watchlists.map(watchlist => {
      return `${watchlist.studentId}${watchlist.tag}`
    }))
  )

  function getStudentId(){
    const filtered = Object.values(students).filter(student => student.email === studentEmail);
    const id = filtered[0].id
    return filtered.length === 1 ? id : 0;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (tag.length === 0) return;

    const studentId = getStudentId();
    const pair = `${studentId}${tag}`

    if (studentId !== 0 && !set.has(pair)){
      set.add(pair);
      handleClose();
    }
    // const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (email.match(emailFormat)){
    //   handleClose();
    // }
    return dispatch(watchlistActions.createWatchlist({ userId, studentId, tag }))
  };

  const tags = Array.from(new Set(watchlists.map(watchlist => watchlist.tag)))
  const studentNames = Object.values(students).map(student => student.fullName)

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
                <ListItem>
                  <ListItemText primary={error} />
                </ListItem>)
                : null 
              }
            </List>
            <Box>
              <GenericAutocomplete options={tags} label={'watchlist'} onChange={setTag}/>
            </Box>
            <Box>
              <Input 
                placeholder='Student Email'
                defaultValue={studentEmail}
                onChange={e => setStudentEmail(e.target.value)} 
                inputProps={{'aria-label': 'description'}} 
                required
              />
            </Box>
            <Button type='submit'>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}