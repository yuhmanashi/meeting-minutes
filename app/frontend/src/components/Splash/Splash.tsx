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
        <Box sx={{ 
            height: 4/5,
            position: 'relative', 
        }}>
            <Container sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    position: 'relative',
                    mt: 4,
                }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: .9}}>
                    <Box sx={{ m: 2, width: .5 }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', m: 1 }}>
                            MeetingMinutes
                        </Typography>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center', p: 2, width: .4, maxWidth: 300, maxHeight: 330, border: 1 }}>
                        <Typography sx={{ typography: {/*xs: 'body1', sm: 'h6', md: 'h5'*/} }}>
                            Log in to continue
                        </Typography>
                        <Login/>
                        <Box display={'flex'}>
                            <SignupModal/>
                            <Button onClick={demoLogin}>
                                Demo
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Splash;