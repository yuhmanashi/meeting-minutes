import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import type { RootState, AppDispatch } from '../../store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings';
import Button from '@mui/material/Button';

function Home(){
    const sessionUser = useAppSelector(state => state.session.user);

    return (
        <Box sx={{ border: 1 }}>
            <Container sx={{}}>
                <Container sx={{mt: 4}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography>
                            Meetings
                        </Typography>
                        <Button>
                            Add a new Meeting
                        </Button>
                    </Box>
                    <Meetings meetings={sessionUser.meetings}/>
                </Container>
            </Container>
        </Box>
    )
}

export default Home;