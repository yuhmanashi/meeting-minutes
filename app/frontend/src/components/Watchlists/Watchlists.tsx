import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Watchlist from './Watchlist';

interface IWatchlists {
    watchlists: any;
}

export default function Watchlists({watchlists} : IWatchlists){
    const hash = {}
    
    for (let watchlist of watchlists){
        const tag = watchlist.tag;
        if (!hash[tag]) hash[tag] = [];
        hash[tag].push(watchlist);
    }

    console.log(hash);
    
    return (
        <Box>
            <Typography>
                Watchlists
            </Typography>
            {watchlists.map((watchlist) => {
                return <Watchlist items={watchlist} />
            })}
        </Box>
    )
};