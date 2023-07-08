import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionActions.removeSessionErrors());
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
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
                <ul>
                    { errors ? errors.map(error => <li key={error}>{error}</li>) : null }
                </ul>
        
                <label>
                    Email
                    <input 
                        type='text' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                
                <button type="submit">Log In</button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}

// function LoginFormPage() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector(state => state.session.user);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState([]);
    
//     if (sessionUser) return <Redirect to="/" />;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors([]);
//         return dispatch(sessionActions.login({ email, password }))
//             .catch(async (res) => {
//                 let data;
//                 try {
//                 // .clone() essentially allows you to read the response body twice
//                 data = await res.clone().json();
//                 } catch {
//                 data = await res.text(); // Will hit this case if the server is down
//                 }
//                 if (data?.errors) setErrors(data.errors);
//                 else if (data) setErrors([data]);
//                 else setErrors([res.statusText]);
//             });
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <ul>
//                 {errors.map(error => <li key={error}>{error}</li>)}
//             </ul>
    
//             <label>
//                 Email
//                 <input 
//                     type='text' 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Password
//                 <input 
//                     type='password' 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </label>
            
//             <button type="submit">Log In</button>
//         </form>
//     );
// }

// export default LoginFormPage;