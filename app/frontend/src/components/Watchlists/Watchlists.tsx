import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Watchlist from './Watchlist';

interface IWatchlists {
    watchlists: any;
    students: any;
}

export default function Watchlists({ watchlists, students } : IWatchlists){
    function handleWatchlist(){
        const tags = {};
        
        for (let watchlist of watchlists){
            const tag = watchlist.tag;
            if (!tags[tag]) tags[tag] = [];
            tags[tag].push(watchlist);
        }
        
        const res = []
        const keys = Object.keys(tags);
        const values = Object.values(tags);
        
        const watchlist = values.map((value) => {
            return value.map((watchlist) => {
                return [students[watchlist.studentId].fullName, watchlist.id]
            })
        })

        // const studentNames = values.map(value => students[value.studentId].fullName);

        for (let i = 0; i < keys.length; i++){
            res[i] = [keys[i], watchlist[i]]
        }

        
        return res
    }
    
    const watchlistItems = handleWatchlist()

    return (
        <Container sx={{maxHeight: {xs: 260}, display: {sm: 'flex' }, flexWrap: 'wrap', overflow: 'auto', }}>
            {watchlistItems.map((item) => {
                return <Watchlist key={item} item={item} />
            })}
        </Container>
    )
};