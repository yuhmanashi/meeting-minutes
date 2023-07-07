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
    
    // return (
    //     <div id='home'>
    //         <h1>Home</h1>
    //         <Meetings meetings={sessionUser.meetings}/>
    //     </div>
    // )
    return (
        <Box>
            <Container>
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