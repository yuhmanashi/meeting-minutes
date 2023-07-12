import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import * as sessionActions from '../../store/session';
import { useAppDispatch } from '../../utils/hooks';

function Splash(){
    const dispatch = useAppDispatch();

    function demoLogin(e){
        e.preventDefault();
        return dispatch(sessionActions.login({email:'demo@user.io', password:'password'}))
    }

    return (
        <Box sx={{ 
                border: 1, 
                height: 4/5,
                position: 'relative', 
                // "&::before": { 
                //     content: '""',
                //     backgroundImage: `url(${imageURL})`, 
                //     backgroundPosition: "center",
                //     backgroundSize: "cover",
                //     backgroundRepeat: "no-repeat",
                //     opacity: 0.75,
                //     position: 'absolute',
                //     top: 0,
                //     bottom: 0,
                //     left: 0,
                //     right: 0
                // }
            }}>
            <Container sx={{ 
                    display: 'flex', 
                    border: 1, 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    position: 'relative',
                    mt: 10,
                }}>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ typography: {xs: 'h4', sm: 'h2', md: 'h1'} }}>
                        MeetingMinutes
                    </Typography>
                    <Typography sx={{ typography: 'body1', m: 1 }}>
                        Keep track of your meetings
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ typography: 'body1' }}>
                        Log in or Sign Up to continue
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <LoginModal/>
                        <SignupModal/>
                    </Box> 
                </Box>
                <Button onClick={demoLogin}>
                    Demo
                </Button>
            </Container>
        </Box>
    )
}

export default Splash;