import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Carousel from '../CommonComponents/Carousel';
import Login from './Login';
import * as sessionActions from '../../store/session';
import { useAppDispatch } from '../../utils/hooks';

function Splash(){
    const dispatch = useAppDispatch();
    const listItems = [
        'Store and organize meetings you have had or will have...',
        'View and sort meetings with tables...',
        'Preview your monthes with the calendar feature...',
        'Data analytics with graphs and charts...',
    ]

    function demoLogin(e){
        e.preventDefault();
        return dispatch(sessionActions.login({email:'demo@user.io', password:'password'}))
    }

    return (
        <Box sx={{height: .8}}>
            <Container sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 1,
                }}>
                {/* Info */}
                <Box sx={{
                        display: 'flex', 
                        justifyContent: 'space-evenly', 
                        alignItems: 'center',
                        width: 1,
                    }}>
                    <Box sx={{
                            display: {
                                xs: 'none', 
                                sm: 'block'
                            },
                            m: 2,
                        }}>
                        <Typography variant='h5' sx={{ typography: {/*xs: 'h6', sm: 'h5', md: 'h4'*/}, m: 1 }}>
                            Keep track of your meetings
                        </Typography>
                        
                        <List>
                            {listItems.map(item => {
                                return (
                                    <ListItem key={item}>
                                        <ListItemText>
                                            {item}
                                        </ListItemText>
                                    </ListItem> 
                                )
                            })}
                        </List>
                    </Box>
                    
                    {/* Login */}
                    <Box>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                px: 4,
                                border: 1, 
                                borderColor: 'lightgray'
                            }}>
                            <Typography 
                                variant='h4'
                                sx={{
                                    m: 2,
                                    pt: 4,
                                    fontWeight: 'bold'
                                }}
                            >
                                MeetingMinutes
                            </Typography>
                            <Login/>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    m: 1,
                                    width: 1
                                }}
                            >
                                <Divider sx={{ mt: 1 }} flexItem >OR</Divider>
                                <Button 
                                    onClick={demoLogin}
                                    size='small'
                                >
                                    Try Demo
                                </Button>
                            </Box>
                        </Box>
                        <Box 
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 2,
                                mt: 1,
                                border: 1,
                                borderColor: 'lightgrey'
                            }}
                        >
                            <Typography variant='subtitle1'>
                                Don't have an account?
                            </Typography>
                            <SignupModal/>
                        </Box>
                    </Box>
                </Box>
                {/* <Carousel /> */}
            </Container>
        </Box>
    )
}

export default Splash;