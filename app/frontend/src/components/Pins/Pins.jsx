import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Pin from './Pin';

export default function Pins({ pins }){

    return (
        <Container sx={{minHeight: {xs: 320}, maxHeight: {xs: 260, md: 380 }, display: {sm: 'flex', md: 'block' }, flexWrap: 'wrap', overflowX: 'hidden', overflowY: 'auto', }}>
            {pins.map((pin) => {
                return <Pin key={pin.id} pin={pin} />
            })}
        </Container>
    )
};