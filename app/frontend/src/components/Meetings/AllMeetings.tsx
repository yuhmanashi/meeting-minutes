import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from './Meetings';

function AllMeetings(){
    const selectSessionUser = (state: RootState) => state.session.user;
    const sessionUser = useSelector(selectSessionUser);

    return (
        <Box sx={{ border: 1 }}>
            <Typography>
                All meetings
            </Typography>
            <Container sx={{}}>
                <Meetings meetings={sessionUser.meetings}/>
            </Container>
        </Box>
    )
}

export default AllMeetings;