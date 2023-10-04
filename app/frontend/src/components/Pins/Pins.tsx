import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import Pin from './Pin';
import corkboard from './corkboard.jpg';

export default function Pins({ pins }){

    return (
        // <Box sx={{p: 2, minHeight: {xs: 320}, maxHeight: {xs: 260, md: 380 }, display: {sm: 'flex', md: 'block' }, flexWrap: 'wrap', overflowX: 'hidden', overflowY: 'auto', backgroundImage: `url(${corkboard})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", border: 5, borderColor: '#EFD0B5'}}>
        //     {pins.map((pin) => {
        //         return <Pin key={pin.id} pin={pin} />
        //     })}
        // </Box>
        <Box sx={{
            p: 2,
            display: 'flex',
            flexWrap: 'wrap', 
            overflowX: 'hidden', 
            overflowY: 'auto',
            // backgroundImage: `url(${corkboard})`, 
            // backgroundSize: "cover", 
            // backgroundRepeat: "no-repeat", 
            // border: 5, 
            // borderColor: '#EFD0B5',
            // border: 2,
            // borderColor: '#1976d2',
            "&::-webkit-scrollbar": {
                    width: "3px",
                },
            "&::-webkit-scrollbar-thumb": {
                    background: 'darkgray',
                    borderRadius: "10px",
                },
            "&::-webkit-scrollbar-thumb:hover": {
                    background: "grey",
                },
        }}>
            <Masonry sx={{m: 'auto'}} columns={{ xs: 1, sm: 2, md: 1, lg: 2, xl: 2 }} spacing={2}>
                {pins.map((pin) => {
                    return <Pin key={pin.id} pin={pin} />
                })}
            </Masonry>
        </Box>
    )
};