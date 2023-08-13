import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Login from './Login';
import * as sessionActions from '../../store/session';
import { useAppDispatch } from '../../utils/hooks';

function Splash(){
    const dispatch = useAppDispatch();

    function demoLogin(e){
        e.preventDefault();
        return dispatch(sessionActions.login({email:'demo@user.io', password:'password'}))
    }

    return (
        // <Box sx={{ 
        //         height: 4/5,
        //         position: 'relative', 
        //     }}>
        //     <Container sx={{ 
        //             display: 'flex', 
        //             flexDirection: 'column', 
        //             alignItems: 'center', 
        //             position: 'relative',
        //             mt: 2,
        //         }}>
        //         <Box sx={{display: 'flex'}}>
        //             <Box sx={{ m: 2 }}>
        //                 <Typography sx={{ typography: {xs: 'h4', sm: 'h3', md: 'h1'} }}>
        //                     MeetingMinutes
        //                 </Typography>
        //                 <Typography sx={{ typography: {xs: 'h6', sm: 'h5', md: 'h4'}, m: 1 }}>
        //                     Keep track of your meetings
        //                 </Typography>
        //                 <Typography variant="body1" sx={{ m: 1 }}>
        //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //                 </Typography>
        //             </Box>
        //             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        //                 <Typography sx={{ typography: {xs: 'body1', sm: 'h6', md: 'h5'} }}>
        //                     Log in or Sign Up to continue
        //                 </Typography>
        //                 <Box sx={{ display: 'flex' }}>
        //                     <LoginModal/>
        //                     <SignupModal/>
        //                 </Box> 
        //                 <Button onClick={demoLogin}>
        //                     Demo
        //                 </Button>
        //             </Box>
        //         </Box>
                
        //         <Box sx={{m: 4, p: 2, border: 1, height: 300, width: 600}}>
        //             Images/Examples
        //         </Box>
        //     </Container>
        // </Box>
        // <Box>
        //     <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
        //         <Box sx={{p: 4}}>
        //             <Typography sx={{ typography: {xs: 'h4', sm: 'h3', md: 'h2'} }}>
        //                 MeetingMinutes
        //             </Typography>
        //             <Typography variant='h6' sx={{ m: 1 }}>
        //                 Keep track of your meetings
        //             </Typography>
        //         </Box>
        //         <Box sx={{p: 4}}>
        //             <Login></Login>
        //         </Box>
        //     </Box>
        // </Box>
        <Box sx={{ 
            height: 4/5,
            position: 'relative', 
        }}>
            <Container sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    position: 'relative',
                    mt: 2,
                }}>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{ m: 2, width: .7 }}>
                        <Typography sx={{ typography: {xs: 'h4', sm: 'h3', md: 'h2'} }}>
                            MeetingMinutes
                        </Typography>
                        <Typography variant='h5' sx={{ typography: {/*xs: 'h6', sm: 'h5', md: 'h4'*/}, m: 1 }}>
                            Keep track of your meetings
                        </Typography>
                        <Typography variant="body1" sx={{ m: 1 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                        <Typography sx={{ typography: {xs: 'body1', sm: 'h6', md: 'h5'} }}>
                            Log in or Sign Up to continue
                        </Typography>
                        <Login></Login>
                        {/* <Box sx={{ display: 'flex' }}>
                            <LoginModal/>
                            <SignupModal/>
                        </Box> 
                        <Button onClick={demoLogin}>
                            Demo
                        </Button> */}
                    </Box>
                </Box>
                
                <Box sx={{m: 4, p: 2, border: 1, height: 300, width: 600}}>
                    Images/Examples
                </Box>
            </Container>
        </Box>
    )
}

export default Splash;