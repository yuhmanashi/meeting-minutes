import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface ListProps {
    items: string[] | number[];
    label: string | number;
}

export default function GenericList({ items, label }: ListProps){
    return (
        <Box>
            <Typography sx={{ typography: 'h6', m: 2 }}>
                {label}
            </Typography>
            <Divider/>
            <List>
                {items.map((item) => {
                    console.log(item);
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
    )
}