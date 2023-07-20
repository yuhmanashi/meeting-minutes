import React, { useState } from "react";

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import SelectMenu from "../CommonComponents/SelectMenu";

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

export default function CreateWatchlistModal() {
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
      {/* */}
      <Button onClick={handleOpen}>{label}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Component in Modal */}
        </Box>
      </Modal>
    </div>
  );
}