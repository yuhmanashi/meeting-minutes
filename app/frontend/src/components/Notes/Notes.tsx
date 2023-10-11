import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import Pin from './Note';

export default function Pins({ pins }){


    return (
        <Box sx={{
            p: 2,
            display: 'flex',
            flexWrap: 'wrap', 
            overflowX: 'hidden', 
            overflowY: 'auto',
            height: {xs: 360, lg: 300},
            "&::-webkit-scrollbar": {
                    width: "3px"
                },
            '&::-webkit-scrollbar-track': {
                    borderRadius: "5px"
                },
            "&::-webkit-scrollbar-thumb": {
                    background: 'darkgray',
                    borderRadius: "5px",
                },
            "&::-webkit-scrollbar-thumb:hover": {
                    background: "grey",
                },
        }}>
            <Masonry sx={{ m: 'auto', alignContent: 'center' }} columns={{xs: 1, sm: 2, md: 3, lg: 1}} defaultHeight={300} spacing={2}>
                {pins.map((pin) => {
                    return <Pin key={pin.id} pin={pin} />
                })}
            </Masonry>
        </Box>
    )
};