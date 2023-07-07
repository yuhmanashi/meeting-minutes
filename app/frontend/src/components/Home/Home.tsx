import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import type { RootState, AppDispatch } from '../../store';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';

function Home(){
    const selectSessionUser = (state: RootState) => state.session.user;
    const sessionUser = useSelector(selectSessionUser);

    return (
        <Box sx={{ display: 'flex', border: 1 }}>
            <Container sx={{display: 'flex'}}>
                <Typography>
                    Home
                </Typography>
                <Box>
                    <Meetings meetings={sessionUser.meetings}/>
                </Box>
            </Container>
        </Box>
    )
}

export default Home;