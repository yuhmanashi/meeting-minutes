import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';

import * as watchlistsActions from '../../store/watchlists';

interface IWatchlist {
    item: string[];
}

export default function Watchlist({ item }: IWatchlist) {
    const [ label, watchlist ] = item; 
    const dispatch = useAppDispatch();

    function handleDelete(id){
        return dispatch(watchlistsActions.deleteWatchlist(id))
    }

    return (
        <Box sx={{ border: 1, m: {xs: 1}, width: {sm: '45%', md: '95%'} }}>
            <Typography sx={{ typography: 'h6', px: 1 }}>
                {label}
            </Typography>
            <Divider/>
            <List sx={{py: {xs: 0}}}>
                {watchlist.map(([student, id]) => {
                    return (
                        <ListItem key={student} sx={{py: {xs: 0}}}>
                            <ListItemText>
                                {student}
                            </ListItemText>
                            <Button size="small" onClick={() => {handleDelete(id)}}>
                                <RemoveIcon fontSize='small' />
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}