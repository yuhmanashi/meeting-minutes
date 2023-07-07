import React, { useState } from 'react';
import './Splash.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Splash(){
    const imageURL = "https://cdn.pixabay.com/photo/2023/05/20/20/39/european-roller-8007340__340.jpg";
    return (
        <Box sx={{ border: 1, backgroundImage: `url(${imageURL})`, height: 4/5 }}>
            <Container sx={{ display: 'flex', border: 1, flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ typography: 'h3' }}>
                        Welcome to Splash!
                    </Typography>
                    <Typography sx={{ typography: 'body1' }}>
                        Description of App
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
            </Container>
        </Box>
    )
}

export default Splash;