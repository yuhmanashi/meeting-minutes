import React, { useState } from 'react';
import './Splash.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Splash(){
    // return (
    //     <div id='splash'>
    //         <h1>Welcome to MeetingMinutes</h1>
            
    //         <div>
    //             <LoginModal />
    //             <SignupModal />
    //         </div>
    //     </div>
    // )
    return (
        <Box>
            <Container>
                <Typography>
                    Welcome to Splash!
                </Typography>
                <Box>
                    <LoginModal/>
                    <SignupModal/>
                </Box>
            </Container>
        </Box>
    )
}

export default Splash;